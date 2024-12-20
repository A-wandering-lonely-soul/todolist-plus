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
      strategies: [
        {
          key: 'userStore',
          storage: sessionStorage, // ✅ 正确写法
          paths: ['merit'],
        },
      ],
      // strategies: [ //自定义key和存储方式
      //   {
      //     key: 'indexStore',
      //     storage: localStorage //可以选择对应的存储形式（localStorage或者sessionStroage）
      //   }
      // ]
    },
  }
);
