<script setup>
import { ref, nextTick, onBeforeUnmount, computed, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import axios from 'axios';
import { userInfoStore, useAccountStore } from '@/stores';
import { storeToRefs } from 'pinia';
const account = useAccountStore();
const props = defineProps({
  uploadVisible: Boolean,
  imageUrl: String,
});
const { uploadVisible, imageUrl } = toRefs(props);
const emit = defineEmits(['update:uploadVisible', 'update:imageUrl']);
const handleBeforeClose = () => {
  emit('update:uploadVisible', false);
  clearImage();
  uploadImage.value = null;
  previewImage.value = null;
};
const user = userInfoStore();
const userInfo = storeToRefs(user);
//包含ip和头像、用户名、创建时间
const Info = computed(() => {
  return userInfo.userInfo.value || {};
});
const imageSrc = ref(null);
const croppedImageSrc = ref(null);
const dialogTitle = ref({ imgTitle: '上传图片' });
const fileList = ref([]);

const uploadImage = ref(null);
const previewImage = ref(null);
let cropper = null;
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传图片文件');
    return false;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    imageSrc.value = e.target.result;
    await nextTick();
    initCropper();
  };
  reader.readAsDataURL(file);
  return false;
};

const initCropper = () => {
  if (cropper) {
    cropper.destroy();
  }
  if (!uploadImage.value) return;

  cropper = new Cropper(uploadImage.value, {
    aspectRatio: 1,
    viewMode: 1,
  });
};

const cropImage = () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas({
      width: 200,
      height: 200,
    });
    croppedImageSrc.value = canvas.toDataURL('image/png');
  }
};

const clearImage = () => {
  imageSrc.value = null;
  croppedImageSrc.value = null;
  fileList.value = [];
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
};

const uploadCroppedImage = async () => {
  if (!croppedImageSrc.value) {
    ElMessage.error('请先裁剪图片');
    return;
  }
  try {
    const blob = dataURLToBlob(croppedImageSrc.value);
    const form = new FormData();
    // form.append('avatar', file);
    form.append('avatar', blob, 'avatar.png'); // 注意这里的表单字段名应为'file'
    // const response = await axios.post(
    //   'http://localhost:8888/v1/file/singleUploadFile',
    //   formData
    // );
    const response = await axios.post('/api/getimg', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-token': window.localStorage.getItem('x-token'),
      },
    });

    if (response.data.success) {
      emit('update:uploadVisible', false);
      emit('update:imageUrl', response.data.data);
      handleBeforeClose();
      let userData = {
        id: Info.value.id,
        avatarUrl: response.data.data,
      };
      let value = await account.upLoadAvatar(userData);
      if (value.data.success) {
        let personalDada = await account.getUserById({
          userId: Info.value.id,
        }); //重新获取用户信息

        user.setUserInfo(personalDada.data.data);
        ElMessage({
          type: 'success',
          message: value.data.msg,
        });
      }
    } else {
      ElMessage.error(response.data.msg || '上传失败');
    }
  } catch (error) {
    ElMessage.error('更新头像失败');
  }
};

const dataURLToBlob = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

onBeforeUnmount(() => {
  if (cropper) {
    cropper.destroy();
  }
});
</script>

<template>
  <div>
    <el-dialog
      :title="dialogTitle.imgTitle"
      width="800px"
      v-model="uploadVisible"
      :before-close="handleBeforeClose"
    >
      <div
        v-if="imageSrc"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <!-- Display cropped image or original image if not cropped with background -->
        <div
          style="
            width: 50%;
            padding: 10px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <img
            ref="previewImage"
            :src="croppedImageSrc || imageSrc"
            alt="Preview Image"
            style="max-width: 100%; height: auto"
          />
        </div>

        <!-- Upload image section without background -->
        <div
          style="
            width: 50%;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <img
            ref="uploadImage"
            :src="imageSrc"
            alt="Source Image"
            style="max-width: 100%; height: auto"
          />
        </div>
      </div>

      <!-- Centered buttons -->
      <div v-if="imageSrc" style="margin-top: 20px; text-align: center">
        <el-button type="primary" @click="cropImage">裁剪图片</el-button>
        <el-button @click="clearImage">重新选择</el-button>
        <el-button type="primary" @click="uploadCroppedImage"
          >上传头像</el-button
        >
      </div>

      <!-- Conditional display for upload component -->
      <el-upload
        v-if="!imageSrc"
        class="upload-demo"
        drag
        action="https://agnw.me:3000/api/getimg"
        multiple
        v-model:file-list="fileList"
        :limit="1"
        :show-file-list="false"
        :before-upload="beforeUpload"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖动图片至此 或者 <em>点击此处选择路径</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">jpg/png 格式的文件小于 500kb</div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
  <div>
    <!-- <img :src="imageUrl" alt="" /> -->
  </div>
</template>
<style lang="less" scoped>
.upload-demo .el-upload {
  display: block;
  width: 100%;
  margin-bottom: 20px;
}

.el-upload__text {
  color: #606266;
  font-size: 14px;
  line-height: 22px;
  margin-top: 5px;
}

.el-upload__tip {
  color: #909399;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 7px;
}
</style>
