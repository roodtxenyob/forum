module.exports = function(request:any,response:any){
  let mysqldb:any = require('../util/SqlHelper');
  let sql:string = `SELECT * FROM discuss ORDER BY replyDate DESC;`;// LIMIT 0,10
  new Promise((resolve:any,reject:any) => {
    mysqldb.query(sql,(error:any,result:any) => {
      if(error){
        reject(error);
      }else{
        resolve(result);
      }
    })
  }).then((result:any) => {
    if(result.length == 0){
      return response.status(200).json({"responseInfo":"没有人发过帖子","statusCode":"2"});
    }else{
      return response.status(200).json({"responseInfo":"成功获取到帖子","statusCode":"1","list":result});
    }
  }).catch((error:any) => {
    return response.status(500).json({"responseInfo":"查询状态失败","statusCode":"0"});
  })
}