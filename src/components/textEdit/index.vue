<template>
  <div>
    <slot></slot>
    <span class="group_title" v-show="!isEditing" @click="focusFn">{{
      content
    }}</span>
    <input
      ref="myinput"
      v-show="isEditing"
      type="text"
      v-model="newContent"
      @keyup.enter="saveContent"
      @blur="cancelEditing"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue';
const props = defineProps({
  content: {
    type: String,
    default: '默认',
  },
});
const emits = defineEmits(['func']);
const myinput = ref<any>(null);
const isEditing = ref(false);
const newContent = ref(props.content);

const focusFn = () => {
  isEditing.value = true;
  nextTick(() => {
    myinput.value.focus();
  });
};

const saveContent = () => {
  emits('func', newContent.value);
  isEditing.value = false;
};

const cancelEditing = () => {
  isEditing.value = false;
};
</script>
<style lang="less" scoped>
.group_title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 5px;
  background-image: -webkit-linear-gradient(bottom, #fad352, rgb(236, 171, 87));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
