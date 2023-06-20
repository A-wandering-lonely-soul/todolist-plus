import workTag from './workTag/index.vue';
import numScroll from './numScroll/index.vue';
import textEdit from './textEdit/index.vue';
import rollCard from './rollCard/index.vue';
import type { App, Plugin } from 'vue';
// 通过插件方式，全局注册
const XxtUI: Plugin = {
  install(app: App) {
    app.component(`XxtWorkTag`, workTag);
    app.component(`XxtNumScroll`, numScroll);
    app.component(`XxtTextEdit`, textEdit);
    app.component(`XxtRollCard`, rollCard);
  },
};

export default XxtUI;

export const XxtWorkTag = workTag;
export const XxtNumScroll = numScroll;
export const XxtTextEdit = textEdit;
export const XxtRollCard = rollCard;
