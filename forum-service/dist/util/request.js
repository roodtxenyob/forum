"use strict";
var axios = require('axios');
module.exports = function (data, headers) {
    return axios({
        url: 'http://127.0.0.1:11010/upLoadImg',
        method: 'post',
        headers: headers,
        withCredentials: true,
        data: data,
        timeout: 5000
    });
};
