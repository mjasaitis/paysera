import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Config from "../modules/Config";
import UserJuridical from "../modules/UserJuridical";
import { roundUp, getWeekNumber } from "../modules/Functions";

let { assert, expect } = chai;

chai.should();
chai.use(sinonChai);

let config = new Config();
config.setDefaultData(); 

describe('UserJuridical', () => {

  it('CashOut commission', () => {

    let commission, data;
    let user = new UserJuridical({ config: config });    

    // check minimum checkout
    data = { operation: { amount: 1, currency: "EUR" }};    
    commission = user.getCashOutCommission(data);
    expect(commission).to.equal(0.5);

    // check minimum checkout
    data = { operation: { amount: 1000, currency: "EUR" }};    
    commission = user.getCashOutCommission(data);
    expect(commission).to.equal(3);

  });

});