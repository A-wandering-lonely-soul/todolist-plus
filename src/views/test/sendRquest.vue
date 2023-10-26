<script setup lang="ts">
import { useBlogStore } from '@/stores';
const blog = useBlogStore();

const sendRquest = () => {
  let data = {
    password: '123456',
    username: 'admin',
  };
  blog.GET_BLOG_DATA();
};
</script>

<template>
  <h1>首页</h1>
  <button @click="sendRquest">发送请求</button>
</template>

<style lang="less" scoped></style>
