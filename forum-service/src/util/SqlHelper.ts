let mysql:any = require('mysql');
let connection:any = mysql.createConnection({          
  user     : 'root',              
  password : 'root',                        
  database: 'luntan' 
}); 

connection.connect();

module.exports = connection;


