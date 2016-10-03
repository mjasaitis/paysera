import CurrencyConverter from "../modules/CurrencyConverter";
import { roundUp, getWeekNumber } from "../modules/Functions";

export default class User {

  constructor(options) {
    this.config = options.config;
    this.id = options.id;
    this.currency = new CurrencyConverter(options.config);
  }

  /**
  * calculate commission for cashIn operation
  * @param {Object} data
  */
  getCashInCommission(data) {
 
    let amount = data.operation.amount;
    let currency = data.operation.currency;
    
    // get config
    let conf = this.config.get('cash-in');
    let commission = roundUp( amount * conf.percents / 100 );

    // convert commission's maximum to operation's currency
    let maxCommission = this.currency.convert( conf.max.amount, conf.max.currency, currency );

    if(commission > maxCommission)
      commission = maxCommission;

    return commission;

  }

}