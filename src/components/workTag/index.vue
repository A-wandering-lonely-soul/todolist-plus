<template>
  <div class="body">
    <div
      class="button"
      @click="getInfoById"
      :class="`level${level}`"
      :id="`button${idIndex}`"
    >
      <span>{{ title || '默认' }}</span>
      <div class="carry">
        <CircleClose @click.stop="deleteFn" class="close_icon"></CircleClose>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { CircleClose } from '@element-plus/icons-vue';
import { ref, onMounted, watch, reactive } from 'vue';
import { useTodoStore } from '@/stores';
const todo = useTodoStore();
const emit = defineEmits(['getInfo']);
const props = defineProps({
  objData: {
    type: Object,
    default: () => {
      return {
        id: 11,
        title: '任务十三',
        description: '任务十三',
        enclosure: {
          type: 'Buffer',
          data: [117, 110, 100, 101, 102, 105, 110, 101, 100],
        },
        level: 1,
        date: '2019-08-20T06:52:20.000Z',
        g_title: '测试',
        group_id: 1,
      };
    },
  },
  idIndex: {
    type: Number,
    default: 1,
  },
});
const title = ref(props.objData.title);
const level = ref(props.objData.level);
const id = ref(props.objData.id);
const index = ref(props.idIndex);
onMounted(() => {
  const button = ref<any>(document.querySelector(`#button${index.value}`));
  button.value.onmousemove = (e: any) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  };
});
const deleteFn = () => {
  console.log('props.objData', props.objData);
  todo.A_DELETE_TASK({ id: props.objData.id });
};
const getInfoById = async () => {
  let res: any = await todo.A_SELECT_TASK_BYID({ id: props.objData.id });
  if (JSON.stringify(res.data) != '{}') {
    let listItem = res.data[0];

    emit('getInfo', listItem);
  }
};
//函数拷贝
const copyObj = (obj: Record<string, any> = {}): any => {
  let newobj: any = null;

  //判断是否需要继续进行递归
  if (typeof obj === 'object' && obj !== null) {
    newobj = obj instanceof Array ? [] : {}; //进行下一层递归克隆
    for (var i in obj) {
      newobj[i] = copyObj(obj[i]);
    }
  } else {
    newobj = obj; //如果不是对象直接赋值
  }

  return newobj;
};
watch(
  title,
  (newVal) => {
    console.log('props.objData has been updated:', newVal);
  },
  { deep: true }
);
</script>
<style lang="less" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin: 1em 1em;
  position: relative;
  appearance: none;
  background: rgba(255, 0, 0, 0.5);
  padding: 1em 1em;
  border: none;
  color: white;
  font-size: 1.2em;
  // cursor: url('/static/pokemon/后台运行.cur'), auto;
  outline: none;
  overflow: hidden;
  border-radius: 100px;

  span {
    position: relative;
    pointer-events: none;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 2; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }
  .carry {
    min-width: 50px;
    z-index: 99;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    .close_icon {
      width: 2em;
      height: 2em;
      cursor: url('/static/pokemon/后台运行.cur'), auto;
      &:hover {
        color: skyblue;
      }
    }
  }

  &::before {
    --size: 0;

    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, #f861be, transparent);
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease;
  }

  &:hover::before {
    --size: 400px;
  }
}
.level1 {
  background: rgba(255, 255, 0, 0.5);
}
.level2 {
  background: rgba(255, 0, 0, 0.5);
}
.level0 {
  background: rgba(0, 255, 0, 0.5);
}
</style>
