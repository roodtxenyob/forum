"use strict";
module.exports = function (request, response) {
    var mysqldb = require('../util/SqlHelper');
    var sql = "SELECT * FROM discuss WHERE Id = '" + request.body.discussID + "'";
    mysqldb.query(sql, function (error, result) {
        if (error) {
            response.json({ info: '服务器忙', error: error });
        }
        else {
            response.json(result);
        }
    });
};
