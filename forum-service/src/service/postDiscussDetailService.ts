module.exports = function(request:any,response:any) {
  let mysqldb:any = require('../util/SqlHelper');
  let sql:string = `SELECT * FROM discuss WHERE Id = '${request.body.discussID}'`; 
  mysqldb.query(sql,(error:object,result:object):any => {
    if(error){
      response.json({info:'服务器忙',error});
    }else{
      response.json(result)
    }
  })
  
}