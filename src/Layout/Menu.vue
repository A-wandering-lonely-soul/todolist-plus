<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Hide, View } from '@element-plus/icons-vue';
import { staticRouter } from '@/router/index';

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const menulist = ref<any[]>([]);
onMounted(() => {
  menulist.value = staticRouter;
});
</script>

<template>
  <div class="leftMenu">
    <el-switch
      style="
        margin: 0 0 20px 15px;
        --el-switch-on-color: #409eff;
        --el-switch-off-color: #13ce66;
      "
      v-model="isCollapse"
      :active-action-icon="Hide"
      :inactive-action-icon="View"
    />
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      :default-active="$route.path"
      router
    >
      <template v-for="(item, index) in menulist" :key="index">
        <el-sub-menu :index="item.path" v-if="item.children">
          <template #title>
            <img
              class="smallIcon"
              :src="`static/${item.meta.icon}.jpg`"
              alt="item2.meta.altText as string"
            />
            <span style="margin: 0 10px">{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <template v-for="(item2, index2) in item.children" :key="index2">
              <el-menu-item :index="item2.path">
                <img
                  class="smallIcon"
                  :src="`static/${item2.meta.icon}.jpg`"
                  alt="item2.meta.altText as string"
                />
                <span style="margin: 0 10px">
                  {{ item2.meta.title }}
                </span>
              </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <img
            class="smallIcon"
            :src="`static/${item.meta.icon}.jpg`"
            alt="item2.meta.altText as string"
          />
          <template #title>
            <span style="margin: 0 10px">{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-radio-group {
  margin: 0 3px;
}
.smallIcon {
  width: 35px;
  height: 35px;
  min-width: 23px;
  min-height: 23px;
  object-fit: contain;
}
.leftMenu {
  float: left;
  max-width: 300px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 90vh;
}
</style>
