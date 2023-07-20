<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
// 获取菜单按钮元素
const isActive = ref(false);
const toggleActive = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="bigBOx">
    <div class="content">
      <!-- 页面主体容器 -->
      <div class="Box">
        <!-- 按钮组容器 -->
        <div class="box" ref="box" @click="toggleActive">
          <!-- 菜单按钮容器 -->
          <Menu style="width: 2em; height: 2em"></Menu>
          <!-- 菜单按钮图标 -->
        </div>
        <div>
          <!-- 面板容器，包含了多个链接和图标元素 -->
          <p href="#" class="panel" style="--i: 0" :class="{ active: isActive }">
            <!-- 面板元素，包含链接和图标 -->
            <i style="width: 1.5em; height: 1.5em">
              <FullScreen />
            </i>
            <!-- 图标元素 -->
          </p>
          <p href="#" class="panel" style="--i: 1" :class="{ active: isActive }">
            <i style="width: 1.5em; height: 1.5em">
              <Search />
            </i>
          </p>
          <p href="#" class="panel" style="--i: 2" :class="{ active: isActive }">
            <i style="width: 1.5em; height: 1.5em">
              <CircleCloseFilled />
            </i>
          </p>
          <p href="#" class="panel" style="--i: 3" :class="{ active: isActive }">
            <i style="width: 1.5em; height: 1.5em">
              <CircleCloseFilled />
            </i>
          </p>
          <p href="#" class="panel" style="--i: 4" :class="{ active: isActive }">
            <i style="width: 1.5em; height: 1.5em">
              <CircleCloseFilled />
            </i>
          </p>
          <p href="#" class="panel" style="--i: 5" :class="{ active: isActive }">
            <i style="width: 1.5em; height: 1.5em">
              <CircleCloseFilled />
            </i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bigBOx {
  width: 100%;
  height: 100%;
}
.content {
  position: fixed;
  bottom: 20vh;
  right: 15vw;
}

/* 设计一个圆形的盒子 */
.Box {
  position: relative;
  font-size: 18px;
  border-radius: 50%; /* 设置为50%的圆角，形成圆形的效果 */
}

/* 为了形成浮现的效果，创建一个看似空白的盒子 */
.box {
  content: ''; /* 没有实际内容 */
  background: #000; /* 盒子背景为黑色 */
  position: absolute; /* 位置固定 */
  top: 50%; /* 距离顶部50%的位置 */
  left: 50%; /* 距离左侧50%的位置 */
  transform: translate(-50%, -50%); /* 平移到中心 */
  width: 4em; /* 宽度为4em */
  height: 4em; /* 高度为4em */
  border-radius: 50%; /* 设置圆角，形成圆形的效果 */
  z-index: 1; /* 盒子在面板上浮现 */
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.8); /* 创建一个黑色阴影 */
  display: flex; /* 让盒子内部的元素居中 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 盒子内部的图标 */
.box i {
  color: #fff; /* 图标颜色为白色 */
  font-size: 1.3em; /* 图标的字体大小 */
}

/* 设计一组可以展开的面板 */
.panel {
  background: rgba(0, 0, 0, 0.5); /* 设置面板背景颜色 */
  text-decoration: none; /* 去除默认超链接下划线 */
  width: 11.7em; /* 设置面板的宽度 */
  height: 10em; /* 设置面板的高度 */
  position: absolute; /* 位置固定 */
  top: 50%; /* 距离顶部50%的位置 */
  left: 50%; /* 距离左侧50%的位置 */
  color: #fff; /* 设置字体颜色为白色 */
  transform-origin: top center; /* 支点位于顶部中心 */
  transition: width 0.1s, height 0.1s, opacity 0.2s; /* 在展开面板时设置过度效果 */
  clip-path: polygon(
    50% 0%,
    0% 100%,
    100% 100%
  ); /* 设置非常规形状，用于创建三角形效果 */
  backdrop-filter: blur(2px); /* 在背景上添加边缘模糊 */
}

/* 为每个面板定义一个动画 */
.panel {
  transition-delay: calc(0.08s * var(--i)); /* 设置过渡延迟 */
  transform: translateX(-50%) rotate(calc(60deg * var(--i))); /* 展开动画 */
}

/* 设计合适的图标 */
.panel i {
  transform: translateX(-50%) rotate(calc(60deg * var(--i))); /* 图标跟随动画产生偏移 */
}

/* 鼠标悬停时修改面板背景颜色 */
.panel:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* 面板中图标的大小位置 */
.panel i {
  font-size: 2.5em;
  position: absolute;
  top: 50%;
  left: 50%;
}

/* 面板初始状态被隐藏 */
.panel {
  opacity: 0; /* 初始面板透明 */
  width: 0; /* 初始面板宽度为0 */
  height: 0; /* 初始面板高度为0 */
}

/* 激活状态下修改面板的尺寸和颜色 */
.active {
  opacity: 1; /* 面板透明度为1 */
  height: 10em; /* 面板高度为10em */
  width: 11.7em; /* 面板宽度为11.7em */
}
</style>
