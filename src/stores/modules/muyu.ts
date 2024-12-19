import { defineStore, storeToRefs } from 'pinia';
import { toRefs, ref, reactive, computed } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const merit = ref(0);
    // 计算
    const getMerit = computed(() => merit.value);

    // 修改

    const setMerit = (m: number) => (merit.value += m);

    return {
      merit,
      setMerit,
    };
  },
  {
    persist: {
      enabled: true, // 开启缓存  默认会存储在本地localstorage
      storage: sessionStorage, // 缓存使用方式
      paths: ['merit'], // 需要缓存键
    },
  }
);
