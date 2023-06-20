// Vue 项目入口文件
import { createApp } from 'vue';
import App from './App.vue';

// 引入组件
import XxtUI from '@/components/index';

import 'normalize.css'; //所有标签样式统一
import '@/assets/styles/common.less'; //公共样式
import router from './router';
import { createPinia } from 'pinia';
import permission from '@/router/permission'; //路由守卫
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(XxtUI);
app.use(ElementPlus);
app.use(permission);
app.use(router);
app.use(pinia);
app.mount('#app');
