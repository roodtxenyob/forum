let fs:any = require("fs");
import { postUpLoadImg } from '../util/request/sending'
module.exports = (filePath:string,fileName:string) => {
  let imgBox:any = JSON.stringify(fs.readFileSync(filePath));
  postUpLoadImg({
    "fileName":fileName,
    "data": imgBox
  }).then((result:any) => {
    console.log(result);
  }).catch((error:any) => {
    console.log(error);
  });
}