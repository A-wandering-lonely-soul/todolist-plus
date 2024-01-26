import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  //设置反向代理，跨域
  server: {
    // host: '0.0.0.0',//设置地址：http://localhost
    port: 2233, // 设置服务启动端口号
    // open: true, // 设置服务启动时是否自动打开浏览器
    // cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://206.237.29.83:3000/', //代理的地址
        // target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), //这里的/需要转义
      },
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // https://cn.vitejs.dev/config/#css-preprocessoroptions
    preprocessorOptions: {
      less: {
        additionalData: `
             @import "@/assets/styles/variables.less";
             @import "@/assets/styles/mixins.less";
           `,
      },
    },
  },
});
