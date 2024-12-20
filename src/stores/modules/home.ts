import instance, { http } from '@/utils/request';
import { todoStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import type { loginData, registData } from '@/types';
import CryptoJS from 'crypto-js';
// 固定密钥和IV
const key = CryptoJS.enc.Utf8.parse('0123456789abcdef0123456789abcdef'); // 32 字节
const iv = CryptoJS.enc.Utf8.parse('abcdef9876543210'); // 16 字节
const encrypt = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
  });
  return encrypted.toString(); // Base64 编码的密文
};

export const useHomeStore = defineStore('home', {
  // persist: true,
  // 写法2
  state() {
    return {};
  },
  getters: {},
  actions: {
    //注册
    A_REGISTER(data: registData) {
      const registData = {
        username: data.username,
        password: encrypt(data.password),
        password2: encrypt(data.password2),
      };
      return http('POST', '/user/register', true, registData).then(
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

    A_LOGIN(data: loginData) {
      const loginData = {
        username: data.username,
        password: encrypt(data.password),
      };
      return http('POST', '/user/login', true, loginData).then(
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
