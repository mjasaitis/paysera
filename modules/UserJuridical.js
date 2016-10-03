import User from "../modules/User";
import { roundUp, getWeekNumber } from "../modules/Functions";


export default class UserJuridical extends User {

  constructor(options){
    super(options);
  }

  /**
  * calculate commission for cashOut operation
  * @param {Object} data
  */
  getCashOutCommission(data) {

  	let amount = data.operation.amount;
    let currency = data.operation.currency;

    // get config
    let conf = this.config.get('cash-out-juridical');
    let commission = roundUp(amount * conf.percents / 100);

    // Convert min amount to operation currency
    let min_commission = this.currency.convert(conf.min.amount, conf.min.currency, currency);
    if(commission < min_commission)
      commission = min_commission;

    return commission;

  }  

}