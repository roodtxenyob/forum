module.exports = function(request:any, response:any){
  let { postReplyText } = require('../util/request/sending');
  let dateTimeFormat:any = require('../util/DateTimeFormat');
  let mysqldb:any = require('../util/SqlHelper');
  let date:any = new Date();
  let currentTime:string = date.getTime();
  let serverDataTime:any = dateTimeFormat(currentTime);

  let modSql = `UPDATE discuss SET replyDate = ? WHERE Id = ?`;
  let modSqlParams = [ serverDataTime , request.body.detailId];
  mysqldb.query(modSql, modSqlParams, (err:any, result:any)=>{
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
  })
  console.log();

  postReplyText({
    data:request.body,
    serverDataTime
  }).then((result:any) => {
    response.json(result);
  }).catch((error:any) => {
    response.json(error);
  })
}