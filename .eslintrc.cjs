/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
 
  root: true,
  rules: {
    // 关闭必须多词组合
    'vue/multi-word-component-names': 'off',
    // 关闭不允许解构赋值
    'vue/no-setup-props-destructure': 'off',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
