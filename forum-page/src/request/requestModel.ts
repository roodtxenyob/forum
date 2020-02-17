import myaxios from 'axios';

export function requestConstructor(config:any) {
  let instance:any = myaxios.create({
    baseURL:"/api",
    timeout:5000
  });
  instance.interceptors.request.use((config:any):any => {
    return config;
  },(err:any):any => {
    console.log(err);
  });
  instance.interceptors.response.use((result:any):any => {
    return result.data;
  },(err:any):any => {
    console.log(err);
  })
  return instance(config);
}

