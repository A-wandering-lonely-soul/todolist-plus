<template>
  <div :class="['es-screen-container', { light: !isDark }]">
    <div
      ref="screenRef"
      class="es-screen"
      :style="{ paddingLeft: screePdLeft, paddingTop: screePdHeight }"
    >
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
import { onMounted, ref, computed, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useResize } from '@/utils/useResize';
import { userInfoStore } from '@/stores';
import { storeToRefs } from 'pinia';

const user = userInfoStore();
const userInfo = storeToRefs(user);
const isCollapse = computed(() => {
  //用户账号和密码
  return userInfo.isCollapse.value !== undefined
    ? userInfo.isCollapse.value
    : true;
});

const { screenRef, scale } = useResize();
//计算左侧偏离值（菜单栏宽度）
const screePdLeft = computed(() => {
  return isCollapse.value
    ? `calc(var(--menu-close-width) / ${scale.value})`
    : `calc(var(--menu-expand-width) / ${scale.value})`;
});
const screePdHeight = computed(() => {
  return `calc(var(--hearder-height) / ${scale.value})`;
});

// watch(
//   userInfo.isCollapse,
//   (newV) => {
//   },
//   { deep: true }
// );
import Header from '@/components/dynamicCharts/header.vue';
import LEFT from '@/components/dynamicCharts/left/index.vue';
import RIGHT from '@/components/dynamicCharts/right/index.vue';
import MIDDLE from '@/components/dynamicCharts/center/index.vue';

const isDark = useDark();
</script>
<style lang="less" scoped>
.es-screen-container {
  --es-screen-bg: rgb(22, 21, 34);
  --es-screen-text-color: #fff;
  --es-block-bg: #222733;
  --el-title-height: 2rem;
  --es-screen-width: 1920px;
  --es-screen-height: 1080px;
  --muenu-height: 0;
  width: 100%;
  height: 100%;
  background: var(--es-screen-bg);
  color: var(--es-screen-text-color);
  overflow: hidden;
  .es-screen {
    position: absolute;
    user-select: none;
    top: 50%;
    left: 50%;
    width: var(--es-screen-width);
    height: var(--es-screen-height);
    margin-left: calc(var(--es-screen-width) * 0.5 - var(--es-screen-width));
    margin-top: calc(var(--es-screen-height) * 0.5 - var(--es-screen-height));
    // max-width: calc(100% - var(--menu-close-width));
    // max-height: calc(100% - var(--hearder-height));
    display: flex;
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
