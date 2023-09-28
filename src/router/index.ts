import { createRouter, createWebHashHistory } from 'vue-router';

export const staticRouter = [
  {
    path: '/personal',
    name: 'personal',
    meta: {
      icon: 'User',
      title: '使用面板',
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/personal/resource',
        name: 'resource',
        meta: {
          icon: 'Message',
          title: '我的资源',
        },
        component: () => import('@/views/personal/resource.vue'),
      },
      {
        path: '/personal/setting',
        name: 'setting',
        meta: {
          icon: 'Setting',
          title: '个人设置',
        },
        component: () => import('@/views/personal/setting.vue'),
      },
    ],
  },
  {
    path: '/todo',
    name: 'todo',
    meta: {
      icon: 'Todo',
      title: '待办列表',
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/todo/list',
        name: 'list',
        meta: {
          icon: 'List',
          title: '待办列表',
        },
        component: () => import('@/views/todolist/index.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      icon: 'CoffeeCup',
      title: '测试页面',
    },
    component: () => import('@/views/test/index.vue'),
  },
];

const router = createRouter({
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:catchALL(.*)',
      redirect: '/todo/list',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },

    ...staticRouter,
  ],
});

export default router;
