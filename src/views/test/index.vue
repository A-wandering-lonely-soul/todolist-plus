<template>
  <div class="bigbox">
    <h1>友情链接</h1>
    <vue-qrcode value="https://lateautumn02.com/" :options="{ width: 200 }"></vue-qrcode>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted } from 'vue';
</script>
<style lang="less" scoped>
.bigbox {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
}
</style>
