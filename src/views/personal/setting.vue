<script setup>
const enterFullscreen = () => {
  const targetElement = document.documentElement; // 全屏目标元素为html根元素
  if (targetElement.requestFullscreen) {
    targetElement.requestFullscreen();
  } else if (targetElement.mozRequestFullScreen) {
    // 兼容Firefox
    targetElement.mozRequestFullScreen();
  } else if (targetElement.webkitRequestFullscreen) {
    // 兼容Chrome、Safari和Opera
    targetElement.webkitRequestFullscreen();
  } else if (targetElement.msRequestFullscreen) {
    // 兼容IE11
    targetElement.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // 兼容Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // 兼容Chrome、Safari和Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // 兼容IE11
    document.msExitFullscreen();
  }
};

const toggleFullscreen = () => {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
};

const isFullscreen = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};
</script>

<template>
  <div>
    <h1>用户设置</h1>
    <!-- 点击按钮进入或退出全屏模式 -->
    <button @click="toggleFullscreen">切换全屏</button>

    <!-- 其他页面内容 -->
  </div>
</template>

<style lang="less" scoped></style>
