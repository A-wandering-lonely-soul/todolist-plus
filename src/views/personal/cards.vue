<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import talo from '@/assets/taluopai/卡背.webp';
import talo1 from '@/assets/taluopai/权杖.webp';
import talo2 from '@/assets/taluopai/圣杯.webp';
import talo3 from '@/assets/taluopai/新币.webp';
import talo4 from '@/assets/taluopai/宝剑.webp';

let cardList = reactive<any>([]);
const cards = reactive([
  {
    id: 1,
    img1: talo1,
    img2: talo,
  },
  {
    id: 2,
    img1: talo2,
    img2: talo,
  },
  {
    id: 3,
    img1: talo3,
    img2: talo,
  },
  {
    id: 4,
    img1: talo4,
    img2: talo,
  },
]);
const refresh = () => {
  console.log(cardList);

  cardList.splice(0, cardList.length);
  getCardList();
};
const getCardList = () => {
  const arr = Array.from({ length: cards.length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  let count = 0;
  const interval = setInterval(() => {
    if (count < cards.length) {
      // 每隔一秒生成一个方块
      cardList.push(cards[arr[count]]);
      count++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};
onMounted(() => {
  getCardList();
});
</script>

<template>
  <div class="refresh">
    <i @click="refresh">
      <RefreshRight style="width: 2em; height: 2em" />
    </i>
  </div>
  <div class="box">
    <div v-for="card in cardList" :key="card.id" class="card">
      <XxtRollCard
        ref="rollcard"
        :image1="card.img1"
        :image2="card.img2"
      ></XxtRollCard>
    </div>
  </div>
</template>

<style lang="less" scoped>
.refresh {
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(45, 97, 221, 1),
    0 10px 15px -3px rgba(1, 88, 143, 1);
  position: relative;
  z-index: 88;
  background: linear-gradient(to bottom, #2d61dd, transparent 50%, #01588f);
  border: 5px solid;
  border-image: linear-gradient(to bottom, #24e7fd, transparent 50%, #24e7fd);
  animation: borderColorChange 5s ease infinite,
    backgroundColorChange 10s ease infinite;
  background-size: 100% 100%;
  i {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    color: #fff;
    cursor: url('/static/pokemon/后台运行.cur'), auto;
  }
}
@keyframes borderColorChange {
  0% {
    border-image: linear-gradient(to bottom, #24e7fd, transparent 50%, #24e7fd)
      1;
  }

  50% {
    border-image: linear-gradient(to bottom, #0692f6, transparent 50%, #0692f6)
      1;
  }

  100% {
    border-image: linear-gradient(to bottom, #2d61dd, transparent 50%, #2d61dd)
      1;
  }
}

@keyframes backgroundColorChange {
  0% {
    background: linear-gradient(to bottom, #01588f, transparent 50%, #01588f);
    box-shadow: 0 4px 6px -1px rgba(1, 88, 143, 1),
      0 10px 15px -3px rgba(1, 88, 143, 1);
  }
  50% {
    background: linear-gradient(to bottom, #0692f6, transparent 50%, #0692f6);
    box-shadow: 0 4px 6px -1px rgba(6, 146, 246, 1),
      0 10px 15px -3px rgba(6, 146, 246, 1);
  }

  100% {
    background: linear-gradient(to bottom, #2d61dd, transparent 50%, #2d61dd);
    box-shadow: 0 4px 6px -1px rgba(45, 97, 221, 1),
      0 10px 15px -3px rgba(45, 97, 221, 1);
  }
}

.box {
  display: flex;
  // flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 0;
  background: #152036;
  padding: 1em 0em;
  font-family: Inter, sans-serif;

  .card {
    animation: slideIn 0.5s;
    margin-bottom: 1em;
  }
}
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
