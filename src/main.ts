// Vue 项目入口文件
import { createApp } from 'vue';
import App from './App.vue';

// 引入组件
import XxtUI from '@/components/index';
import VueQrcode from '@chenfengyuan/vue-qrcode'; //生成二维码组件

import 'normalize.css'; //所有标签样式统一
import '@/assets/styles/common.less'; //公共样式
// import router from './router'; //貌似这个脚手架自带了
import { createPinia } from 'pinia';
import permission from '@/router/permission'; //路由守卫
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const pinia = createPinia();
const app = createApp(App);

app.use(XxtUI);
app.use(ElementPlus);
app.use(permission);
// app.use(router);
app.use(pinia);
app.mount('#app');
app.component(VueQrcode.name, VueQrcode);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
