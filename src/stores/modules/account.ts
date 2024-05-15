import instance, { http } from '@/utils/request';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';

export const useAccountStore = defineStore('account', {
  state() {
    return {};
  },
  getters: {},
  actions: {
    //上传头像
    upLoadAvatar(data: object) {
      return http('POST', '/user/set-avatar', true, data).then((res) => {
        return res;
      });
    },
    //获取所有账户列表
    getUserList(data?: object) {
      return http('GET', '/user/get-user-list', true, data).then((res) => res);
    },
    //删除
    deleteAccount(data: object) {
      return http('POST', '/user/delete-user', true, data).then((res: any) => {
        ElMessage({
          type: res.data.success ? 'success' : 'error',
          message: res.data.msg,
        });
      });
    },
    //更新（修改）
    CREATED_BLOG(data: object) {
      return http('POST', '/user/update-user', true, data).then((res: any) => {
        ElMessage({
          type: res.data.success ? 'success' : 'error',
          message: res.data.msg,
        });
        return res;
      });
    },
    // 通过id获取个人信息
    getUserById(data: object) {
      return http('GET', '/user/get-count-byId', true, data).then((res) => {
        return res;
      });
    },
    //带权限判断的个人信息
    getUserDetailById(data: object) {
      return http('GET', '/user/get-user-detail-byId', true, data).then(
        (res) => {
          return res;
        }
      );
    },
  },
});
