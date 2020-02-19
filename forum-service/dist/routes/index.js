"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var loginService = require('../service/loginService');
var isLoginService = require('../service/isLoginService');
var discussListService = require('../service/discussListService');
var postDiscussService = require('../service/postDiscussService');
var postDiscussDetailService = require('../service/postDiscussDetailService');
var postReply = require('../service/postReplyService');
var postdelf = require('../service/postdelfService');
var postRegister = require('../service/postRegister');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express hello' });
});
router.post('/api/login', loginService);
router.post('/api/isLogin', isLoginService);
router.post('/api/discussList', discussListService);
router.post('/api/postDiscuss', postDiscussService);
router.post('/api/postDiscussDetail', postDiscussDetailService);
router.post('/api/postReply', postReply);
router.post('/api/postdelf', postdelf);
router.post('/api/register', postRegister);
exports.default = router;
