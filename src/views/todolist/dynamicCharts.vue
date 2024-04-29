<template>
  <div :class="['es-screen-container', { light: !isDark }]">
    <div class="screen-header">
      <Header></Header>
    </div>
    <div class="screen_main">
      <div class="screen_main_left">
        <LEFT></LEFT>
      </div>
      <div class="screen_main_middle"></div>
      <div class="screen_main_right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import Header from '@/components/dynamicCharts/Header.vue';
import LEFT from '@/components/dynamicCharts/left/index.vue';
const isDark = useDark();
</script>
<style lang="less" scoped>
.es-screen-container {
  --es-screen-bg: rgb(22, 21, 34);
  --es-screen-text-color: #fff;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  background: var(--es-screen-bg);
  color: var(--es-screen-text-color);
  display: flex;
  flex-direction: column;
  .screen-header {
    height: 72px;
  }
  .screen_main {
    display: flex;
    flex: 1;
    &_left {
      width: 500px;
      // background-color: red;
    }
    &_middle {
      flex: 1;
      // background-color: yellow;
    }
    &_right {
      width: 300px;
      // background-color: blue;
    }
  }
}

.light {
  --es-screen-bg: rgb(238, 238, 238);
  --es-screen-text-color: rgb(22, 21, 34);
}
</style>
