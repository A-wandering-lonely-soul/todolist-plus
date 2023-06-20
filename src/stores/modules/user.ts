import { defineStore } from 'pinia';
const userCountString = localStorage.getItem('userCount');
export const userInfoStore = defineStore('user', {
  state() {
    return {
      userCount: userCountString ? JSON.parse(userCountString) : {},
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
    loginOut() {
      localStorage.removeItem('userCount');
      localStorage.removeItem('x-token');
      localStorage.removeItem('TODO_LIST_DATA');
      localStorage.removeItem('TODO_LIST_DATA');
    },
  },
});
