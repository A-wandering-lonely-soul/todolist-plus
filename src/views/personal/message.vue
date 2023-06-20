<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const cardList = reactive<any>([]);
const cards = reactive([
  {
    id: 1,
    img1: 'https://img2.baidu.com/it/u=3267963114,231077277&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=679',
    img2: 'https://img2.baidu.com/it/u=1669502173,1438611822&fm=253&fmt=auto&app=138&f=PNG?w=500&h=750',
  },
  {
    id: 2,
    img1: 'https://img.zcool.cn/community/01114c5d073c24a801205e4bc9a9fb.gif',
    img2: 'https://img1.baidu.com/it/u=2397739727,2002942261&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',
  },
  {
    id: 3,
    img1: 'https://img2.baidu.com/it/u=928090031,1968336196&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=680',
    img2: 'https://img2.baidu.com/it/u=1386560211,1340648601&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=729',
  },
  {
    id: 4,
    img1: 'https://img1.baidu.com/it/u=2826690795,1644387551&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753',
    img2: 'https://img0.baidu.com/it/u=3222720482,3309345147&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  },
]);
onMounted(() => {
  let count = 0;
  const interval = setInterval(() => {
    if (count < cards.length) {
      // 每隔一秒生成一个方块
      cardList.push(cards[count]);
      count++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});
</script>

<template>
  <div class="box">
    <div v-for="card in cardList" :key="card.id" class="card">
      <XxtRollCard :image1="card.img1" :image2="card.img2"></XxtRollCard>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  background: #152036;
  padding: 1em 0em;
  font-family: Inter, sans-serif;
}
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.card {
  animation: slideIn 0.5s;
}
</style>
