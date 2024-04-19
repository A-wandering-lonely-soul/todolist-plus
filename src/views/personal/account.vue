<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useAccountStore, userInfoStore } from '@/stores';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { storeToRefs } from 'pinia';
import type { userType } from '@/types';
import type { FormInstance, FormRules } from 'element-plus';

import axios from 'axios';
const user = userInfoStore();
const userInfo = storeToRefs(user);
const router = useRouter();
const account = useAccountStore();
const formInline = reactive({
  username: '',
  date: '',
  pageNum: 1,
  pageSize: 10,
});
let total = ref(0);
let accountList = ref([]);
//反野
const changePage = (e: number) => {
  formInline.pageNum = e;
  getAccountData();
};
onMounted(() => {
  getAccountData();
});
//清空表单
const resetData = () => {
  Object.assign(formInline, {
    username: '',
    date: '',
    pageNum: 1,
    pageSize: 10,
  });
  getAccountData();
};
const getAccountData = () => {
  //获取列表
  account.getUserList(formInline).then((res: any) => {
    accountList.value = res.data.data; // 更新响应式变量的值
    total.value = res.data.total;
  });
  // account.GET_BLOG_DATA(formInline).then((res) => {
  //   Object.assign(accountList, data);
  // });
};
const delFn = (id: string | number) => {
  ElMessageBox.confirm('你想要删除这个账号吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
  })
    .then(async () => {
      await account.deleteAccount({ id });
      getAccountData();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};
const editFn = async (id: string | number) => {
  let res: any = await account.getUserDetailById({ id });
  if (res.data.success) {
    Object.assign(listItem, res.data.data);

    dialogVisible.value = true;
  } else {
    ElMessage({
      type: 'error',
      message: res.data.msg,
    });
  }
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
const formSize = ref('default');
const LEVEL_LIST = reactive([
  {
    value: 0,
    label: '普通人员',
  },
  {
    value: 1,
    label: '管理员',
  },
]);
let listItem = reactive<userType>({
  username: '',
  password: '',
  avatar: '',
  level: 0,
  ip: '',
  id: '',
});
//弹窗
const dialogVisible = ref(false);
const ruleFormRef = ref<InstanceType<typeof FormInstance>>();

//关闭弹窗
const handleClose = () => {
  dialogVisible.value = false;
  listItem = reactive({
    username: '',
    password: '',
    avatar: '',
    level: 0,
    ip: '',
    id: '',
  });
  ruleFormRef.value.clearValidate();
  // ruleFormRef.value.resetFields();
};
//提交表单
const trueForm = async () => {
  await ruleFormRef.value.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      account.CREATED_BLOG(listItem);
      if (listItem.id == userInfo.userInfo.value.id) {
        let personalDada: any = await account.getUserById({
          userId: userInfo.userInfo.value.id,
        }); //重新获取用户信息
        console.log('personalDada', personalDada);
        user.setUserInfo(personalDada.data.data);
      }

      handleClose();
    } else {
      console.log('error submit!', fields);
    }
  });
};
//校验
const rules = reactive<InstanceType<typeof FormRules>>({
  username: [
    {
      required: true,
      message: '请添加用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请添加密码',
      trigger: 'blur',
    },
  ],
});
//头像上传
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
        listItem.avatar = res.data.data; //图片回显

        return rev(res);
      })
      .catch((error) => rej(error));
  });
};
//表格排序方式
const indexMethod = (index: number) => {
  if (JSON.stringify(formInline) != '{}') {
    return (formInline.pageNum - 1) * formInline.pageSize + index + 1;
  } else {
    return index + 1;
  }
};
</script>
<template>
  <div class="contain">
    <div class="topBar">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="large"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="formInline.username"
            placeholder="请输入用户名"
            clearable
          />
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
          <el-button type="primary" @click="getAccountData">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card>
      <div class="mdeditor">
        <el-table
          :data="accountList"
          style="width: 100%"
          :header-cell-style="tableStyle"
          :row-style="rowStyle"
        >
          <el-table-column
            type="index"
            width="100"
            align="center"
            label="序号"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column prop="avatar" label="头像" align="center">
            <template v-slot="{ row }">
              <el-avatar v-if="row.avatar" :src="row.avatar" />
              <el-avatar v-else :icon="UserFilled" />
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="date"
            label="创建日期"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="ip"
            label="IP"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="level"
            label="权限等级"
            align="center"
            show-overflow-tooltip
          >
            <template v-slot="{ row }">
              {{ row.level == 1 ? '管理员' : '普通人员' }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
            <template v-slot="{ row }">
              <el-button
                link
                type="primary"
                size="default"
                @click="delFn(row.id)"
                >删除</el-button
              >
              <el-button
                link
                type="primary"
                size="default"
                @click="editFn(row.id)"
                >编辑</el-button
              >
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
    </el-card>
    <!-- 修改弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑账号"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :size="formSize"
        :model="listItem"
        :rules="rules"
        label-width="120px"
        ref="ruleFormRef"
      >
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImg"
          >
            <img v-if="listItem.avatar" :src="listItem.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="listItem.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="listItem.password" />
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="listItem.ip" />
        </el-form-item>
        <el-form-item label="权限" prop="level">
          <el-select
            v-model="listItem.level"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in LEVEL_LIST"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="trueForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
:deep(.el-table--fit) {
  height: 100%;
  overflow: auto;
}
:deep(.el-form-item__label) {
  font-size: 20px;
}
.avatar-uploader .avatar {
  width: 40px;
  height: 40px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
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
  width: 40px;
  height: 40px;
  text-align: center;
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
