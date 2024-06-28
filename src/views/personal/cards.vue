<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { cards_s, cards_x, content } from '@/components/rollCard/cards';

let cardList_s = reactive<any>([]);
const smallCardId = ref<null | number>(null); //选中的小牌id
const rollcardRefs = reactive<any>([]);
const refresh = () => {
  cardList_s.splice(0, cardList_s.length);

  getCardList_s();
};
const getCardList_s = () => {
  const arr = Array.from({ length: cards_s.length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  let count = 0;
  const interval = setInterval(() => {
    if (count < cards_s.length) {
      // 每隔一秒生成一个方块
      cardList_s.push(cards_s[arr[count]]);
      count++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};
const checkcard = (flag: boolean, id: number) => {
  if (flag) {
    //已经有一张牌被翻开
    rollcardRefs.forEach((rollcardRef: any) => {
      if (rollcardRef) {
        rollcardRef.toHidden(id);
      }
    });
    ischecked.value ? '' : (smallCardId.value = id); //确认后不能变更
  } else {
    rollcardRefs.forEach((rollcardRef: any) => {
      if (rollcardRef) {
        rollcardRef.reset(id);
      }
    });
    smallCardId.value = null;
  }
};
let ischecked = ref(false); //按钮是否已经按下
const checkedCard_s = () => {
  ischecked.value = true;
  getCardList_x(); //获取大牌列表
};

onMounted(() => {
  getCardList_s();
});
//这部分是大牌的函数
let cardList_x = reactive<any>([]);
// 随机获取十个对象
const getCardList_x = () => {
  function getRandomObjects(array: any, numberOfObjects: any) {
    return array
      .sort(() => 0.5 - Math.random()) // 打乱数组
      .slice(0, numberOfObjects); // 获取前10个元素
  }

  cardList_x.value = getRandomObjects(cards_x, 10);
};

const cards = reactive([
  { src: 'Card 1 Front', backsrc: 'Card 1 Back', flipped: false },
  { src: 'Card 2 Front', backsrc: 'Card 2 Back', flipped: false },
  { src: 'Card 4 Front', backsrc: 'Card 3 Back', flipped: false },
  { src: 'Card 4 Front', backsrc: 'Card 4 Back', flipped: false },
  { src: 'Card 5 Front', backsrc: 'Card 5 Back', flipped: false },
  { src: 'Card 6 Front', backsrc: 'Card 6 Back', flipped: false },
  { src: 'Card 7 Front', backsrc: 'Card 7 Back', flipped: false },
  { src: 'Card 8 Front', backsrc: 'Card 8 Back', flipped: false },
  { src: 'Card 9 Front', backsrc: 'Card 9 Back', flipped: false },
  { src: 'Card 10 Front', backsrc: 'Card 10 Back', flipped: false },
]);
const flipCard = (index: any) => {
  cards[index].flipped = !cards[index].flipped;
};
const flipAllCards = () => {
  cards.forEach((card) => {
    if (!card.flipped) {
      card.flipped = true;
    }
  });
};
const flipAllToFront = () => {
  cards.forEach((card) => {
    card.flipped = false;
  });
};
</script>

<template>
  <div class="taluopaiBox">
    <div class="refresh">
      <i @click="refresh">
        <RefreshRight style="width: 2em; height: 2em" />
      </i>
    </div>
    <div class="box_s">
      <div class="smallCard" :span="24">
        <div v-for="card in cardList_s" :span="6" :key="card.id" class="card">
          <XxtRollCard
            ref="rollcardRefs"
            @rotate="checkcard($event, card.id)"
            :cardId="card.id"
            :image1="card.img1"
          ></XxtRollCard>
        </div>
      </div>
      <div class="introduce">
        <span>今日运势占扑</span>
        <p>选择一张小阿卡那牌</p>
        <div
          class="checkButton"
          :class="{ checked: ischecked }"
          v-if="smallCardId || ischecked"
          @click="checkedCard_s"
        >
          {{ ischecked ? '已确认' : '确认选择' }}
        </div>
      </div>
    </div>
    <div class="box_x">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="{
          card: true,
          flipped: card.flipped,
        }"
        @click="flipCard(index)"
      >
        <div class="front">
          <h2>{{ card.src }}</h2>
        </div>
        <div class="back">
          <p>{{ card.backsrc }}</p>
        </div>
      </div>
      <div class="buttongroup">
        <button @click="flipAllCards" class="button">
          <span>全部翻转</span>
        </button>
        <button @click="flipAllToFront" class="button">
          <span>翻转正面 </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.taluopaiBox {
  background: #152036;
  width: 100%;
  min-height: 100%;
}
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
.box_x {
  display: flex;
  width: 100%;
  min-height: 700px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: auto auto;
  .card-container {
    display: flex;
    width: 1200px;
    height: 700px;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto auto;
  }

  .card {
    width: 200px;
    height: 300px;
    margin: 10px;
    perspective: 1000px;
    cursor: pointer;
    transition: transform 0.6s;
  }

  .flipped .front {
    transform: rotateY(180deg);
  }

  .flipped .back {
    transform: rotateY(0deg);
  }

  .front,
  .back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  .front {
    background-color: #3498db;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateY(0deg);
    transition: transform 0.6s;
  }

  .back {
    background-color: #e74c3c;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateY(-180deg);
    transition: transform 0.6s;
  }

  .buttongroup {
    margin: auto auto;
  }

  .button {
    display: inline-block;
    border-radius: 4px;
    background-color: #9d9def;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 28px;
    padding: 20px;
    width: 200px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    vertical-align: middle;
  }

  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .button span:after {
    content: '»';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

  .button:hover span {
    padding-right: 25px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }
}
.box_s {
  display: flex;
  // flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 50%;
  margin: 0;

  padding: 1em 0em;
  font-family: Inter, sans-serif;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .smallCard {
    min-height: 30em;
    min-width: 60%;

    display: flex;
    align-items: center;
    .card {
      animation: slideIn 0.5s;
      margin-bottom: 1em;
    }
  }
  .introduce {
    flex: 1;
    min-width: 250px;
    height: 28em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    span {
      color: #fff;
      font-size: 35px;
      line-height: 40px;
    }
    p {
      font-weight: bold;
      font-size: 30px;
      line-height: 40px;
      color: purple;
    }
    .checkButton {
      align-items: center;
      background: linear-gradient(121deg, #05a7c4, #64c1a5);
      border-radius: 20px;
      color: #fff;
      cursor: pointer;
      display: flex;
      font-size: 33px;
      font-weight: 500;
      height: 200px;
      justify-content: center;
      margin-right: 20px;
      position: relative;
      width: 300px;
      &:hover {
        background: linear-gradient(121deg, #e4860d, #c16764);
      }
    }
    .checked {
      background: linear-gradient(121deg, #e4860d, #c16764);
    }
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
