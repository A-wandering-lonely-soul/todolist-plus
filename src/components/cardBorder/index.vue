<script setup lang="ts">
import { useDark } from '@vueuse/core';
const isDark = useDark();
</script>

<template>
  <div :class="['card', { light: isDark }]">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
@property --rotate {
  syntax: '<angle>';
  initial-value: 132deg;
  inherits: false;
}

@card-height: 100%;
@card-width: 100%;

.card {
  margin: 20px auto;
  background: #191c29;
  width: @card-width;
  height: @card-height;
  padding: 3px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgb(0 0 0 / 100%);
  cursor: pointer;
  font-family: cursive;
}
.light {
  color: rgb(88 199 250 / 100%);
}
.card:hover {
  color: rgb(88 199 250 / 0);
  transition: color 1s;
}
.card:hover:before,
.card:hover:after {
  animation: none;
  opacity: 0;
}

.card::before {
  content: '';
  width: 104%;
  height: 102%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate),
    #5ddcff,
    #3c67e3 43%,
    #4e00c2
  );
  position: absolute;
  z-index: -1;
  top: -1%;
  left: -2%;
  animation: spin 2.5s linear infinite;
}

// .card::after {
//   position: absolute;
//   content: '';
//   top: calc(@card-height / 6);
//   left: 0;
//   right: 0;
//   z-index: -1;
//   height: 100%;
//   width: 100%;
//   margin: 0 auto;
//   transform: scale(0.8);
//   filter: blur(calc(@card-height / 6));
//   background-image: linear-gradient(
//     var(--rotate),
//     #5ddcff,
//     #3c67e3 43%,
//     #4e00c2
//   );
//   opacity: 1;
//   transition: opacity 0.5s;
//   animation: spin 2.5s linear infinite;
// }

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
</style>
