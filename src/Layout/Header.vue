<template>
  <el-page-header :icon="null" title="待办列表" @back="onBack">
    <template #content>
      <div class="sign">
        <div @click="openAvatar" class="headerAvatar">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </div>
        <XxtImgpond
          v-model:uploadVisible="dialogVisible"
          v-model:imageUrl="imageUrl"
        ></XxtImgpond>
        <div class="username">{{ Info.username }}</div>
      </div>
    </template>
    <template #extra>
      <div style="display: flex; align-items: center">
        <el-dropdown class="blogLink" @command="handleClick">
          <span class="el-dropdown-link">
            私人博客
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="1">1.0</el-dropdown-item>
              <el-dropdown-item :command="2">2.0</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="primary" class="ml-2" @click="loginOut"
          >退出登录</el-button
        >
      </div>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import router from '@/router';
import { ElNotification as notify } from 'element-plus';
import { ref, computed, onBeforeMount } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useHomeStore, userInfoStore } from '@/stores';
import { storeToRefs } from 'pinia';
const user = userInfoStore();
const userInfo = storeToRefs(user);
//打开头像弹窗
const dialogVisible = ref(false);
const openAvatar = () => {
  dialogVisible.value = true;
};

//包含ip和头像、用户名、创建时间
const Info = computed(() => {
  return userInfo.userInfo.value || {};
});

const imageUrl = ref('');

const blogAddress1 = `https://agnw.me:8080?token=${localStorage.getItem(
  'x-token'
)}`;
const blogAddress2 = `https://agnw.me:3002`;
const handleClick = (e: number) => {
  if (e == 1) {
    window.open(blogAddress1);
  } else if (e == 2) {
    window.open(blogAddress2);
  }
};
const loginOut = () => {
  userInfoStore().loginOut();
  setTimeout(() => {
    router.push('/login');
  }, 500);
};
const onBack = () => {
  console.log('router', router);

  if (String(router.currentRoute.value.path) == '/todo/list') {
    // router.go(0);
    notify('已在当前页面');
  } else {
    router.push('/todo/list');
    notify('返回任务列表');
  }
};
//进入页面时避免只启用部分黑暗样式
import { useDark } from '@vueuse/core';
import { changeSun, changeMoon } from '@/utils/themeChange';
const isDark = useDark();
onBeforeMount(() => {
  imageUrl.value = Info.value.avatar; //获取头像
  isDark.value ? changeMoon() : changeSun();
});
</script>
<style scoped lang="less">
:deep(.el-page-header__title) {
  &:hover {
    color: #409eff;
  }
}
.el-tooltip__trigger:focus-visible {
  outline: unset;
}
.el-page-header {
  z-index: 99;
}
.sign {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 45px;
  .headerAvatar {
    cursor: url('/static/pokemon/后台运行.cur'), pointer;
    .avatar {
      width: 35px;
      height: 35px;
      display: block;
    }
  }
  .username {
    color: var(--title-color);
    padding: 0 10px;
  }
}
.avatar-uploader {
  background-color: gainsboro;
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    height: 300px;
    width: 300px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: url('/static/pokemon/后台运行.cur'), pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 35px;
  height: 35px;
  text-align: center;
}
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
  margin-right: 1.2em;
  padding: 0.2em;
  color: var(--title-color);
}
</style>
