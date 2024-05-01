<template>
  <div :class="['es-screen-container', { light: !isDark }]">
    <div ref="screenRef" class="es-screen">
      <div class="screen-header">
        <Header></Header>
      </div>
      <div class="screen_main">
        <div class="screen_main_left">
          <LEFT></LEFT>
        </div>
        <div class="screen_main_middle">
          <MIDDLE></MIDDLE>
        </div>
        <div class="screen_main_right">
          <RIGHT></RIGHT>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useResize } from '@/utils/useResize';

const { screenRef, scale } = useResize();

import Header from '@/components/dynamicCharts/header.vue';
import LEFT from '@/components/dynamicCharts/left/index.vue';
import RIGHT from '@/components/dynamicCharts/right/index.vue';
import MIDDLE from '@/components/dynamicCharts/center/index.vue';

const isDark = useDark();
// onMounted(() => {
//   const screenData: any = {
//     width: screenRef.value.offsetWidth,
//     height: screenRef.value.offsetHeight,
//     fullScreen: false,
//     delay: 100,
//   };
//   useResize(screenData);
// });
</script>
<style lang="less" scoped>
.es-screen-container {
  --es-screen-bg: rgb(22, 21, 34);
  --es-screen-text-color: #fff;
  --es-block-bg: #222733;
  --el-title-height: 2rem;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  background: var(--es-screen-bg);
  color: var(--es-screen-text-color);
  overflow: hidden;
  .es-screen {
    position: fixed;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: calc(100% - var(--hearder-height));
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    .screen-header {
      height: 72px;
    }
    .screen_main {
      display: flex;
      flex: 1;
      &_left {
        width: 400px;
        // background-color: red;
      }
      &_middle {
        flex: 1;
        min-width: 400px;
        // background-color: yellow;
      }
      &_right {
        width: 400px;
        // background-color: blue;
      }
    }
  }
}

.light {
  --es-screen-bg: linear-gradient(to bottom, #eeeeee, #afc6da);
  --es-screen-text-color: rgb(22, 21, 34);
  --es-block-bg: #fff;
}
</style>
