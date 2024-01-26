<script setup lang="ts">
// 可以不用引入
// import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style scoped lang="less">
* {
  cursor: url('/static/pokemon/正常选择.cur'), default;
}
:deep(a),
:deep(.el-button),
:deep(.el-sub-menu__title),
:deep(.el-radio-button__inner),
:deep(.el-input__wrapper),
:deep(.el-page-header__title),
:deep(.md-editor-toolbar-wrapper .md-editor-toolbar-item) {
  cursor: url('/static/pokemon/后台运行.cur'), pointer;
}
:deep(.el-input__inner),
:deep(.el-textarea__inner),
:deep(#md-editor-v3-textarea) {
  cursor: url('/static/pokemon/文本选择.cur'), pointer;
}
</style>
