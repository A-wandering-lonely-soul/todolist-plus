<template>
  <el-page-header :icon="null" title="todoList" @back="onBack">
    <template #content>
      <div class="sign">
        <div @click="openAvatar" class="headerAvatar">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </div>
        <el-dropdown class="blogLink" @command="handleClick">
          <span class="el-dropdown-link">
            NEXT博客
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="1"> 1.0 </el-dropdown-item>
              <el-dropdown-item :command="2">2.0</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2" @click="loginOut"
          >退出登录</el-button
        >
      </div>
    </template>
  </el-page-header>
  <el-dialog
    v-model="dialogVisible"
    title="修改头像"
    width="30%"
    :before-close="closeAvatar"
  >
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadImg"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </el-dialog>
</template>
<script lang="ts" setup>
import router from '@/router';
import { ElNotification as notify } from 'element-plus';
import { ref, computed, onBeforeMount } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { useHomeStore, userInfoStore, useAccountStore } from '@/stores';
import { storeToRefs } from 'pinia';
import axios from 'axios';
const user = userInfoStore();
const userInfo = storeToRefs(user);
//打开头像弹窗
const dialogVisible = ref(false);
const openAvatar = () => {
  dialogVisible.value = true;
};
//关闭弹窗
const closeAvatar = () => {
  dialogVisible.value = false;
};
//包含ip和头像、用户名、创建时间
const Info = computed(() => {
  return userInfo.userInfo.value || {};
});
const home = useHomeStore();
const account = useAccountStore();
const imageUrl = ref('');
const uploadImg = async (data: any) => {
  let file = data.file;
  new Promise((rev, rej) => {
    const form = new FormData();
    form.append('avatar', file);
    axios
      .post('/api/getimg', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': window.localStorage.getItem('x-token'),
        },
      })
      .then(async (res) => {
        imageUrl.value = res.data.data; //图片回显
        let userData = {
          id: Info.value.id,
          avatarUrl: res.data.data,
        };
        let value: any = await account.upLoadAvatar(userData);
        if (value.data.success) {
          let personalDada: any = await account.getUserById({
            userId: Info.value.id,
          }); //重新获取用户信息
          console.log('personalDada', personalDada);

          user.setUserInfo(personalDada.data.data);
          ElMessage({
            type: 'success',
            message: value.data.msg,
          });
        } else {
          ElMessage({
            type: 'error',
            message: '更新图片失败',
          });
        }

        return rev(res);
      })
      .catch((error) => rej(error));
  });
};
const beforeAvatarUpload: InstanceType<typeof UploadProps> = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
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
    router.go(0);
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
.el-tooltip__trigger:focus-visible {
  outline: unset;
}
.el-page-header {
  z-index: 99;
}
.sign {
  display: flex;
  justify-content: flex-start;
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
  margin: 0.2em;
  color: var(--title-color);
}
</style>
