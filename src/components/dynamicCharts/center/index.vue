<template>
  <div class="hexagon">
    <XxtWordCloud class="wrapper">
      <div class="item" v-for="item in indiArr" :key="item.title">
        <div class="es-screen-header-background"></div>
        <div class="shape" :class="[item.type, item.color]">
          <div class="six-wrapper" v-if="item.type === 'six'">
            <div class="main1 tool"></div>
            <div class="main2 tool"></div>
            <div class="main3 tool"></div>
            <div class="main4 tool"></div>
            <div class="main5 tool"></div>
            <div class="main6 tool"></div>
          </div>
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </XxtWordCloud>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
const indiArr = ref([
  {
    title: '销售数据',
    type: 'four',
    color: 'color2',
  },
  {
    title: '库存数据',
    type: 'four',
    color: 'color2',
  },
  {
    title: '顾客数据',
    type: 'four',
    color: 'color3',
  },
  {
    title: '财务数据',
    type: 'four',
    color: 'color3',
  },
  {
    title: '营销数据',
    type: 'four',
    color: 'color4',
  },
  {
    title: '员工数据',
    type: 'six',
    color: 'color1',
  },
  {
    title: '竞争数据',
    type: 'six',
    color: 'color1',
  },
  {
    title: '市场数据',
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
        // 圆形
        &.zero {
          width: 33px;
          height: 33px;
          border-radius: 50%;
          // background-color: red;
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
        // 三角形
        &.three {
          top: 75px;
          left: 33%;
          width: 0;
          height: 0;
          // border: 40px solid red;
          // border-color: red transparent transparent transparent;
          transform-origin: 50% 0 0;
          transform: scaleX(0.6) rotateX(180deg);
          &.color1 {
            border: 40px solid #d64c3b;
            border-color: #d64c3b transparent transparent transparent;
          }
          &.color2 {
            border: 40px solid #ffd943;
            border-color: #ffd943 transparent transparent transparent;
          }
          &.color3 {
            border: 40px solid #ffa328;
            border-color: #ffa328 transparent transparent transparent;
          }
          &.color4 {
            border: 40px solid #46c2ff;
            border-color: #46c2ff transparent transparent transparent;
          }
          &.color5 {
            border: 40px solid #8f0eb8;
            border-color: #8f0eb8 transparent transparent transparent;
          }
          &.color6 {
            border: 40px solid #232cff;
            border-color: #232cff transparent transparent transparent;
          }
        }
        // 正方形
        &.four {
          width: 33px;
          height: 33px;
          // background-color: red;
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
        // 六边形
        &.six {
          left: 46%;
          .six-wrapper {
            transform: scale(0.3);
            .main2 {
              transform: rotate(60deg);
            }
            .main3 {
              transform: rotate(120deg);
            }
            .main4 {
              transform: rotate(180deg);
            }
            .main5 {
              transform: rotate(240deg);
            }
            .main6 {
              transform: rotate(300deg);
            }
            .tool {
              width: 0px;
              height: 0px;
              border-right: calc(60px / 1.732) solid transparent;
              border-left: calc(60px / 1.732) solid transparent;
              // border-bottom: 60px solid red;
              transform-origin: top;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          &.color1 {
            .tool {
              border-bottom: 60px solid #d64c3b;
            }
          }
          &.color2 {
            .tool {
              border-bottom: 60px solid #ffd943;
            }
          }
          &.color3 {
            .tool {
              border-bottom: 60px solid #ffa328;
            }
          }
          &.color4 {
            .tool {
              border-bottom: 60px solid #46c2ff;
            }
          }
          &.color5 {
            .tool {
              border-bottom: 60px solid #8f0eb8;
            }
          }
          &.color6 {
            .tool {
              border-bottom: 60px solid #232cff;
            }
          }
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
