<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { getAssetsFile } from '@/utils/pub-use';
const props = defineProps({
  cardId: {
    type: Number,
    default: 1,
  },
  image1: {
    type: String,
    default: '宝剑.webp',
  },
  image2: {
    type: String,
    default: '卡背.webp',
  },
});

const isPositive = ref(false); //是否正面
const isHidden = ref(false); //是否隐藏标签
const reset = (id: number) => {
  //恢复初始状态
  if (props.cardId != id) {
    isPositive.value = false;
    isHidden.value = false;
  }
};
const toHidden = (id: number) => {
  //隐藏标签
  if (props.cardId != id) {
    isHidden.value = true;
  }
};
defineExpose({
  toHidden,
  reset,
});
const emits = defineEmits(['rotate']);
const bgimg1 = ref('');
const bgimg2 = ref('');
onMounted(() => {
  bgimg1.value = getAssetsFile(props.image1);
  bgimg2.value = getAssetsFile(props.image2);
});
const card = ref();
const innerCardBackface = ref();
const unflip = ref();
const innerCard = ref();

const calculateAngle = (e: any, item: any, parent: any) => {
  item.value = item;
  parent.value = parent;
  let dropShadowColor = 'rgba(0, 0, 0, 0.3)';
  if (parent.value.getAttribute('data-filter-color') !== null) {
    dropShadowColor = parent.value.getAttribute('data-filter-color');
  }

  parent.value.classList.add('animated');
  let x = Math.abs(item.value.getBoundingClientRect().x - e.clientX);
  let y = Math.abs(item.value.getBoundingClientRect().y - e.clientY);

  let halfWidth = item.value.getBoundingClientRect().width / 2;
  let halfHeight = item.value.getBoundingClientRect().height / 2;
  let calcAngleX = (x - halfWidth) / 6;
  let calcAngleY = (y - halfHeight) / 14;

  let gX = (1 - x / (halfWidth * 2)) * 100;
  let gY = (1 - y / (halfHeight * 2)) * 100;

  item.value.querySelector(
    '.glare'
  ).style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(199 198 243), transparent)`;
  parent.value.style.perspective = `${halfWidth * 6}px`;
  item.value.style.perspective = `${halfWidth * 6}px`;

  item.value.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
  parent.value.querySelector(
    '.inner-card-backface'
  ).style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04) translateZ(-4px)`;

  if (parent.value.getAttribute('data-custom-perspective') !== null) {
    parent.value.style.perspective = parent.value.getAttribute(
      'data-custom-perspective'
    );
  }

  let calcShadowX = (x - halfWidth) / 3;
  let calcShadowY = (y - halfHeight) / 6;

  item.value.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
};
const handleMouseEnter = (e: any) => {
  calculateAngle(e, innerCard.value, card.value);
};
const handleMouseMove = (e: any) => {
  calculateAngle(e, innerCard.value, card.value);
};
const handleMouseLeave = () => {
  let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
  if (card.value.getAttribute('data-filter-color') !== null) {
    dropShadowColor = card.value.getAttribute('data-filter-color');
  }
  card.value.classList.remove('animated');
  innerCard.value.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
  innerCardBackface.value.style.transform = `rotateY(0deg) rotateX(0deg) scale(1.01) translateZ(-4px)`;
  innerCard.value.style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
};
const flipFn = () => {
  if (card.value) {
    card.value.classList.add('flipped');
    isPositive.value = true;
    emits('rotate', true);
  }
};
const unflipFn = () => {
  if (card.value) {
    card.value.classList.remove('flipped');
    isPositive.value == false;
    emits('rotate', false);
  }
};
</script>
<template>
  <div
    class="card blastoise"
    ref="card"
    @mouseenter="handleMouseEnter($event)"
    @mousemove="handleMouseMove($event)"
    @mouseleave="handleMouseLeave()"
  >
    <span class="inner-card-backface" ref="innerCardBackface">
      <span
        class="image"
        :style="{
          backgroundImage: `url(${bgimg1})`,
          'background-size': '100% 100%',
        }"
      >
        <span class="unflip" ref="unflip" v-show="!isHidden" @click="unflipFn"
          >返回</span
        >
      </span>
    </span>
    <span
      class="inner-card"
      ref="innerCard"
      :style="{
        backgroundImage: `url(${bgimg2})`,
        'background-size': '100% 100%',
      }"
    >
      <span class="flip" ref="flip" v-show="!isHidden" @click="flipFn"
        >翻转</span
      >
      <span class="glare"></span>
    </span>
  </div>
</template>
<style lang="less" scoped>
.white-container {
  background: white;
}
.black-container {
  background: black;
}

.card {
  box-shadow: none;
  backface-visibility: visible;
  background: transparent;
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
  transform-style: preserve-3d;
  padding: 0;
  height: auto;
  margin: 0 2em;
  width: 15em;
  height: 30em;
  float: left;
  transition: all 0.2s ease-out;
  border: none;
  letter-spacing: 1px;
}
.flip,
.unflip {
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.8em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0.5em 0.75em;
  border-radius: 100px;
  line-height: 1em;
  cursor: url('/static/pokemon/后台运行.cur'), auto;
  transition: all 0.1s ease-out;
}

.blastoise .flip,
.blastoise .unflip {
  background: #a7abdf;
  // box-shadow: 0 2px 20px #9fa2cc;
}

.blastoise .inner-card-backface .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 14px;
  height: 100%;
  transform: scaleX(-1);
  background-size: auto 102%;
  background-position: -2px -5px;
}
.unflip {
  top: auto;
  // background: #2d2d62;
  bottom: 0.5em;
  padding: 0.5em 0.75em;
  font-size: 1.5rem;
}
.flip:hover {
  background: rgba(0, 0, 0, 0.3);
}

.blastoise .flip:hover,
.blastoise .unflip:hover {
  background: #1c9eff;
}
.inner-card-backface {
  transform: rotateX(0) rotateY(0deg) scale(1) translateZ(-4px);
  border-radius: 14px;
  background: linear-gradient(45deg, #0b0b2a, #0b0b2a);
  position: absolute;
  top: 0;
  color: white;
  padding: 2em;
  box-sizing: border-box;
  transition: all 0.15s ease-out;
  will-change: transform, filter;
  left: 0;
  width: 100%;
  height: 100%;
}
.card.flipped {
  transform: rotateY(180deg);
}
.card .flip-inner-card {
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  padding: 2em 1.5em;
  box-sizing: border-box;
  left: 0;
  width: 100%;
  height: 100%;
}

.card .inner-card {
  font-size: 2em;
  color: white;
  padding: 1em 2em;
  line-height: 3em;
  will-change: transform, filter;
  float: none;
  background: black;
  background-size: calc(100% + 6px) auto;
  background-position: -3px -3px;
  margin: 0;
  transition: all 0.15s ease-out;
  height: auto;
  border-radius: 14px;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  margin: 0px auto;
  transform: rotateX(0deg) rotateY(0deg) scale(1);
  top: 0;
  height: 100%;
  filter: drop-shadow(0 15px 15px rgba(0, 0, 0, 0.3));
  font-weight: 500;
  perspective-origin: 0 0;
  letter-spacing: 0;
}
.card .glare {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.1s ease-out;
  opacity: 0.6;
  pointer-events: none;
  height: 100%;
  border-radius: 14px;
  z-index: 9999;
  mix-blend-mode: hard-light;
  background: radial-gradient(circle at 50% 50%, rgb(199 198 243), transparent);
}
</style>
