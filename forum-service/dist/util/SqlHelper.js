"use strict";
var mysql = require('mysql');
var connection = mysql.createConnection({
    user: 'root',
    password: 'root',
    database: 'luntan'
});
connection.connect();
module.exports = connection;
