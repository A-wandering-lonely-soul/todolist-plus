import instance, { http } from '@/utils/request';
import { todoStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';

export const useHomeStore = defineStore('home', {
  // persist: true,
  // 写法2
  state() {
    return {};
  },
  getters: {},
  actions: {
    //注册
    A_REGISTER(data: object) {
      return http('POST', '/user/register', true, data).then(
        (resp: any) => {
          ElMessage({
            type: resp.data.success ? 'success' : 'error',
            message: resp.data.msg,
          });
          return Promise.resolve(resp);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    },

    A_LOGIN(data: object) {
      return http('POST', '/user/login', true, data).then(
        (resp: any) => {
          ElMessage({
            type: resp.data.success ? 'success' : 'error',
            message: resp.data.msg,
          });
          return Promise.resolve(resp);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    },
  },
});
