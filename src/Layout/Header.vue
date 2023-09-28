<template>
  <el-page-header :icon="null" @back="onBack">
    <template #content>
      <div class="flex items-center">
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text-large font-600 mr-3">NEXT</span>
        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">博客</span>
        <el-tag class="blogLink">
          <a href="http://winterfinale.com:8080/">点击跳转</a>
        </el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2" @click="loginOut">退出登录</el-button>
      </div>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import router from '@/router';
import { ElNotification as notify } from 'element-plus';
import { userInfoStore } from '@/stores';
const loginOut = () => {
  userInfoStore().loginOut();
  router.push('/login');
};
const onBack = () => {
  console.log('router', router);

  if (String(router.currentRoute.value.path) == '/todo/list') {
    router.go(0);
    notify('已在当前页面');
  } else {
    router.push('/todo/list');
    notify('返回任务列表');
  }
};
</script>
<style scoped lang="less">
.el-page-header {
  padding: 0 15px;
}
.text-large {
  padding: 0.2em;
}
.text-sm {
  padding: 0.1em;
}
.blogLink {
  margin: 0.2em;
  a:hover {
    color: skyblue;
  }
}
</style>
