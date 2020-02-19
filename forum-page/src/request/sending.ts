import { requestConstructor } from './requestModel';

export function postLogin(data:any){
  return requestConstructor({
    url: '/login',
    method: 'post',
    data,
  })
}

export function postRegister(data:any){
  return requestConstructor({
    url: '/register',
    method: 'post',
    data
  })
}

export function postIsLogin(data:any){
  return requestConstructor({
    url: '/isLogin',
    method: 'post',
    data
  })
}

export function postDiscussList(data:any){
  return requestConstructor({
    url: '/discussList',
    method: 'post',
    data
  })
}

export function postDiscuss(data:any){
  return requestConstructor({
    url: '/postDiscuss',
    method: 'post',
    data,
    headers: { 'Content-Type':'multipart/form-data' },
    withCredentials: true,
  })
}

export function postDiscussDetail(data:any){
  return requestConstructor({
    url: '/postDiscussDetail',
    method: 'post',
    data
  })
}

export function postReplyText(data:any){
  return requestConstructor({
    url:'/postReply',
    method: 'post',
    data
  })
}

export function postdelf(data:any){
  return requestConstructor({
    url:'/postdelf',
    method: 'post',
    data
  })
}

export function postReply(data:any){
  return requestConstructor({
    baseURL: '/floor',
    url: data+'.json',
    method: 'get',
  })
}

export function getHot(){
  return requestConstructor({
    baseURL:'/hottopic',
    method: 'get',
  })
}