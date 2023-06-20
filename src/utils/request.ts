import axios, { type Method } from 'axios';
import { ElMessage } from 'element-plus';
const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const headers = (config.headers = config.headers || {});
    // 在发送请求之前做些什么
    const token = localStorage.getItem('x-token');
    headers['x-token'] = token;
    if (config.json) {
      headers['Content-Type'] = 'application/json; charset=UTF-8';
      delete config.json;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.headers['x-token']) {
      localStorage.setItem('x-token', response.headers['x-token']);
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    const code = error.response.data.code;
    switch (code) {
      case 1000:
        localStorage.removeItem('x-token');
        ElMessage({
          message: error.response.data.message,
          type: 'error',
        });
        setTimeout(() => {
          location.href = '/login?type=1';
        }, 500);
        break;
    }
    return Promise.reject(error);
  }
);

// 后端返回的接口数据格式
interface ApiRes<T = unknown> {
  code: number;
  msg: string;
  result: T;
}

/**
 * axios 二次封装，整合 TS 类型
 * @param method  请求类型
 * @param url  请求地址
 * @param submitData  对象类型，提交数据
 */
export const http = <T>(
  method: Method,
  url: string,
  json: boolean,
  submitData?: object
) => {
  return instance.request<ApiRes<T>>({
    url,
    method,
    json,
    // 🔔 自动设置合适的 params/data 键名称，如果 method 为 get 用 params 传请求参数，否则用 data
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
  });
};

export default instance;
