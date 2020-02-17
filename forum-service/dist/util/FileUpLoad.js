"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var sending_1 = require("../util/request/sending");
module.exports = function (filePath, fileName) {
    var imgBox = JSON.stringify(fs.readFileSync(filePath));
    sending_1.postUpLoadImg({
        "fileName": fileName,
        "data": imgBox
    }).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
};
