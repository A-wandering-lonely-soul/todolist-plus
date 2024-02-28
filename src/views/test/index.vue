
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <el-switch
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        inline-prompt
        @change="toggleDark"
      />
    </div>
  </div>
</template>
 
<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
const props = defineProps({
  msg: String,
});
const isDark = useDark();

const toggleDark = () => {
  changeBgc();
  useToggle(isDark);
};

function changeBgc(bgc) {
  let domStyle = document.documentElement.style;
  domStyle.setProperty('--title-color', 'pink');
  domStyle.setProperty('--content-background', 'rgb(11, 23, 32)');
  domStyle.setProperty('--page-background', 'rgb(20, 63, 95)');
}
</script>
 
<style scoped>
</style>