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
      flex: 1;
      background-color: #f5f5f5;
    }
  }
}
</style>
