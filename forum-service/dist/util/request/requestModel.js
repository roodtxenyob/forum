"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
function requestConstructor(config) {
    var instance = axios_1.default.create({
        timeout: 5000
    });
    instance.interceptors.request.use(function (config) {
        return config;
    }, function (err) {
        console.log(err);
    });
    instance.interceptors.response.use(function (result) {
        return result.data;
    }, function (err) {
        console.log(err);
    });
    return instance(config);
}
exports.requestConstructor = requestConstructor;
