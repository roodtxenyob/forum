"use strict";
module.exports = function (request, response) {
    var fs = require("fs");
    var path = require("path");
    var md5 = require('md5');
    var formidable = require("formidable");
    var fileUpLoad = require('../util/FileUpLoad');
    var mysqldb = require('../util/SqlHelper');
    var dateTimeFormat = require('../util/DateTimeFormat');
    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        //获取文件名
        var fileName = files.img.name;
        //获取服务器时间
        var date = new Date();
        var currentTime = date.getTime();
        //将文件重新命名避免冲突
        var prefixName = md5(fileName + currentTime);
        var suffixName = path.extname(files.img.name);
        var newFileName = prefixName + suffixName;
        fs.writeFile(path.join(__dirname, '../public/tp/', newFileName), fs.readFileSync(files.img.path), { 'flag': 'a' }, function (error, data) {
            if (error) {
                console.log(error);
            }
            else {
                fileUpLoad(path.join(__dirname, '../public/tp/', newFileName), newFileName);
                console.log("文件上传成功");
            }
        });
        console.log(fields);
        var serverDataTime = dateTimeFormat(currentTime);
        var addSql = 'INSERT INTO discuss(Id,userId,titel,text,imgName,replyDate) VALUES(0,?,?,?,?,?)';
        var addSqlParams = [fields.userId, fields.title, fields.text, newFileName, serverDataTime];
        mysqldb.query(addSql, addSqlParams, function (error, result) {
            if (error) {
                console.log(error);
                response.json({ "info": "nosuccess" });
            }
            else {
                response.json({ "info": "success" });
            }
        });
    });
};
