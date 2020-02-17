var express = require('express');
let formidable = require("formidable");
let path = require('path');
let fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('success');
  res.send();
});

router.post('/upLoadImg', (request,response) => {
  fs.writeFile( path.join(__dirname,'../public/discussImg/',request.body.fileName),new Buffer(JSON.parse(request.body.data)),{ 'flag': 'a' },(error,data) => {
    if(error){
      console.log(error);
    }else{
      console.log(request.body);
    }              
  })
  response.send();
})

router.post('/postReplyText', (request,response) => {
  let filePath = path.join(__dirname,'../public/floor/' , request.body.data.detailId +'.json');
  //判断是否有文件
  fs.exists(filePath,(exists) => {
    if(exists){
      //文件存在执行的操作
      fs.readFile(filePath,'utf-8',(error,data) => {
        if(error){
          response.json({"info":"文件读取失败"});
        }else{
          let obj = JSON.parse(data);
          let objKey = Object.keys(obj);
          let l = objKey.length;
          let newData = data.replace('}]}',`}],"${objKey[l - 1] * 1 + 1}":[{"text":"${request.body.data.replytext}","nickName":"${request.body.data.userInfo.autograph}","userId":"${request.body.data.userInfo.Id}","dataTime":"${request.body.serverDataTime}","floor":"${objKey[l - 1] * 1 + 1}"}]}`);
          fs.writeFile(filePath,newData,{ 'flag': 'w' },(error) => {
            if(error){
              response.json({"info":"文件写入失败"});
            }else{
              response.json({"info":"操作成功"});
            }
          })
        }
      })
    }else{
      //文件不存在时候的操作
      let data = `{"2":[{"text":"${request.body.data.replytext}","nickName":"${request.body.data.userInfo.autograph}","userId":"${request.body.data.userInfo.Id}","dataTime":"${request.body.serverDataTime}","floor":"2"}]}`
      fs.writeFile(filePath, data ,{ 'flag': 'a' },(error,data) =>{
        if(error){
          response.json({"info":"文件操作失败"});
        }else{
          response.json({"info":"文件写入成功"});
        }
      })
    }
    
  })
  response.send();
})

router.post('/postdelf', (request,response) => {
  let filePath = path.join(__dirname,'../public/floor/' , request.body.detailId +'.json');
  fs.readFile(filePath,'utf-8',(error,data) => {
    let jsonData = JSON.parse(data);
    jsonData[request.body.f] = [];
    fs.writeFile(filePath,JSON.stringify(jsonData),{ 'flag': 'w' },(error,data) => {
      console.log(error);
      console.log(data);
    })
  })
  response.send();
})
module.exports = router;
