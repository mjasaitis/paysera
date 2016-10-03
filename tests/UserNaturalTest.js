import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Config from "../modules/Config";
import UserNatural from "../modules/Usernatural";
import { roundUp, getWeekNumber } from "../modules/Functions";

let { assert, expect } = chai;

chai.should();
chai.use(sinonChai);

let config = new Config();
config.setDefaultData(); 

describe('UserNatural', () => {

  it('Week cashOut sum', () => {

    let date = "2016-01-01";
    let date2 = "2016-05-01";
    let weekNr = getWeekNumber(date);

    let user = new UserNatural({ config: config });

    user.cashOut(date, 100, "EUR");
    user.cashOut(date, 100, "EUR");
    user.cashOut(date, 100, "EUR");
    user.cashOut(date2, 100, "EUR");

    let sum = user.getWeekCashOutSum(weekNr);

    expect(sum).to.equal(300);

  });

  it('Week cashOut commission', () => {

    let commission;
    let date = "2016-01-01";
    let data = {
      date: date,
      operation: { amount: 300, currency: "EUR"}
    };

    let user = new UserNatural({ config: config });

    commission = user.getCashOutCommission(data);
    expect(commission).to.equal(0);

    commission = user.getCashOutCommission(data);
    expect(commission).to.equal(0);

    commission = user.getCashOutCommission(data);
    expect(commission).to.equal(0);

    commission = user.getCashOutCommission(data);
    expect(commission).to.equal(0.6);

  });

  it('CashIn commission', () => {

    let commission;
    let date = "2016-01-01";
    let data = {
      date: date,
      operation: { amount: 300, currency: "EUR"}
    };

    let user = new UserNatural({ config: config });

    commission = user.getCashInCommission(data);
    expect(commission).to.equal(0.09);

    // check max commission in EUR ( max = €5 )
    data = {
      date: date,
      operation: { amount: 300000, currency: "EUR"}
    };
    commission = user.getCashInCommission(data);
    expect(commission).to.equal(5);

    // check max commision in USD ( max = $5.75 )
    data = {
      date: date,
      operation: { amount: 300000, currency: "USD"}
    };
    commission = user.getCashInCommission(data);
    expect(commission).to.equal(5.75);

    // check max commision in JPY ( max = $647.65 )
    data = {
      date: date,
      operation: { amount: 3000000, currency: "JPY"}
    };
    commission = user.getCashInCommission(data);
    expect(commission).to.equal(647.65);

  });



});