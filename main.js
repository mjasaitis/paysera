// Load packages
import App from "./modules/App";

let app = new App();

app.getInitialData();

if(!app.hasData()) {
  console.log( "No data provided. Exit" );
  process.exit();
}


app.loadConfig( () => { 
  app.processData(); 
});


//app.config.setDefaultData();
//app.processData();