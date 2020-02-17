"use strict";
module.exports = function (request, response) {
    var postdelf = require('../util/request/sending').postdelf;
    console.log(request.body);
    postdelf(request.body).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
    response.send();
};
