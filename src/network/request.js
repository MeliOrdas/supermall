import axios from 'axios';

export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000",
    timeout: 5000,
  });

  // 3.发送真正的网络请求
  return instance(config);
}

  //2.1 axios请求的拦截
  // instance.interceptors.request.use(config => {
  //1.config中的一些信息不符合服务器的要求 就拦截下来自行修改
  // console.log(config);
  //2.比如每次发送网络请求时, 页面加载的时候显示loading图标,加载完后显示网页
  // return config;
  //3.某些请求(比如登录(token)),必须携带一些特殊信息
  // }, err => {
  // console.log(err);
  // });

  // 2.2 响应拦截
  // instance.interceptors.response.use(res => {
  // 拦截成功
  // console.log(res);
  // return res.data;
  // }, err => {
  // 拦截失败
  // console.log(err);
  // });


//
// promise方案3

// export function request (config) {
//   // 1.创建axios的实例
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: "http://123.207.32.32:8000",
//       timeout: 5000,
//     })(config)
//       .then(res => { resolve(res); })
//       .catch(err => { reject(err); });
//   });
// }

//方案2

// export function request (config) {
//   // 1.创建axios的实例(回调函数)
//   const instance = axios.create({
//     baseURL: "http://123.207.32.32:8000",
//     timeout: 5000
//   });
//   instance(config.baseConfig).then(res => {
//     // console.log(res);
//     config.success(res);
//   }).catch(err => {
//     // console.log(err);
//     config.failure(err);
//   });
// }


// 方案1

// export function request (params, success, failure) {
//   // 1.创建axios的实例(回调函数)
//   const instance = axios.create({
//     baseURL: "http://123.207.32.32:8000",
//     timeout: 5000
//   });
//   instance(params).then(res => {
//     // console.log(res);
//     success(res);
//   }).catch(err => {
//     // console.log(err);
//     failure(err);
//   });
// }