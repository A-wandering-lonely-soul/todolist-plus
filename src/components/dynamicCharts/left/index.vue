<template>
  <div ref="containerRef" class="leftBox">
    <component
      v-for="item in components"
      :key="item.name"
      :is="item.component"
      class="es-screen-left-item"
      :name="item.name"
    >
      <Left1 />
    </component>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useSortable } from '@/utils/useSortable';

import Left1 from './Map.vue';
import Left2 from './employment.vue';
const components = shallowRef([
  { name: 'left1', component: Left1 },
  { name: 'left2', component: Left2 },
]);

const { containerRef } = useSortable(components);
</script>

<style lang="less" scoped>
.leftBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 20px);
}
.es-screen-left-item {
  width: 100%;
  height: 50%;
  background-color: var(--es-block-bg);
  // padding: 16px;
  animation-name: slide;

  & + & {
    margin-top: 20px;
  }
  &[name='left1'] {
    min-height: 400px;
    animation-duration: 0.8s;
  }
  &[name='left2'] {
    animation-duration: 1.5s;
  }
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  80% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
