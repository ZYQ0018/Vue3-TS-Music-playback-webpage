import axios from 'axios'
import message from '@/components/msg/msg.ts'
const request = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    console.log(error);
    
    const {code} = error.response.data;
    const msg = error.response.data.message
    if(code == -460){
      message.error(msg, 2, () => {
      })
    }
    return Promise.reject(error);
  });
  export default request