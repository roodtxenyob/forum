module.exports = function(request:any,response:any){
  let mysqldb:any = require('../util/SqlHelper');
  let sql:string = `SELECT * from users WHERE token = '${request.body.token}'`;
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
      return response.status(200).json({"responseInfo":"不在登录状态","statusCode":"2","userInfo":result});
    }else{
      return response.status(200).json({"responseInfo":"在登录状态","statusCode":"1","userInfo":result});
    }
  }).catch((error) => {
    return response.status(500).json({"responseInfo":"查询状态失败","statusCode":"0"});
  })
}