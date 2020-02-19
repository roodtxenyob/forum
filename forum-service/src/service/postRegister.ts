module.exports = function(request:any,response:any){
  let mysqldb:any = require('../util/SqlHelper');
  let md5:any = require('md5');
  let sql = `SELECT * FROM users WHERE username = '${request.body.formData.username}'`;
  mysqldb.query(sql,(error:any,result:any) => {
    if(result.length == 0){
      let addSql:string = 'INSERT INTO users(Id,username,password,token) VALUES(0,?,?,?)';
      let token:string = md5(md5(request.body.formData.username + request.body.formData.password) + "test");
      let addSqlParams:any = [request.body.formData.username,request.body.formData.password,token];
      mysqldb.query(addSql,addSqlParams,(error:any,result:any) => {
        if(error){
          response.json({'info':'服务器错误'});
        }else{
          response.json({'info':'注册成功'});
        }
      })
    }else{
      response.json({'info':'用户名以被占用'});
    }
  })
}