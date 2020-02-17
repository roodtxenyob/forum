let express:any = require('express');

let loginService:any = require('../service/loginService');
let isLoginService:any = require('../service/isLoginService');
let discussListService:any =require('../service/discussListService');
let postDiscussService:any = require('../service/postDiscussService');
let postDiscussDetailService:any = require('../service/postDiscussDetailService');
let postReply:any = require('../service/postReplyService');
let postdelf:any = require('../service/postdelfService');
const router = express.Router();

/* GET home page. */
router.get('/', function (req:any, res:any, next:any) {
  res.render('index', { title: 'Express hello' });
});

router.post('/api/login', loginService);

router.post('/api/isLogin', isLoginService);

router.post('/api/discussList', discussListService);

router.post('/api/postDiscuss', postDiscussService);

router.post('/api/postDiscussDetail', postDiscussDetailService);

router.post('/api/postReply', postReply);

router.post('/api/postdelf',postdelf);
export default router;