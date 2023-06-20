<script setup lang="ts">
import { useHomeStore } from '@/stores';
const home = useHomeStore();

const sendRquest = () => {
  let data = {
    password: '123456',
    username: 'admin',
  };
  home.A_LOGIN(data);
};
</script>

<template>
  <h1>首页</h1>
  <button @click="sendRquest">发送请求</button>
</template>

<style lang="less" scoped></style>
