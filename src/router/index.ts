import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

export const staticRouter = [
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
      {
        path: '/todo/dynamicCharts',
        name: 'dynamicCharts',
        meta: {
          icon: 'Charts',
          title: '动态图表',
        },
        component: () => import('@/views/todolist/dynamicCharts.vue'),
      },
    ],
  },
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
        path: '/personal/cards',
        name: 'cards',
        meta: {
          icon: 'Cards',
          title: '我的卡片',
        },
        component: () => import('@/views/personal/cards.vue'),
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
      {
        path: '/personal/account',
        name: 'account',
        meta: {
          icon: 'Account',
          title: '用户管理',
        },
        component: () => import('@/views/personal/account.vue'),
      },
    ],
  },
  {
    path: '/blog',
    name: 'blog',
    meta: {
      icon: 'article',
      title: '博客管理',
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/blog/manage',
        name: 'manage',
        meta: {
          icon: 'Blog',
          title: '博客列表',
        },
        component: () => import('@/views/blog/index.vue'),
      },
      {
        path: '/blog/issue',
        name: 'issue',
        props: (route: any) => ({ id: route.query.id }),
        meta: {
          icon: 'Pen',
          title: '博客发布',
        },
        component: () => import('@/views/blog/issue.vue'),
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
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: [
    {
      path: '/:catchALL(.*)',
      redirect: '/todo/dynamicCharts',
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
