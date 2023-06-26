<script setup lang="ts">
import { ref, computed, onMounted, toRaw, reactive, watch, toRefs } from 'vue';
import { useHomeStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { Minus, Plus } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { groupItem, itemType } from '@/types';
// 数字滚动
let count = reactive([0, 0]);
const number1 = ref(0);
const number2 = ref(0);
//透视层效果
const box = ref<HTMLElement | null>(null);
const rectWidth = ref<number>(0); //偏差宽度
const rectheight = ref<number>(0); //偏差高度
const handleMouseMove = (e: MouseEvent) => {
  const circleX = `${e.clientX - rectWidth.value}px`;
  const circleY = `${e.clientY - rectheight.value}px`;
  // 动态赋值
  document.documentElement.style.setProperty('--circleX', circleX);
  document.documentElement.style.setProperty('--circleY', circleY);
};
const formSize = ref('default');
const ruleFormRef = ref<InstanceType<typeof FormInstance>>();
const addGroupRef = ref<InstanceType<typeof FormInstance>>();
const home = useHomeStore();
home.A_GET_TASK_GROUP();
const homeInfo = storeToRefs(home);
const getlist = computed(() => homeInfo.todoData.value);
//修改分组标题
const editTitle = async (e: String, groupId: String | Number) => {
  if (e) {
    let data = {
      group_title: e,
      id: groupId,
    };
    let res = await home.A_CREATE_TASK_GROUP(data);
  }
};
// 使用 watch 函数进行深度监听
watch(
  getlist,
  (newVal) => {
    console.log('todoList has been updated:', newVal);
    let total = 0;
    newVal.forEach((item: groupItem) => {
      total += item.list.length;
      return total;
    });
    if (total >= 10 && total < 100) {
      count = String(total).split('').map(Number);
    } else if (total < 10) {
      count = [0, total];
    } else {
      count = [9, 9];
    }
    number1.value = count[0];
    number2.value = count[1];
  },
  { deep: true }
);

const groupIndex = ref<Number>();
let listItem = reactive<itemType>({
  title: '',
  description: '',
  level: 0,
  imgs: [],
  id: '',
});
const addItem = (group_id: Number) => {
  groupIndex.value = group_id;
  dialogVisible.value = true;
};
const reduceItem = (group_id: Number) => {
  home.A_DELETE_TASK_GROUP({ id: group_id });
};
//弹窗
const dialogVisible = ref(false);
//关闭弹窗
const handleClose = () => {
  dialogVisible.value = false;
  listItem = reactive({
    title: '',
    description: '',
    level: 0,
    imgs: [],
    id: '',
  });
  ruleFormRef.value.clearValidate();
  // ruleFormRef.value.resetFields();
};
const rules = reactive<InstanceType<typeof FormRules>>({
  title: [
    {
      required: true,
      message: '请添加概要',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '请添加描述',
      trigger: 'blur',
    },
  ],
  group_title: [
    {
      required: true,
      message: '请选择标题',
      trigger: 'blur',
    },
  ],
});
//提交表单
const trueForm = async () => {
  await ruleFormRef.value.validate((valid: boolean, fields: any) => {
    if (valid) {
      home.A_CREATED_TASK({
        group_id: groupIndex.value,
        item: listItem,
      });
      handleClose();
    } else {
      console.log('error submit!', fields);
    }
  });
};

//附件
const preview = (img: any) => {
  console.log('src', img);
};
const fileInput = ref<any>(null);
const reduceFile = () => {
  listItem.imgs.splice(0, listItem.imgs.length);
};
const clickFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};
const fileChange = (e: any) => {
  // input 改变事件
  let file = e.target.files[0];
  console.log(file);
  // 文件转base64
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    console.log(reader.result);
    let arr = [];
    arr.push(reader.result);
    listItem.imgs = arr;
  };
};

