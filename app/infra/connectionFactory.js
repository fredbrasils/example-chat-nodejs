var postgres = require('pg');

var config_local= {
  user: 'postgres', 
  database: 'chat-nodejs', 
  password: '1234',  
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000  
};

var config_test= {
  user: 'postgres', 
  database: 'chat-nodejs-test', 
  password: '1234',  
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000  
};

var urlHeroku = process.env.DATABASE_URL;

function connectPostgres(){    
    if(!process.env.DATABASE_URL){
        console.log("connected postgres local");
        return new postgres.Pool(config_local);
    }
    
    if(process.env.DATABASE_URL){
        console.log("connected postgres prod");
        
        var group = urlHeroku.match(/postgres:\/\/(.*):(.*)@(.*):5432\/(.*)/);
        /*
          1 - login  
          2 - senha
          3 - url
          4 - banco
        */
        var config_prod = {
          user: group[1],
          host: group[3],    
          database: group[4], 
          password: group[2], 
          port: 5432, 
          max: 10,  
          idleTimeoutMillis: 30000 
        };
        
        return new postgres.Pool(config_prod);
    }
    
//    if(process.end.NODE_ENV == 'test'){
//        console.log("connected postgres teste");
//        return new postgres.Pool(config_test);
//    }
}

module.exports = function(){
    console.log("express load call postgres connection");
    return connectPostgres;
}