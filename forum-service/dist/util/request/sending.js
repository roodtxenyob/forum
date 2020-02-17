"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestModel_1 = require("./requestModel");
function postUpLoadImg(data) {
    return requestModel_1.requestConstructor({
        url: 'http://127.0.0.1:11010/upLoadImg',
        method: 'post',
        data: data,
        withCredentials: true,
    });
}
exports.postUpLoadImg = postUpLoadImg;
function postReplyText(data) {
    return requestModel_1.requestConstructor({
        url: 'http://127.0.0.1:11010/postReplyText',
        method: 'post',
        data: data,
        withCredentials: true,
    });
}
exports.postReplyText = postReplyText;
function postdelf(data) {
    return requestModel_1.requestConstructor({
        url: 'http://127.0.0.1:11010/postdelf',
        method: 'post',
        data: data
    });
}
exports.postdelf = postdelf;
