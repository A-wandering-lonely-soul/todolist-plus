<script lang="ts" setup>
import Menu from '@/Layout/Menu.vue';
import Hearder from '@/Layout/Header.vue';
</script>

<template>
  <div class="main">
    <Hearder></Hearder>
    <div class="content">
      <Menu></Menu>
      <div class="routerView">
        <RouterView :key="$route.fullPath"></RouterView>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .content {
    flex: 1;
    display: flex;
    .routerView {
      min-width: calc(100vw - var(--menu-expand-width));
      flex: 1;
      background-color: var(--page-background);
    }
  }
}
</style>
