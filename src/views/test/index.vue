<template>
  <div class="gggg" :style="{ backgroundImage: `url(${image1})` }"></div>
  <vue-qrcode value="https://juejin.cn/123" :options="{ width: 200 }"></vue-qrcode>
</template>
<script setup lang="tsx">
import { ref, onMounted } from 'vue';
import image1 from '../../assets/styleBg2.jpg';
// const bgimg2 = ref('');
// onMounted(async () => {
//   const image = await import('../../assets/styleBg2.jpg');
//   bgimg2.value = image.default;
// });
</script>
<style lang="less" scoped>
.gggg {
  width: 300px;
  height: 300px;
}
</style>
