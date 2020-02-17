module.exports = function(request:any,response:any){
  let { postdelf } = require('../util/request/sending');
  console.log(request.body);
  postdelf(request.body).then((result:any) => {
    console.log(result);
  }).catch((error:any) => {
    console.log(error);
  })
  response.send();
}