const LEVEL_LIST = reactive([
  {
    value: 0,
    label: '普通',
  },
  {
    value: 1,
    label: '紧急',
  },
  {
    value: 2,
    label: '非常紧急',
  },
]);
//编辑
const editEcho = (item: any) => {
  groupIndex.value = item.group_id;
  let imglist = item.enclosure ? reactive([item.enclosure]) : reactive([]);
  listItem = reactive<itemType>(
    Object.assign(
      {
        imgs: imglist,
      },
      item
    )
  );
  dialogVisible.value = true;
};
//新建分组
let groupData = reactive({ group_title: '', list: [] });
const groupVisible = ref(false);
const groupClose = () => {
  groupVisible.value = false;
  groupData = { group_title: '', list: [] };
};
const addNewGroup = () => {
  groupVisible.value = true;
};
const TrueCreateGroup = async () => {
  await addGroupRef.value.validate((valid: boolean, fields: any) => {
    if (valid) {
      home.A_CREATE_TASK_GROUP(groupData);
      groupClose();
    } else {
      console.log('error submit!', fields);
    }
  });
};
onMounted(() => {
  console.log('todoData', toRaw(homeInfo.todoData._object).todoData);
  observeBox();
});
const observeBox = () => {
  const observer = new ResizeObserver((entries) => {
    console.log('entries', entries);
    for (let entry of entries) {
      if (entry.target === box.value) {
        rectWidth.value = window.innerWidth - entry.contentRect.width;
        rectheight.value = window.innerHeight - entry.contentRect.height;
      }
    }
  });
  observer.observe(box.value);
};
</script>

<template>
  <div class="background" ref="box" @mousemove="handleMouseMove">
    <div class="container"></div>
    <el-row class="carry_bar">
      <span class="total_scroll">
        <span class="total_text">待办事数目</span>
        <XxtNumScroll :number="number1"></XxtNumScroll>
        <XxtNumScroll :number="number2"></XxtNumScroll>
      </span>
      <el-button color="#626aef" @click="addNewGroup">新建分组</el-button>
    </el-row>
    <el-row>
      <div class="wordGroup" v-for="item in getlist" :key="item.group_id">
        <div class="wordHeard">
          <XxtTextEdit
            :content="item.group_title"
            @func="editTitle($event, item.group_id)"
          ></XxtTextEdit>

          <div class="delOrAdd">
            <el-popconfirm
              title="Are you sure to delete the group?"
              @confirm="reduceItem(item.group_id)"
            >
              <template #reference>
                <span class="deltask">
                  <a href="#" class="pulse" style="filter: hue-rotate(80deg)">
                    <i class="fas fa-minus"></i>
                  </a>
                </span>
              </template>
            </el-popconfirm>

            <span class="addtask" @click="addItem(item.group_id)">
              <a href="#" class="pulse" style="filter: hue-rotate(120deg)">
                <i class="fas fa-plus"></i>
              </a>
            </span>
          </div>
        </div>
        <div class="wordList">
          <div v-for="item2 in item.list" :key="item2">
            <XxtWorkTag
              :objData="item2"
              :idIndex="item2.id"
              @getInfo="editEcho"
            ></XxtWorkTag>
          </div>
        </div>
      </div>
    </el-row>
    <el-dialog
      v-model="dialogVisible"
      :title="listItem.id ? '编辑任务' : '新增任务'"
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
        <el-form-item label="概要" prop="title">
          <el-input v-model="listItem.title" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="listItem.description" type="textarea" />
        </el-form-item>
        <el-form-item label="附件">
          <div class="img_pre">
            <img
              class="img_sinple"
              :src="String(img)"
              @click="preview(img)"
              v-for="(img, index) in listItem.imgs"
              :key="index"
            />
            <div
              v-if="listItem.imgs.length == 0"
              class="add-img-btn"
              @click="clickFileInput"
            >
              <Plus></Plus>
            </div>
            <div v-else class="add-img-btn" @click="reduceFile">
              <Minus></Minus>
            </div>
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @change="fileChange"
            />
          </div>
        </el-form-item>
        <el-form-item label="优先级">
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
          <el-button type="primary" @click="trueForm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="groupVisible"
      title="新建分组"
      width="30%"
      :before-close="groupClose"
    >
      <el-form
        :size="formSize"
        :model="groupData"
        :rules="rules"
        label-width="120px"
        ref="addGroupRef"
      >
        <el-form-item label="分组名" prop="group_title">
          <el-input v-model="groupData.group_title" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="groupClose">取消</el-button>
          <el-button type="primary" @click="TrueCreateGroup"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.background {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../assets/styleBg1.jpg');
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    /* 使用动态计算的表达式 */
    -webkit-mask: radial-gradient(
      circle at calc(var(--circleX, 0px)) calc(var(--circleY, 0px)),
      transparent 0,
      transparent 100px,
      #fff 120px
    );
    mask: radial-gradient(
      circle at calc(var(--circleX, 0px)) calc(var(--circleY, 0px)),
      transparent 0,
      transparent 200px,
      #fff 120px
    );
    background: url('../../assets/styleBg2.jpg');
  }
}

