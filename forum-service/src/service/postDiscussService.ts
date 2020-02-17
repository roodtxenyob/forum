module.exports = function(request:any,response:any){
  let fs:any = require("fs");
  let path:any = require("path");
  let md5:any = require('md5');
  let formidable:any = require("formidable");
  let fileUpLoad:any = require('../util/FileUpLoad');
  let mysqldb:any = require('../util/SqlHelper');
  let dateTimeFormat:any = require('../util/DateTimeFormat');
  let form:any = new formidable.IncomingForm();
  form.parse(request,(error:any, fields:any, files:any) =>{
    //获取文件名
    let fileName:string = files.img.name;
    //获取服务器时间
    let date:any = new Date();
    let currentTime:string = date.getTime();
    //将文件重新命名避免冲突
    let prefixName:string = md5(fileName + currentTime);
    let suffixName:string = path.extname(files.img.name);
    let newFileName:string = prefixName + suffixName;
    fs.writeFile(path.join(__dirname,'../public/tp/',newFileName), fs.readFileSync(files.img.path), { 'flag': 'a' }, (error:any,data:any) => {
      if(error) {
        console.log(error);
      }else{
        fileUpLoad(path.join(__dirname,'../public/tp/',newFileName),newFileName);
        console.log("文件上传成功");
      }
    })
    console.log(fields);
    let serverDataTime:any = dateTimeFormat(currentTime);
    let addSql:string = 'INSERT INTO discuss(Id,userId,titel,text,imgName,replyDate) VALUES(0,?,?,?,?,?)';
    let addSqlParams:any = [fields.userId, fields.title, fields.text, newFileName, serverDataTime];
    mysqldb.query(addSql,addSqlParams,(error:any,result:any) => {
      if(error){
        console.log(error);
        response.json({"info":"nosuccess"});
      }else{
        response.json({"info":"success"});
      }
    });
  })
}