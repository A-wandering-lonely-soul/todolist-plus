<template>
  <vue-qrcode value="https://juejin.cn/123" :options="{ width: 200 }"></vue-qrcode>
</template>
<script setup lang="tsx">
import { ref, onMounted } from 'vue';
</script>
<style lang="less" scoped></style>
