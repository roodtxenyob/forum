"use strict";
module.exports = function (request, response) {
    var mysqldb = require('../util/SqlHelper');
    var md5 = require('md5');
    var sql = "SELECT * FROM users WHERE username = '" + request.body.formData.username + "'";
    mysqldb.query(sql, function (error, result) {
        if (result.length == 0) {
            var addSql = 'INSERT INTO users(Id,username,password,token) VALUES(0,?,?,?)';
            var token = md5(md5(request.body.formData.username + request.body.formData.password) + "test");
            var addSqlParams = [request.body.formData.username, request.body.formData.password, token];
            mysqldb.query(addSql, addSqlParams, function (error, result) {
                if (error) {
                    response.json({ 'info': '服务器错误' });
                }
                else {
                    response.json({ 'info': '注册成功' });
                }
            });
        }
        else {
            response.json({ 'info': '用户名以被占用' });
        }
    });
};
