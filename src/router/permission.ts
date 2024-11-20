import router from './index.js';
import { ElMessage } from 'element-plus';
// 路由守卫
router.beforeEach((to, from, next) => {
  const getToken = localStorage.getItem('x-token');
  if (getToken) {
    //token存在则不允许会登录页
    if (to.path === '/login' || to.path === '/Login') {
      next('/todo/dynamicCharts');
    } else {
      next();
    }
  } else {
    //没有token就调转到登录页
    if (to.path === '/login' || to.path === '/Login') {
      next();
    } else {
      ElMessage.error('token过期，请重新登录');
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }
});

export default router;
