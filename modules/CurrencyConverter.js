import { roundUp } from "../modules/Functions";

export default class CurrencyConverter {

  constructor(config) {
    this.config = config;
   	this.defaultCurrency = "EUR";
  }

  /**
  * Convert from one currency to another
  * @param {Number} amount
  * @param {String} fromCurrency
  * @param {String} toCurrency
  */
  convert(amount, fromCurrency, toCurrency) {

    if(toCurrency == fromCurrency)
      return amount;

  	// get convert rates from config
  	let rates = this.config.get('rates');
  	let rate;

  	if(fromCurrency == this.defaultCurrency)
  		rate = rates[fromCurrency][toCurrency];
  	else
  		rate = 1 / rates[toCurrency][fromCurrency];

  	amount = roundUp(amount * rate) ;
 	return amount;
  }

}