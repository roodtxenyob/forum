
module.exports = function(request:any,response:any){
  let mysqldb:any = require('../util/SqlHelper');
  let md5:any = require('md5');
  let sql:string = `SELECT * FROM users WHERE username = '${request.body.username}' AND password = '${request.body.password}'`; 
  new Promise((resolve:any,reject:any) => {
    mysqldb.query(sql,(error:any,result:any) => {
      if(error){
        reject(error);
      }else{
        resolve(result);
      }
    })
  }).then((result:any) => {
    let selectResult = result[0];
    if(result.length == 0){
      return response.status(200).json({"responseInfo":"用户名或密码错误","statusCode":"2"});
    }else{     
      return new Promise((resolve:any,reject:any) => {
        let token:string = md5(md5(result[0].username + result[0].password) + "test");
        var updataSQL:string = 'UPDATE users SET token = ? WHERE username = ?';
        var updataInfo:Array<any> = [token,result[0].username];
        mysqldb.query(updataSQL,updataInfo,(error:any,result:any) => {
          if(error){
            reject(error);
          }else{
            resolve({"token":token,"userInfo":selectResult});
          }
        })
      });
    }
  }).then((result):any => {
    return response.status(200).json({"responseInfo":"登录成功","statusCode":"1","token":result.token,"userInfo":result.userInfo});
  }).catch((error:any) => {
    console.log(error);
    return response.status(500).json({"responseInfo":"服务器发生了错误","statusCode":"0"});
  })
}
