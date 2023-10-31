<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useBlogStore } from '@/stores';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
const router = useRouter();
const blog = useBlogStore();
const formInline = reactive({
  title: '',
  keywords: '',
  date: '',
});
let blogList = ref([]);
const onSubmit = () => {
  console.log('submit!');
};
onMounted(() => {
  getBlogData();
});
const resetData = () => {
  Object.assign(formInline, {
    title: '',
    keywords: '',
    date: '',
  });

  getBlogData();
};
const getBlogData = () => {
  blog.GET_BLOG_DATA(formInline).then((res) => {
    blogList.value = res.data.data; // 更新响应式变量的值
  });
  // blog.GET_BLOG_DATA(formInline).then((res) => {
  //   Object.assign(blogList, data);
  // });
};
type RouteParamValueRaw = /*unresolved*/ any;
const delFn = (id: RouteParamValueRaw | (string | number)[]) => {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
    }
  )
    .then(async () => {
      await blog.DELETE_BLOG_DATA({ id });
      getBlogData();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
const editFn = (id: RouteParamValueRaw | (string | number)[]) => {
  router.push({ name: 'issue', query: { id: id } });
};
</script>

<template>
  <div class="contain">
    <div class="topBar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="formInline.title" placeholder="title by" clearable />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formInline.keywords" placeholder="keywords by" clearable />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="formInline.date"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="Pick a date"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getBlogData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mdeditor">
      <el-table :data="blogList" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="date" label="创建日期" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="keywords" label="关键字" />
        <el-table-column align="right">
          <template v-slot="{ row }">
            <el-button link type="primary" size="small" @click="delFn(row.id)">删除</el-button>
            <el-button link type="primary" size="small" @click="editFn(row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="less" scoped>
::v-deep .el-table--fit {
  height: 100%;
  overflow: auto;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
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
