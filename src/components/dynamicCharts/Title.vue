<template>
  <h3 class="es-screen-title">
    <slot>
      {{ title }}
    </slot>
  </h3>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>

<style lang="less" scoped>
.es-screen-title {
  position: relative;
  padding-left: 20px;
  line-height: 2rem;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: var(--es-screen-text-color);
  }
}
</style>
