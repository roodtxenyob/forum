"use strict";
module.exports = function (request, response) {
    var mysqldb = require('../util/SqlHelper');
    var sql = "SELECT * from users WHERE token = '" + request.body.token + "'";
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
        if (result.length == 0) {
            return response.status(200).json({ "responseInfo": "不在登录状态", "statusCode": "2", "userInfo": result });
        }
        else {
            return response.status(200).json({ "responseInfo": "在登录状态", "statusCode": "1", "userInfo": result });
        }
    }).catch(function (error) {
        return response.status(500).json({ "responseInfo": "查询状态失败", "statusCode": "0" });
    });
};
