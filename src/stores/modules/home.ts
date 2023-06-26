import instance, { http } from '@/utils/request';
import { todoStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  // persist: true,
  // 写法2
  state() {
    return {
      todoData: todoStorage.getTodoList || [
        {
          title: '待处理',
          list: [],
        },
        {
          title: '进行中',
          list: [],
        },
        {
          title: '已完成',
          list: [],
        },
      ],
    };
  },
  getters: {},
  actions: {
    //注册
    A_REGISTER(data: object) {
      http('POST', '/user/register', true, data);
    },
    //登录
    A_LOGIN(data: object) {
      http('POST', '/user/login', true, data).then(
        (resp) => {
          return Promise.resolve(resp);
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    },
    A_SELECT_TASK_BYID(data: object) {
      return http('GET', '/task/get-task-byId', true, data).then((res) => {
        //通过id获取的参数
        return res;
      });
    },
    // 更新任务（如拖动，修改任务）
    A_CREATED_TASK(data: object) {
      http('POST', '/task/update-task', true, data).then((res) => {
        this.A_GET_TASK_GROUP();
      });
    },
    //删除任务
    A_DELETE_TASK(data: object) {
      http('POST', '/task/delete-task', true, data).then(() => {
        this.A_GET_TASK_GROUP();
      });
    },
    // 创建任务分组
    A_CREATE_TASK_GROUP(data: object) {
      http('POST', '/task/create-task-group', true, data).then((res) => {
        this.A_GET_TASK_GROUP();
      });
    },
    // 删除任务分组
    A_DELETE_TASK_GROUP(data: object) {
      http('POST', '/task/delete-task-group', true, data).then(() => {
        this.A_GET_TASK_GROUP();
      });
    },
    // 获取所有任务
    A_GET_TASK_GROUP(data?: object) {
      http('GET', '/task/get-task-list', true, data).then(({ data }) => {
        this.M_GET_TASK_GROUP(data);
      });
    },
    M_GET_TASK_GROUP(data: object) {
      const map = {};
      let temps = [];
      data.map((item) => {
        const ekey = item.group_id;
        temps = map[ekey] || [];
        temps.push(item);
        map[ekey] = temps;
      });
      const list = [];
      for (const ekey in map) {
        list.push({
          group_id: ekey,
          group_title: map[ekey][0].g_title,
          list: map[ekey].filter((item) => item.id),
        });
      }
      this.todoData = list;
      todoStorage.setTodoList = this.todoData;
    },
    M_CREATE_TASK_GROUP(data?: object) {
      this.todoData.push(data);
      todoStorage.setTodoList = this.todoData;
    },
    M_CREATE_TODO_LIST_GROUP(data: object) {
      this.todoData.push(data);
      todoStorage.setTodoList = this.todoData;
    },
  },
});
