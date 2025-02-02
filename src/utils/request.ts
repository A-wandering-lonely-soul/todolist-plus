import axios, { type Method, type AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    const headers = (config.headers = config.headers || {});
    const token = localStorage.getItem('x-token');
    headers['x-token'] = token;
    // if (config.json) {
    //   headers['Content-Type'] = 'application/json; charset=UTF-8';
    //   delete config.json;
    // }
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
          router.push('/login?type=1');
        }, 500);
        break;
    }
    return Promise.reject(error);
  }
);

interface ApiRes<T = unknown> {
  code: number;
  msg: string;
  result: T;
}

export const http = <T>(
  method: Method,
  url: string,
  isJson: boolean,
  submitData?: object
) => {
  const requestData: AxiosRequestConfig = {
    url,
    method,
    ...(method.toUpperCase() === 'GET'
      ? { params: submitData }
      : { data: submitData }),
  };

  instance.interceptors.request.use((config) => {
    if (isJson) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    return config;
  });

  return instance.request<ApiRes<T>>(requestData);
};
// interface ApiRes<T = unknown> {
//   code: number;
//   msg: string;
//   result: T;
// }

// export const http = <T>(
//   method: Method,
//   url: string,
//   json: boolean,
//   submitData?: object
// ) => {
//   return instance.request<ApiRes<T>>({
//     url,
//     method,
//     json,
//     // 🔔 自动设置合适的 params/data 键名称，如果 method 为 get 用 params 传请求参数，否则用 data
//     [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData,
//   });
// };

export default instance;
