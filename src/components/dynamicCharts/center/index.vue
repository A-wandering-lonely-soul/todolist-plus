<template>
  <div class="hexagon">
    <XxtWordCloud class="wrapper">
      <div class="item" v-for="item in indiArr" :key="item.title">
        <div class="es-screen-header-background"></div>
        <div class="shape" :class="[item.type, item.color]"></div>
        <div class="title">{{ item.title }}</div>
      </div>
    </XxtWordCloud>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
const indiArr = ref([
  {
    title: '城市分部',
    type: 'four',
    color: 'color2',
  },
  {
    title: '就业数据',
    type: 'four',
    color: 'color3',
  },
  {
    title: '魅力数据',
    type: 'four',
    color: 'color4',
  },
  {
    title: '天气数据',
    type: 'six',
    color: 'color1',
  },
  {
    title: '推送服务',
    type: 'three',
    color: 'color6',
  },
  {
    title: '算力资源',
    type: 'zero',
    color: 'color5',
  },
]);
</script>

<style scoped lang="less">
.hexagon {
  width: 100%;
  height: 100%;
  // background-image: url(@/assets/styleBg2.jpg); //背景图
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  padding: 10px;
  transition: 0.8s;
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15rem;
      height: 15rem;
      .es-screen-header-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(@/assets/blingBg.png); //背景图
        background-repeat: no-repeat;
        background-size: 100% 100%;
        opacity: 0.5; /* 设置背景图透明度为50% */
      }
      .shape {
        position: absolute; // 父元素要加上position: relative;
        top: 70px;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-bottom: 10px;
        &.color1 {
          background-color: #d64c3b;
        }
        &.color2 {
          background-color: #ffd943;
        }
        &.color3 {
          background-color: #ffa328;
        }
        &.color4 {
          background-color: #46c2ff;
        }
        &.color5 {
          background-color: #8f0eb8;
        }
        &.color6 {
          background-color: #232cff;
        }
      }
      .title {
        position: absolute;
        top: 40%;
        // left: 0%;
        width: 100%;
        padding: 0 20px;
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 35px;
        text-shadow: 0px 0px 10px rgba(30, 198, 255, 0.8);
        text-align: center;
      }
    }
  }
}
</style>
