import Request from "request";
import Promise from "bluebird";

var request = Promise.promisifyAll( Request );

export default class Config {

  constructor(props) {

    this.urls = {
      'cash-in': 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
      'cash-out-natural': 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
      'cash-out-juridical': 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',
      rates: 'http://private-38e18c-uzduotis.apiary-mock.com/rates'
    };

    this.loaded = false;
    this.data = {};

  }

  /**
  * Loads configuration data from API, calls callback function
  * @param {Function} callback 
  */
  load(callback){    

    let self = this;

    // make an array from urls object keys
    let urlKeys = Object.getOwnPropertyNames(this.urls);

    // load configuration data from all urls
    Promise.map( urlKeys, (key) => { 
      return request.getAsync(this.urls[key]);
    })
    .then(function(data){

        let loadedCnt = 0;
        for (let i = 0; i < data.length; i++) {
          // upcount successfully loaded urls
          if( data[i].statusCode == 200 ){
            loadedCnt++;
            self.set(urlKeys[i], JSON.parse(data[i].body));
          }
        };
      
        // got all data from API's
        if( loadedCnt == urlKeys.length) {
          self.loaded = true;
          if(typeof callback == 'function')
            callback();
        }
        // use default data
        else {
          self.setDefaultData();
          callback();
        }

    })
    .catch(function(e){
      self.setDefaultData();
      callback();
    })
  }  

  /**
  * Set configuration data
  * @param {String} key
  * @param {Object} val
  */
  set(key, val) {
    this.data[key] = val;
  }

  /**
  * Get configuration data
  * @param {String} key
  */
  get(key){    
    return this.data[key];
  }

  /**
  * Sets default configuration data, use for testing
  */
  setDefaultData(){

    console.log( "Using default config data!" );

    this.data = {
                  'cash-in': { percents: 0.03, max: { amount: 5, currency: 'EUR' } },
                  'cash-out-natural': { percents: 0.3, week_limit: { amount: 1000, currency: 'EUR' } },
                  'cash-out-juridical': { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } },
                  rates: { EUR: { USD: 1.1497, JPY: 129.53 } }
    }
  }
  
}