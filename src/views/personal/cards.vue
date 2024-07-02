<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { cards_s, cards_x, content } from '@/components/rollCard/cards';
import { ElMessage, ElMessageBox } from 'element-plus';
let cardList_s = reactive<any>([]);
const smallCardId = ref<null | number>(null); //选中的小牌id
const rollcardRefs = reactive<any>([]);
const refresh = () => {
  cardList_s.splice(0, cardList_s.length);

  getCardList_s(); //小牌列表刷新
  ischecked.value = false; //关闭大牌列表
  bigCardId.value = null;
  smallCardId.value = null;
  identification.value = '';
  taluoContent.value = '';
  isCompleted.value = false;
  showImage.value = false;
  Object.assign(cardList_x, []);
  Object.assign(cardList_s, []);
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
  if (isCompleted.value) return;
  if (smallCardId.value || ischecked.value) {
    ischecked.value = true;
    getCardList_x(); //获取大牌列表
    ElMessage({
      type: 'success',
      message: '请再挑选一张大阿卡那牌',
    });
  } else {
    ElMessage({
      type: 'warning',
      message: '请翻转左侧的小阿卡那牌',
    });
  }
};

onMounted(() => {
  getCardList_s();
});
//这部分是大牌的函数
import { getAssetsFile } from '@/utils/pub-use';
let cardList_x = reactive<any>([]);
// 随机获取十个对象
const getCardList_x = () => {
  function getRandomObjects(array: any, numberOfObjects: any) {
    return array
      .sort(() => 0.5 - Math.random()) // 打乱数组
      .slice(0, numberOfObjects); // 获取前10个元素
  }
  let newArr = getRandomObjects(cards_x, 10);
  for (let item of newArr) {
    item.flipped = false;
  }
  cardList_x = newArr;
};

const bigCardId = ref<null | number>(null); //选中的大牌id
const identification = ref<string>(''); //大牌和小牌id组成的字符串
const taluoContent = ref<string>('');
const isCompleted = ref(false); //是否已经完成占扑
const taluoContentRef = ref<any>(null);
const flipCard = (card: any, index: number) => {
  if (isCompleted.value) return;
  bigCardId.value = card.id;
  let cardvalue = cardList_x.find((item: any) => item.flipped);
  if (cardvalue != undefined) {
    return;
  } else {
    identification.value = `${bigCardId.value}x${smallCardId.value}`;
    cardList_x[index].flipped = !cardList_x[index].flipped;
    isCompleted.value = true;
    showImage.value = true;
    //打字效果
    let text = content[identification.value];
    const textArray = text.split('');
    let index2 = 0;
    const type = () => {
      if (index2 < textArray.length) {
        taluoContent.value += textArray[index2];
        index2++;
        setTimeout(type, 200);
      } else {
        taluoContentRef.value.style.borderRight = 'none';
      }
    };
    setTimeout(() => {
      type();
    }, 500);
  }
};
const showImage = ref(false);
const closeMoralBox = () => {
  showImage.value = false;
};
const flipAllCards = () => {
  //小牌翻转
  rollcardRefs.forEach((rollcardRef: any) => {
    if (rollcardRef) {
      rollcardRef.allflipFn();
    }
  });
  //大牌翻转
  cardList_x.forEach((card: any) => {
    if (!card.flipped) {
      card.flipped = true;
    }
  });
};
const flipAllToFront = () => {
  //小牌复原
  rollcardRefs.forEach((rollcardRef: any) => {
    if (rollcardRef) {
      rollcardRef.allunflipFn();
    }
  });
  //大牌复原
  cardList_x.forEach((card: any) => {
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
        <div class="centerBox">
          <span>今日运势占扑</span>
          <p>选择一张小阿卡那牌</p>
          <div
            class="checkButton"
            :class="{ checked: ischecked }"
            @click="checkedCard_s"
          >
            {{ ischecked ? '已确认' : '确认选择' }}
          </div>
        </div>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="box_x" v-show="ischecked">
        <div class="bigCard">
          <div
            v-for="(card, index) in cardList_x"
            :key="index"
            :class="{
              card: true,
              flipped: card.flipped,
            }"
            @click="flipCard(card, index)"
          >
            <div class="front">
              <img :src="getAssetsFile('卡背.webp')" alt="" />
            </div>
            <div class="back">
              <img :src="getAssetsFile(card.img1)" alt="" />
            </div>
          </div>
        </div>
        <div class="buttongroup" v-if="isCompleted">
          <button @click="flipAllCards" class="button">
            <span>全部展开</span>
          </button>
          <button @click="flipAllToFront" class="button">
            <span>复原 </span>
          </button>
        </div>
      </div>
    </transition>

    <div class="image-container" v-show="showImage">
      <div class="img">
        <img src="@/assets/ba/getbluecard.jpg" alt="" />
        <div class="moral">
          <span class="content-effect" ref="taluoContentRef">
            {{ taluoContent }}
          </span>
        </div>
      </div>
      <Close class="closeContent" @click="closeMoralBox"></Close>
    </div>
  </div>
</template>

<style lang="less" scoped>
.taluopaiBox {
  background: #152036;
  width: 100%;
  min-height: 100%;
  position: relative;
  .image-container {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 32vw;
    height: 36vh;
    position: fixed;
    z-index: 98;
    .img {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: fadeIn 2s 0.5s forwards; /* 延迟0.5秒开始动画 */
      background: url(@/assets/ba/紫卡.png) no-repeat;
      background-size: cover;
      overflow: visible;
      padding: 1rem;
      .moral {
        flex: 1;
        overflow-y: auto;
        font-size: 2rem;
        line-height: 2.2rem;
        .content-effect {
          font-family: monospace;
          font-size: 24px;
          border-right: 3px solid black;
          white-space: wrap;
          overflow: hidden;
        }
      }
      img {
        object-fit: contain;
        height: 40%;
        animation: insertIn 2s 1s forwards;
      }
    }
    .closeContent {
      position: absolute;
      width: 20px;
      height: 20px;
      font-size: 20px;
      top: 0;
      right: 0;
      cursor: pointer;
      transition: transform 0.5s ease;
      &:hover {
        transform: scale(1.2) rotate(90deg);
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0) 70%
      );
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: glowEffect 1s forwards;
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }

    @keyframes glowEffect {
      to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
      }
    }
  }
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
  width: 100%;
  .bigCard {
    min-height: 300px;
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    .card {
      width: 150px;
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
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .back {
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotateY(-180deg);
      transition: transform 0.6s;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .buttongroup {
    width: 100%;
    display: flex;
    justify-content: center;
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
}
.box_s {
  display: flex;
  // flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 50%;
  margin: 0;
  padding: 1em;
  font-family: Inter, sans-serif;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .smallCard {
    min-height: 30em;
    min-width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .card {
      animation: slideIn 0.5s;
      margin-bottom: 1em;
    }
  }
  .introduce {
    flex: 1;
    height: 28em;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .centerBox {
      margin-left: 20px;
      border-radius: 10px;
      border: #01588f 2px solid;
      padding: 10px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      min-width: 250px;
      span {
        color: #fff;
        font-size: 35px;
        line-height: 40px;
      }
      p {
        font-weight: bold;
        font-size: 30px;
        line-height: 40px;
        color: pink;
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
        height: 180px;
        justify-content: center;
        position: relative;
        width: 260px;
        &:hover {
          background: linear-gradient(121deg, #e4860d, #c16764);
        }
      }
      .checked {
        background: linear-gradient(121deg, #e4860d, #c16764);
      }
    }
  }
}
@keyframes insertIn {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
