<template>
  <div class="box">
    <span class="num" :style="`transform: translate(-50%, -${number * 10}%)`"
      >0123456789</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps({
  number: {
    type: Number,
    default: 4,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.box {
  height: 38px;
  width: 25px;
  text-align: center;
  background-color: #d87af0;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 5px;

  position: relative;
  writing-mode: vertical-lr;
  text-orientation: upright;
}
.num {
  position: absolute;
  left: 50%;
  top: 5px;
  font-size: 30px;
  color: #ffffff;
  transition: all 1.5s;
}
</style>
