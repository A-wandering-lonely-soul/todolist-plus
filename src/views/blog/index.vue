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
  pageNum: 1,
  pageSize: 10,
});
let total = ref(0);
let blogList = ref([]);
//反野
const changePage = (e: number) => {
  formInline.pageNum = e;
  getBlogData();
};
onMounted(() => {
  getBlogData();
});
//清空表单
const resetData = () => {
  Object.assign(formInline, {
    title: '',
    keywords: '',
    date: '',
    pageNum: 1,
    pageSize: 10,
  });

  getBlogData();
};
const getBlogData = () => {
  //获取列表
  blog.GET_BLOG_DATA(formInline).then((res) => {
    blogList.value = res.data.data; // 更新响应式变量的值
    total.value = res.data.total;
  });
  // blog.GET_BLOG_DATA(formInline).then((res) => {
  //   Object.assign(blogList, data);
  // });
};
type RouteParamValueRaw = /*unresolved*/ any;
const delFn = (id: RouteParamValueRaw | (string | number)[]) => {
  ElMessageBox.confirm('你想要删除这个博客吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
  })
    .then(async () => {
      await blog.DELETE_BLOG_DATA({ id });
      getBlogData();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};
const editFn = (id: RouteParamValueRaw | (string | number)[]) => {
  router.push({ name: 'issue', query: { id: id } });
};
//表格样式
const tableStyle = reactive({
  background: '#F3F7FA',
  height: '77px',
  'font-size': '20px',
  'font-family': 'Microsoft YaHei-Bold, Microsoft YaHei',
  'font-weight': 'bold',
  color: '#5987AA',
});
const rowStyle = reactive({
  height: '48px',
  'font-size': '18px',
  'font-family': 'Microsoft YaHei-Regular, Microsoft YaHei',
  'font-weight': '400',
  color: '#333333',
});
</script>

<template>
  <div class="contain">
    <div class="topBar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="formInline.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formInline.keywords" placeholder="请添加标签" clearable />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="formInline.date"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择日期"
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
      <el-table
        :data="blogList"
        style="width: 100%"
        :header-cell-style="tableStyle"
        :row-style="rowStyle"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="date" label="创建日期" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="keywords" label="关键字" align="center" />
        <el-table-column fixed="right" align="center" label="操作">
          <template v-slot="{ row }">
            <el-button link type="primary" size="middle" @click="delFn(row.id)">删除</el-button>
            <el-button link type="primary" size="middle" @click="editFn(row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next,total"
        @current-change="changePage"
        :total="total"
      />
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
    width: 100%;
    min-height: 70vh;
    overflow: auto;
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
}
</style>
