// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/taluopai/${url}`, import.meta.url).href;
};
