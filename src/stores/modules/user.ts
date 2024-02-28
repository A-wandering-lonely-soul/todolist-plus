import { defineStore } from 'pinia';
const userCountString = localStorage.getItem('userCount');
const userInfoString = localStorage.getItem('userInfo');
export const userInfoStore = defineStore('user', {
  state() {
    return {
      userCount: userCountString ? JSON.parse(userCountString) : {},
      userInfo: userInfoString ? JSON.parse(userInfoString) : {},
    };
  },
  getters: {},
  actions: {
    setUserCount(data: object) {
      localStorage.setItem('userCount', JSON.stringify(data));
    },
    removeUserCount() {
      localStorage.removeItem('userCount');
    },
    setUserInfo(data: object) {
      this.userInfo = data;
      localStorage.setItem('userInfo', JSON.stringify(data));
    },
    removeUserInfo() {
      this.userInfo = {};
      localStorage.removeItem('userInfo');
    },
    loginOut() {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('x-token');
      localStorage.removeItem('TODO_LIST_DATA');
    },
  },
});
