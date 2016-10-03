import Config from "../modules/Config";
import UserNatural from "../modules/Usernatural";
import UserJuridical from "../modules/UserJuridical";
import User from "../modules/User";
import path from 'path';
import fs from 'fs';
import { getWeekNumber } from "../modules/Functions";
import x from 'console.table';

export default class App {

  constructor() {
    this.data = [];
    this.users = {};
    this.config = new Config();
  }
  
  /**
  * Reads data file
  */
  getInitialData() {
    this.rootDir = path.dirname(require.main.filename);
    let dataFilePath = path.dirname(require.main.filename) + '/' + process.argv[ process.argv.length - 1];
    let data;

    try {
      data = fs.readFileSync(dataFilePath, 'utf8');
    }
    catch(e) {
      console.log("Cannot read file " + dataFilePath);
      return;
    }

    try {
      this.data = JSON.parse(data);
    }
    catch(e) {
      console.log("Invalid JSON file");
      return;
    }

  }

  /**
  * Is there any data in input file
  */
  hasData() {
    return this.data.length ? true : false;
  }

  /**
  * Loads configuration data from API
  * @param {Function} callback 
  */
  loadConfig(callback) {
    this.config.load(callback);
  }

  /**
  * Calculates commissions 
  */
  processData() {
    
    let results = [];

    this.data.forEach( (item, index) => { 
      let user = this.createUser(item);
      let commission;

      switch(item.type) {
        case "cash_in":
          commission = user.getCashInCommission(item);
          break;
        case "cash_out":
          commission = user.getCashOutCommission(item);
          break;
        default:
      }

      results.push({ 
        'User ID': user.id , 
        'User type': item.user_type,
        'Date / week nr': item.date + ' / ' + getWeekNumber(item.date),
        'Operation': item.type,
        'Currency': item.operation.currency, 
        'Amount': item.operation.amount, 
        'Commission':commission.toFixed(2) 
      });

    });

    console.log( '----------------------------------------------------------------------------' );
    console.table( results );
  }

  /**
  * Creates user, pushes it to array. If user exits returns reference to array.
  * @param {Object} item 
  */
  createUser(item) {
    let user;
    let user_id = item.user_id;

    if( typeof this.users[ user_id ] == "undefined" ) {
      if( item.user_type == "natural" )
        user = new UserNatural({ id: user_id, config: this.config });
      else
        user = new UserJuridical({ id: user_id, config: this.config });
      this.users[ user_id] = user;
    }
    return this.users[user_id];
  }

}