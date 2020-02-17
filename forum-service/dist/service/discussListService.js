"use strict";
module.exports = function (request, response) {
    var mysqldb = require('../util/SqlHelper');
    var sql = "SELECT * FROM discuss ORDER BY replyDate DESC;"; // LIMIT 0,10
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
            return response.status(200).json({ "responseInfo": "没有人发过帖子", "statusCode": "2" });
        }
        else {
            return response.status(200).json({ "responseInfo": "成功获取到帖子", "statusCode": "1", "list": result });
        }
    }).catch(function (error) {
        return response.status(500).json({ "responseInfo": "查询状态失败", "statusCode": "0" });
    });
};
