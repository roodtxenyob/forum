"use strict";
module.exports = function (request, response) {
    var mysqldb = require('../util/SqlHelper');
    var md5 = require('md5');
    var sql = "SELECT * FROM users WHERE username = '" + request.body.username + "' AND password = '" + request.body.password + "'";
    new Promise(function (resolve, reject) {
        mysqldb.query(sql, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    }).then(function (result) {
        var selectResult = result[0];
        if (result.length == 0) {
            return response.status(200).json({ "responseInfo": "用户名或密码错误", "statusCode": "2" });
        }
        else {
            return new Promise(function (resolve, reject) {
                var token = md5(md5(result[0].username + result[0].password) + "test");
                var updataSQL = 'UPDATE users SET token = ? WHERE username = ?';
                var updataInfo = [token, result[0].username];
                mysqldb.query(updataSQL, updataInfo, function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({ "token": token, "userInfo": selectResult });
                    }
                });
            });
        }
    }).then(function (result) {
        return response.status(200).json({ "responseInfo": "登录成功", "statusCode": "1", "token": result.token, "userInfo": result.userInfo });
    }).catch(function (error) {
        console.log(error);
        return response.status(500).json({ "responseInfo": "服务器发生了错误", "statusCode": "0" });
    });
};
