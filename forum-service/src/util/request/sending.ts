import { requestConstructor } from './requestModel';

export function postUpLoadImg(data:any){
  return requestConstructor({
    url: 'http://127.0.0.1:11010/upLoadImg',
    method: 'post',
    data,
    withCredentials: true,
  })
}

export function postReplyText(data:any){
  return requestConstructor({
    url: 'http://127.0.0.1:11010/postReplyText',
    method: 'post',
    data,
    withCredentials: true,
  })
}

export function postdelf(data:any){
  return requestConstructor({
    url: 'http://127.0.0.1:11010/postdelf',
    method: 'post',
    data
  })
}