import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// 屏幕宽高
export const width = window.screen.width || 1920;
export const height = window.screen.height || 1080;

type ResizeType = {
  w?: number;
  h?: number;
  fullScreen?: boolean;
  delay?: number;
};

export const useResize = (options: ResizeType = {}) => {
  const { w = width, h = height, fullScreen = false, delay = 100 } = options;

  // 缩放元素
  const screenRef = ref<any>(null);
  const scale = ref(1);
  function resize() {
    // 浏览器页面宽高
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    // 计算宽高缩放比例
    const scaleW = clientWidth / w;
    const scaleH = clientHeight / h;

    if (clientWidth / clientHeight > w / h) {
      // 如果浏览器的宽高比大于设计稿的宽高比，就取浏览器高度和设计稿高度之比
      scale.value = scaleH * 1;
    } else {
      // 如果浏览器的宽高比小于设计稿的宽高比，就取浏览器宽度和设计稿宽度之比
      scale.value = scaleW * 1;
    }

    if (fullScreen) {
      // 如果不在乎缩放失真的情况，可以设置全屏
      screenRef.value.style.transform = `scale(${scaleW}, ${scaleH})`;
    } else {
      // 否则选择适配比例缩放
      screenRef.value.style.transform = 'scale(' + scale.value + ')';
    }
  }

  const resizeDelay = debounce(resize, delay);
  onMounted(() => {
    if (screenRef.value) {
      resize();
      window.addEventListener('resize', resizeDelay);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeDelay);
  });

  return {
    scale,
    screenRef,
  };
};

/*
用来返回防抖函数的工具函数
*/
function debounce(
  callback: (event: Event) => void,
  delay: number
): (event: Event) => void {
  let timerId: number | null = null;
  return function (event: Event) {
    // 如果上次事件还没有真正处理, 清除
    if (timerId) {
      clearTimeout(timerId);
    }
    // 发事件发生指定事件后才调用处理事件的回调函数
    // 启动定时器, 只是准备真正处理
    timerId = setTimeout(() => {
      // 正在处理事件
      callback.call(null, event);
      // 删除准备处理的标记
      timerId = null;
    }, delay);
  };
}
