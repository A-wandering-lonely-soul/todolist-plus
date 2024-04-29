<template>
  <div class="es-screen-header">
    <h1 class="es-screen-logo">
      <span>ES Big Screen</span>
    </h1>
    <div class="es-screen-header-title">大屏可视化</div>
    <div class="es-screen-header-right">
      <img class="theme-change" :src="icon" @click="handleChangeTheme" />
      <span class="datetime">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import darkIcon from '@/assets/screen/qiehuan_dark.png';
import lightIcon from '@/assets/screen/qiehuan_light.png';
import { changeSun, changeMoon } from '@/utils/themeChange';

const isDark = useDark();
import moment from 'moment';
const icon = computed(() => (isDark.value ? darkIcon : lightIcon));
const currentTime = ref('');
const timeId = ref();
const handleChangeTheme = () => {
  isDark.value = !isDark.value;
  isDark.value ? changeMoon() : changeSun();
  useToggle(isDark);
};
const startTime = () => {
  timeId.value = setTimeout(() => {
    currentTime.value = moment().format('YYYY-MM-DD HH:mm:ss');
    startTime();
  }, 1000);
};

onBeforeUnmount(() => {
  clearTimeout(timeId.value);
});

startTime();
</script>

<style lang="less" scoped>
.es-screen-header {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/screen/header_border_dark.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: fade 3s;
  &-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 487px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 7px;
    text-shadow: 0px 2px 20px rgba(222, 171, 155, 0.6);
  }
  .es-screen-logo {
    display: flex;
    align-items: center;
    height: calc(100% - 20px);
  }
  &-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      width: 30px;
      margin-right: 16px;
      cursor: pointer;
      transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
