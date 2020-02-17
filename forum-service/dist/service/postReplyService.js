"use strict";
module.exports = function (request, response) {
    var postReplyText = require('../util/request/sending').postReplyText;
    var dateTimeFormat = require('../util/DateTimeFormat');
    var mysqldb = require('../util/SqlHelper');
    var date = new Date();
    var currentTime = date.getTime();
    var serverDataTime = dateTimeFormat(currentTime);
    var modSql = "UPDATE discuss SET replyDate = ? WHERE Id = ?";
    var modSqlParams = [serverDataTime, request.body.detailId];
    mysqldb.query(modSql, modSqlParams, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    });
    console.log();
    postReplyText({
        data: request.body,
        serverDataTime: serverDataTime
    }).then(function (result) {
        response.json(result);
    }).catch(function (error) {
        response.json(error);
    });
};