/* 设置链接的样式 */

/* 设置链接和波纹的样式 */
.pulse {
  width: 3rem;
  /* 设置链接的宽度 */
  color: #fff;
  /* 设置字体颜色为白色 */
  transition: all 0.5s ease;
  /* 设置过渡效果 */
  background: #35d1e6;
  /* 设置背景颜色为蓝色 */
  i {
    font-size: 20px;
    /* 设置字体大小 */
    position: absolute;
    /* 设置绝对定位 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.pulse,
.pulse::before,
.pulse::after {
  content: '';
  /* 设置伪元素的内容为空 */
  display: grid;
  /* 设置网格布局 */
  grid-area: 1/1;
  /* 设置元素占据整个网格 */
  aspect-ratio: 1;
  /* 设置宽高比为 1:1 */
  border-radius: 50%;
  /* 设置圆形边框半径 */
  box-shadow: 0 0 0 0 #35d1e633;
  /* 设置波纹的阴影 */
  animation: pulsing 2s linear infinite;
  /* 设置动画效果 */
}

/* 鼠标悬停链接时的样式 */
.pulse:hover,
.pulse:focus {
  animation: none;
  /* 取消动画效果 */
  background: #35d1e633;
  /* 设置背景颜色为深蓝色 */
  color: #ffffff99;
  /* 设置字体颜色为半透明白色 */
  opacity: 0.5;
  /* 设置不透明度为 0.5 */
  transition: all 0.5s ease-in-out;
  /* 设置过渡效果 */
}

.pulse:hover::before,
.pulse:focus::before,
.pulse:hover::after,
.pulse:focus::after {
  animation: none;
  /* 取消动画效果 */
  opacity: 0.5;
  /* 设置不透明度为 0.5 */
  transition: all 0.5s ease-in-out;
  /* 设置过渡效果 */
}

/* 设置 pulsing 动画的关键帧 */
@keyframes pulsing {
  to {
    box-shadow: 0 0 0 2rem #0000;
    /* 设置波纹的阴影效果 */
  }
}
.carry_bar {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(102, 15, 184);
  height: 40px;
  .total_scroll {
    display: flex;
    align-items: center;
    .total_text {
      font-size: 20px;
      margin-right: 5px;
      background-image: -webkit-linear-gradient(
        bottom,
        #fdfdfd,
        rgb(236, 87, 216)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.img_pre {
  display: flex;
  vertical-align: baseline;
  .img_sinple {
    min-width: 50px;
    min-height: 50px;
    max-width: 100px;
    max-height: 100px;
    background-image: contain;
    margin-right: 10px;
  }
  .add-img-btn {
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #bdbcbc;
    margin-right: 10px;
  }
  .file-input {
    display: none;
  }
}
.wordGroup {
  z-index: 200;
  display: flex;
  flex-direction: column;
  .wordHeard {
    // min-width: 200px;
    padding: 1em 2em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .group_title {
      font-size: 16px;
      font-weight: bold;
      margin: 0 5px;
      background-image: -webkit-linear-gradient(
        bottom,
        #fad352,
        rgb(236, 171, 87)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .delOrAdd {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .deltask {
        cursor: pointer;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
      .addtask {
        cursor: pointer;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
