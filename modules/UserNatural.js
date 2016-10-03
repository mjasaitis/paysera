import User from "../modules/User";
import { roundUp, getWeekNumber } from "../modules/Functions";

export default class UserNatural extends User {

  constructor(options){
    super(options);
    this.weekCashOut = {};
  }

  /**
  * calculate commission for cashOut operation
  * @param {Object} data
  */
  getCashOutCommission(data) {

    let commission = 0;
    let amount = data.operation.amount;
    let currency = data.operation.currency;
    let date = data.date;
    let weekNumber = getWeekNumber(date);

    // get config
    let conf = this.config.get('cash-out-natural');

    // convert week limit amount to operation's currency
    let weekLimit = this.currency.convert(conf.week_limit.amount, conf.week_limit.currency, currency);

    // get week cashout sum in EUR
    let weekCashOutSum =  this.getWeekCashOutSum(weekNumber);

    // convert week cashout sum to operation's currency
    weekCashOutSum = this.currency.convert(weekCashOutSum, 'EUR', currency);

    if(weekCashOutSum + amount > weekLimit) {

      let amountToTax = weekCashOutSum + amount - weekLimit;
      if(amountToTax > amount)
        amountToTax = amount;

      commission = roundUp(amountToTax * conf.percents / 100);

    }
    else {
      commission = 0;
    }

    // save cashOut history    
    this.cashOut(date, amount, currency);

    return commission;

  } 
  
  /**
  * "Saves" amout to user's week-cashout array. Converts amount to EUR
  * @param {String} date
  * @param {Number} amount
  * @param {String} currency
  */
  cashOut(date, amount, currency) {

    let weekNumber = getWeekNumber(date);

    if( typeof this.weekCashOut[weekNumber] == "undefined" )
        this.weekCashOut[weekNumber] = [];

    // convert to EUR
    amount = this.currency.convert(amount, currency, 'EUR');

    this.weekCashOut[weekNumber].push(amount);

  }

  /**
  * Get user's cashout sum for a week
  * @param {Number} weekNumber
  */
  getWeekCashOutSum(weekNumber) {
    if( typeof this.weekCashOut[weekNumber] == "undefined" )
        return 0;
    return this.weekCashOut[weekNumber].reduce((a, b) => a + b, 0);
  }

}