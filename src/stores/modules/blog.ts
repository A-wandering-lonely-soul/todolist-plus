import instance, { http } from '@/utils/request';
import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import type { LoginResponse } from '@/types';

export const useBlogStore = defineStore('blog', {
  state() {
    return {
      blogData: [],
    };
  },
  getters: {},
  actions: {
    // 获取所有博客
    GET_BLOG_DATA(data?: object) {
      return http('GET', '/blog/get-blog-list', true, data).then((res) => res);
    },
    //删除
    DELETE_BLOG_DATA(data: object) {
      return http('POST', '/blog/delete-blog', true, data).then((res: any) => {
        ElMessage({
          type: res.data.success ? 'success' : 'error',
          message: res.data.msg,
        });
      });
    },
    // 更新任务（如拖动，修改任务）
    CREATED_BLOG(data: object) {
      return http('POST', '/blog/update-blog', true, data).then((res: any) => {
        ElMessage({
          type: res.data.success ? 'success' : 'error',
          message: res.data.msg,
        });
        return res;
      });
    },
    //根据id获取博客
    GET_BLOG_BYID(data?: object) {
      return http('GET', '/blog/get-blog-byId', true, data).then((res) => {
        return res;
      });
    },
  },
});
