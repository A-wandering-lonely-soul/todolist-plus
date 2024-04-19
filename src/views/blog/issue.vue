<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { FormInstance, FormRules } from 'element-plus';
import { useBlogStore } from '@/stores';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import axios from 'axios';
const route = useRoute();
const router = useRouter();
const blog = useBlogStore();
const ruleFormRef = ref<InstanceType<typeof FormInstance>>();
const addGroupRef = ref<InstanceType<typeof FormInstance>>();
let formModel = reactive({
  title: '',
  keywords: '',
  contentHtml: '',
});
const rules = reactive<InstanceType<typeof FormRules>>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 20, message: '长度1到20之间', trigger: 'blur' },
  ],
  keywords: [
    {
      required: true,
      message: '请添加标签',
      trigger: 'blur',
    },
  ],
});
const onSubmit = async () => {
  await ruleFormRef.value.validate((valid: boolean, fields: any) => {
    if (valid) {
      //新增
      blog.CREATED_BLOG(formModel).then((res) => {
        if (res.data.success) {
          Object.assign(formModel, {
            id: blogId ? blogId : null,
            title: '',
            keywords: '',
            contentHtml: '',
          });
          router.push('/blog/manage');
        }
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleOnUploadImg = async (
  files: Array<File>,
  callback: (urls: string[]) => void
) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('avatar', file);
        axios
          .post('/api/getimg', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-token': window.localStorage.getItem('x-token'),
            },
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );
  callback(
    res.map((item: any) => {
      return item.data.data;
    })
  );
};

let blogId = reactive<any>(null);
onMounted(() => {
  console.log(route.query);
  if (route.query.id) {
    blogId = route.query.id;
    blog.GET_BLOG_BYID({ id: blogId }).then((res: any) => {
      Object.assign(formModel, res.data[0]);
    });
  }
});
</script>

<template>
  <div class="contain">
    <div class="topBar">
      <el-form
        ref="ruleFormRef"
        :inline="true"
        :model="formModel"
        :rules="rules"
        class="demo-form-inline"
        size="large"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="formModel.title"
            placeholder="请输入标题"
            clearable
          />
        </el-form-item>
        <el-form-item label="标签" prop="keywords">
          <el-input
            v-model="formModel.keywords"
            placeholder="请添加标签"
            clearable
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" size="large" @click="onSubmit">提交</el-button>
    </div>
    <div class="mdeditor">
      <!-- markdown 编辑器 -->
      <MdEditor
        v-model="formModel.contentHtml"
        @onUploadImg="handleOnUploadImg"
        style="height: calc(100vh - 205px)"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
:deep(.el-form-item__label) {
  font-size: 20px;
}
.contain {
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .topBar {
    min-height: 100px;
    max-height: 305px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mdeditor {
    flex: 1;
  }
}
</style>
