<script setup>
import { ref, onMounted, reactive } from 'vue';
const toMyBlog = () => {
  //跳转到我的博客
  window.location.href = 'https://winterfinale.com:8080/';
};
const isAmplify = ref(false); //是否拥有放大功能
const toggleAmplify = () => {
  isAmplify.value = !isAmplify.value;
  if (isAmplify.value) {
    mouseenterFn();
  } else {
    showMirror.value = false;
  }
};
// 放大镜功能
onMounted(() => {
  mouseenterFn();
});
const showMirror = ref(false);
const mouseenterFn = () => {
  if (!isAmplify.value) return;
  showMirror.value = true;
};

const Container = ref(null);
const mirror = ref(null);
const bigImg = ref(null);
const Move = (e) => {
  if (!showMirror.value) return;
  let x = e.clientX;
  let y = e.clientY;
  //计算容器元素在页面中的位置
  let left = Container.value.offsetLeft;
  let top = Container.value.offsetTop;
  // 计算放大镜元素在容器元素中的位置
  let mirrorLeft = x - left - mirror.value.offsetWidth / 2;
  let mirrorTop = y - top - mirror.value.offsetHeight / 2;
  // 设置放大镜元素的位置
  mirror.value.style.left = mirrorLeft + 'px';
  mirror.value.style.top = mirrorTop + 'px';
  // 计算大图元素的位置
  let bigImgLeft =
    ((mirrorLeft + mirror.value.offsetWidth / 2) /
      Container.value.offsetWidth) *
      bigImg.value.offsetWidth -
    mirror.value.offsetWidth / 2;
  let bigImgTop =
    ((mirrorTop + mirror.value.offsetHeight / 2) /
      Container.value.offsetHeight) *
      bigImg.value.offsetHeight -
    mirror.value.offsetHeight / 2;
  // 设置大图元素的位置
  bigImg.value.style.left = -bigImgLeft + 'px';
  bigImg.value.style.top = -bigImgTop + 'px';
};
const enterFullscreen = () => {
  const targetElement = document.documentElement; // 全屏目标元素为html根元素
  if (targetElement.requestFullscreen) {
    targetElement.requestFullscreen();
  } else if (targetElement.mozRequestFullScreen) {
    // 兼容Firefox
    targetElement.mozRequestFullScreen();
  } else if (targetElement.webkitRequestFullscreen) {
    // 兼容Chrome、Safari和Opera
    targetElement.webkitRequestFullscreen();
  } else if (targetElement.msRequestFullscreen) {
    // 兼容IE11
    targetElement.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // 兼容Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // 兼容Chrome、Safari和Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // 兼容IE11
    document.msExitFullscreen();
  }
};
//切换全屏功能
const toggleFullscreen = () => {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
};

const isFullscreen = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};
// 获取菜单按钮元素
const isActive = ref(false);
const toggleActive = () => {
  isActive.value = !isActive.value;
};
const content = ref(null);
const isDragging = ref(false); //是否正在拖拽中

const prevX = ref(null);
const prevY = ref(null);
const handleMousedown = (e) => {
  isDragging.value = true;
  prevX.value = e.clientX - content.value.offsetLeft;
  prevY.value = e.clientY - content.value.offsetTop;
};
const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  content.value.style.left = e.clientX - prevX.value + 'px';
  content.value.style.top = e.clientY - prevY.value + 'px';
};
const handleMouseup = () => {
  isDragging.value = false;
};
//切换黑夜白天模式
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();

const toggleSunny = () => {
  isDark.value = false;
  changeSun();
  useToggle(isDark);
};
const toggleMoon = () => {
  isDark.value = true;
  changeMoon();
  useToggle(isDark);
};
function changeMoon() {
  let domStyle = document.documentElement.style;
  domStyle.setProperty('--title-color', 'pink');
  domStyle.setProperty('--content-background', '#121212');
  domStyle.setProperty('--page-background', '#143f5f');
}
function changeSun() {
  let domStyle = document.documentElement.style;
  domStyle.setProperty('--title-color', '#000');
  domStyle.setProperty('--content-background', '#fff');
  domStyle.setProperty('--page-background', '#edf8f3');
}
</script>

<template>
  <div
    class="Container"
    ref="Container"
    @mousemove="Move"
    @touchmove="Move"
    @mouseenter="mouseenterFn"
  >
    <!-- 容器背景 -->
    <video autoplay loop>
      <!-- 嵌入视频资源，并设定视频属性 -->
      <source
        src="https://wallpaper-static.cheetahfun.com/wallpaper/sites/dynamics/vm8.mp4"
        type="video/mp4"
      />
      <!-- 视频资源地址和格式 -->
    </video>
    <!-- 镜子 -->
    <div class="mirror" ref="mirror" v-show="showMirror">
      <video autoplay loop ref="bigImg">
        <!-- 嵌入视频资源，并设定视频属性 -->
        <source
          src="https://wallpaper-static.cheetahfun.com/wallpaper/sites/dynamics/vm8.mp4"
          type="video/mp4"
        />
        <!-- 视频资源地址和格式 -->
      </video>
    </div>
    <el-row class="bigbox" @mouseup="()=>isActive=false">
      <el-col :span="5" class="leftInfo">
        <div class="card">
          <div class="imgBox">
            <img src="https://pic.baike.soso.com/p/20131210/20131210175039-1645093212.jpg" />
          </div>
          <div class="content_card">
            <div class="details">
              <div class="group">
                <h4>
                  所在地区:&nbsp;
                  <span>湖南省郴州市</span>
                </h4>
                <h4>
                  社交网络:&nbsp;
                  <span>
                    <a href="https://github.com/">
                      <img
                        src="https://ts1.cn.mm.bing.net/th/id/R-C.3ace977eb9e1da7f05ad4724d2ecb842?rik=RwkVvolTwAeK1g&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20191004%2f30213039_130934100546_2.jpg&ehk=8rzB1aJO0D6qx%2bHGHIsCVNlxpD6uNU8ZZry1e0Rc%2f0Y%3d&risl=&pid=ImgRaw&r=0"
                        alt="gold"
                        class="icon source-icon"
                        data-v-96420278
                      />
                    </a>
                  </span>
                </h4>
                <h4>
                  个人介绍:&nbsp;
                  <span>一名喜欢听音乐的程序员</span>
                </h4>
              </div>
              <div class="data">
                <div>
                  <h3>
                    11
                    <br />
                    <span>动态</span>
                  </h3>
                </div>
                <span style="border: solid 0.1px #555"></span>
                <div>
                  <h3>
                    22
                    <br />
                    <span>关注</span>
                  </h3>
                </div>
                <span style="border: solid 1px #555"></span>
                <div>
                  <h3>
                    33
                    <br />
                    <span>粉丝</span>
                  </h3>
                </div>
              </div>
              <div class="Btn">
                <button @click="toMyBlog">+关注</button>
                <button>
                  <span>
                    <svg
                      t="1683123965373"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2236"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M887.808 841.04533332H129.024c-35.84 0-65.024-29.184-65.024-65.024V219.98933332c0-35.84 29.184-65.024 65.024-65.024h759.296c35.84 0 65.024 29.184 65.024 65.024v556.032c-0.512 35.84-29.696 65.024-65.536 65.024zM129.024 206.16533332c-7.68 0-13.824 6.144-13.824 13.824v556.032c0 7.68 6.144 13.824 13.824 13.824h759.296c7.68 0 13.824-6.144 13.824-13.824V219.98933332c0-7.68-6.144-13.824-13.824-13.824H129.024z"
                        fill="#000000"
                        p-id="2237"
                      />
                      <path
                        d="M486.912 555.86133332L203.264 272.21333332c-10.24-10.24-10.24-26.112 0-36.352s26.112-10.24 36.352 0l283.648 283.648c10.24 10.24 10.24 26.112 0 36.352-10.24 9.728-26.624 9.728-36.352 0z"
                        fill="#000000"
                        p-id="2238"
                      />
                      <path
                        d="M813.568 271.18933332l-283.648 283.648c-10.24 10.24-26.112 10.24-36.352 0s-10.24-26.112 0-36.352l283.648-283.648c10.24-10.24 26.112-10.24 36.352 0 9.728 10.24 9.728 26.624 0 36.352z"
                        fill="#000000"
                        p-id="2239"
                      />
                    </svg>
                  </span>
                  <span @click="toMyBlog">私信</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="introducePage">
          <div class="pageTitle">关于我的页面</div>
          <!-- 博客前台 -->
          <div class="foreground">
            <div class="describe">
              <div class="projectName">博客前台</div>
              <div class="projectContent">
                <p>基于Next.js 13开发</p>
                <p>UI层使用Antd、Sass、Tailwind</p>
                <p>数据请求使用Fetch</p>
                <p>解析markdown采用 marked</p>
                <p>生成文章目录使用 markdown-navbar ，语法高亮 highlight.js</p>
              </div>
            </div>
            <div class="pageImage">
              <div class="imageTitle">前台码源</div>
              <div class="imageAbout"></div>
            </div>
          </div>
          <!-- 后台管理系统 -->
          <div class="background">
            <div class="describe">
              <div class="projectName">后台管理系统</div>
              <div class="projectContent">
                <p>基于VUE 3开发</p>
                <p>UI层使用Element plus</p>
                <p>数据请求使用axios</p>
                <p>数据储存使用pinia</p>
                <p>解析markdown采用 md-editor-v3</p>
              </div>
            </div>
            <div class="pageImage">
              <div class="imageTitle">后台码源</div>
              <div class="imageAbout"></div>
            </div>
          </div>
          <!-- 中台数据接口 -->
          <div class="middleground">
            <div class="describe">
              <div class="projectName">博客前台</div>
              <div class="projectContent">
                <p>基于express + MySQL开发</p>
                <p>使用nginx反向代理获取储存文件</p>
                <p>登录使用jwk校验</p>
                <p>后台服务通过nginx部署</p>
                <p>数据库MySQL通过宝塔一键部署</p>
              </div>
            </div>
            <div class="pageImage">
              <div class="imageTitle">前台码源</div>
              <div class="imageAbout"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3"></el-col>
      <div
        class="content_menu"
        ref="content"
        @mouseup="handleMouseup"
        @mousemove="handleMouseMove"
        @mousedown="handleMousedown"
      >
        <!-- 页面主体容器 -->
        <div class="Box">
          <!-- 按钮组容器 -->
          <div class="box_content" @click="toggleActive">
            <!-- 菜单按钮容器 -->
            <Menu style="width: 2em; height: 2em"></Menu>
            <!-- 菜单按钮图标 -->
          </div>
          <div>
            <!-- 面板容器，包含了多个链接和图标元素 -->
            <p class="panel" style="--i: 0" :class="{ active: isActive }" @click="toggleFullscreen">
              <!-- 面板元素，包含链接和图标 -->
              <i style="width: 1.5em; height: 1.5em">
                <FullScreen />
              </i>
              <!-- 图标元素 -->
            </p>
            <p class="panel" style="--i: 1" :class="{ active: isActive }" @click="toggleAmplify">
              <i style="width: 1.5em; height: 1.5em">
                <Search />
              </i>
            </p>
            <p class="panel" style="--i: 2" :class="{ active: isActive }" @click="toggleSunny">
              <i style="width: 1.5em; height: 1.5em">
                <Sunny />
              </i>
            </p>
            <p class="panel" style="--i: 3" :class="{ active: isActive }" @click="toggleMoon">
              <i style="width: 1.5em; height: 1.5em">
                <Moon />
              </i>
            </p>
            <p
              class="panel"
              style="--i: 4"
              :class="{ active: isActive }"
              @click="()=>isActive=false"
            >
              <i style="width: 1.5em; height: 1.5em">
                <CircleCloseFilled />
              </i>
            </p>
            <p
              class="panel"
              style="--i: 5"
              :class="{ active: isActive }"
              @click="()=>isActive=false"
            >
              <i style="width: 1.5em; height: 1.5em">
                <CircleCloseFilled />
              </i>
            </p>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.Container {
  position: relative;
  /* 将容器元素的宽度设置为 100% 的视窗宽度 */
  width: 100%;
  /* 将容器元素的高度设置为 100% 的视窗高度 */
  height: 100%;
  /* 隐藏容器元素的滚动条 */
  overflow: hidden;
}

/* 设置视频元素 */
.Container video {
  /* 设置视频元素的位置为固定不动 */
  position: absolute;
  /* 将视频元素固定在页面的左上角 */
  top: 0;
  left: 0;
  /* 将视频元素的宽度和高度都设置为 100% ，使其填满整个页面 */
  width: 100%;
  height: 100%;
  /* 使用 object-fit 属性将视频元素完全覆盖容器元素 */
  object-fit: cover;
}

/* 设置镜子元素 */
.mirror {
  /* 定义鼠标悬停时的光标形状 */
  cursor: url('/static/pokemon/后台运行.cur'), auto;
  /* 将镜子元素的宽度设置为 10% 的容器元素宽度 */
  width: 250px;
  /* 将镜子元素的高度设置为 20% 的容器元素高度 */
  height: 250px;
  /* 为镜子元素设置圆形边框 */
  border-radius: 50%;
  /* 为镜子元素设置边框，边框为 10px 粗细，颜色为白色 */
  border: solid 10px #fff;
  /* 声明镜子元素为relative布局方式 */
  position: relative;
  /* 将镜子元素相对于父元素的错位移动设置为 0 */
  left: 0;
  top: 0;
  /* 为镜子元素设置溢出隐藏 */
  overflow: hidden;
}

/* 设置镜子元素下的视频元素，这个视频元素会被实现放大镜的效果 */
.mirror video {
  /* 将镜面图片的宽度设置为 150% 的容器元素宽度 */
  width: 150vw;
  /* 将镜面图片的高度设置为 150% 的容器元素高度 */
  height: 150vh;
  /* 将镜面图片的定位设置为绝对定位，以便实现相对于镜子元素的错位移动 */
  position: absolute;
  /* 不能使用 object-fit，而是自己通过 JS 去计算需要显示的区域，然后将视频的位置信息更新即可 */
}

@media (max-width: 576px) {
  .mirror {
    border: solid 3px #fff;
    width: 60px;
    height: 60px;
  }
}
.bigbox {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  // background: linear-gradient(45deg, #fbda61, #ff5acd);
  .leftInfo {
    display: flex;
    justify-content: center;
  }
  .introducePage {
    height: 100%;
    width: 100%;
    box-shadow: 0 13px 8px 6px rgba(7, 17, 27, 0.56);
    &:hover {
      border: 1px solid #ccc;
      transition: box-shadow 0.3s ease; /* 添加过渡效果 */
      /* 根据鼠标移入状态，添加阴影效果 */
      box-shadow: 15px 9px 14px 6px rgb(247 247 247 / 15%); /* 阴影样式可以根据需要调整 */
    }
    .pageTitle {
      height: 10%;
      font-weight: 700;
      font-size: 30px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .foreground,
    .background,
    .middleground {
      display: flex;
      justify-content: space-between;
      height: 30%;
      .describe {
        width: 50%;
        height: 100%;
        padding: 10px;
        .projectName {
          color: #e7f2fd;
          font-size: 23px;
          margin: 10px;
        }
        .projectContent {
          font-size: 18px;
          line-height: 30px;
          color: white;
        }
      }
      .pageImage {
        width: 50%;
        height: 100%;
        .imageTitle {
          color: #dae6f3;
          font-size: 23px;
          margin: 10px;
        }
        .imageAbout {
        }
      }
    }
  }
}

.card {
  margin-top: 8rem;
  background-image: url(https://tse1-mm.cn.bing.net/th/id/OIP-C.wkyv5_jbDUpoNjrI8Nm1SwHaFj?pid=ImgDet&rs=1);
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  width: 20rem;
  height: 12rem;
  border-radius: 1.5rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.15);
  transition: 1.25s;
  color: white;
}

.card:hover {
  height: 26rem;
  background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F22%2F20200322145347_vzjkb.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698481617&t=3560b7b590e8778f291f411a8fb3a7af);
}

.imgBox {
  position: absolute;
  left: 50%;
  top: -5rem;
  transform: translateX(-50%);
  width: 10rem;
  height: 10rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: 1.25s;
}

.card:hover .imgBox {
  width: 14rem;
  height: 14rem;
  border-radius: 1.5rem;
}

.imgBox img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card .content_card {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.card .content_card .details {
  padding: 2rem;
  text-align: center;
  width: 100%;
  transition: 1.25s;
  transform: translateY(9rem);
}
.card .content_card .details .group {
  text-align: left;
  color: #fff;
}
.card .content_card .details .group h4 {
  padding-bottom: 0.25rem;
}
.card .content_card .details .group span {
  opacity: 0.5;
}
.card .content_card .details .group a img {
  width: 1rem;
  height: 1rem;
}
.card:hover .content_card .details {
  padding: 2rem;
  text-align: center;
  width: 100%;
  transition: 1.25s;
  transform: translateY(0rem);
}

.card .content_card .details h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.2rem;
}

.card .content_card .details h2 span {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.5;
}
.card .content_card .details .data {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
}

.card .content_card .details .data h3 {
  font-size: 1rem;
  color: #fff;
  line-height: 1.2rem;
  font-weight: 600;
}
.card .content_card .details .data h3 span {
  font-size: 0.85rem;
  font-weight: 400;
  opacity: 0.5;
}
.card .content_card .details .Btn button svg {
  text-align: center;
  width: 1rem;
  height: 1rem;
}
.card .content_card .details .Btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.card .content_card .details .Btn button {
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: url('/static/pokemon/后台运行.cur'), auto;
}
.content_menu {
  cursor: url('/static/pokemon/后台运行.cur'), auto;
  position: absolute;
  bottom: 20vh;
  right: 15vw;
}

/* 设计一个圆形的盒子 */
.Box {
  position: relative;
  font-size: 18px;
  border-radius: 50%; /* 设置为50%的圆角，形成圆形的效果 */
  width: 4em;
  height: 4em;
  /* 为了形成浮现的效果，创建一个看似空白的盒子 */
  .box_content {
    content: ''; /* 没有实际内容 */
    background: #000; /* 盒子背景为黑色 */
    // position: absolute; /* 位置固定 */
    top: 50%; /* 距离顶部50%的位置 */
    left: 50%; /* 距离左侧50%的位置 */
    // transform: translate(-50%, -50%); /* 平移到中心 */
    width: 4em; /* 宽度为4em */
    height: 4em; /* 高度为4em */
    border-radius: 50%; /* 设置圆角，形成圆形的效果 */
    z-index: 1; /* 盒子在面板上浮现 */
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.8); /* 创建一个黑色阴影 */
    display: flex; /* 让盒子内部的元素居中 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    /* 盒子内部的图标 */
    i {
      color: #fff; /* 图标颜色为白色 */
      font-size: 1.3em; /* 图标的字体大小 */
    }
  }
}

/* 设计一组可以展开的面板 */
.panel {
  background: rgba(0, 0, 0, 0.5); /* 设置面板背景颜色 */
  text-decoration: none; /* 去除默认超链接下划线 */
  width: 11.7em; /* 设置面板的宽度 */
  height: 10em; /* 设置面板的高度 */
  position: absolute; /* 位置固定 */
  top: 50%; /* 距离顶部50%的位置 */
  left: 50%; /* 距离左侧50%的位置 */
  color: #fff; /* 设置字体颜色为白色 */
  transform-origin: top center; /* 支点位于顶部中心 */
  transition: width 0.1s, height 0.1s, opacity 0.2s; /* 在展开面板时设置过度效果 */
  clip-path: polygon(
    50% 0%,
    0% 100%,
    100% 100%
  ); /* 设置非常规形状，用于创建三角形效果 */
  backdrop-filter: blur(2px); /* 在背景上添加边缘模糊 */
}

/* 为每个面板定义一个动画 */
.panel {
  transition-delay: calc(0.08s * var(--i)); /* 设置过渡延迟 */
  transform: translateX(-50%) rotate(calc(60deg * var(--i))); /* 展开动画 */
}

/* 设计合适的图标 */
.panel i {
  transform: translateX(-50%) rotate(calc(60deg * var(--i))); /* 图标跟随动画产生偏移 */
}

/* 鼠标悬停时修改面板背景颜色 */
.panel:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* 面板中图标的大小位置 */
.panel i {
  font-size: 2.5em;
  position: absolute;
  top: 50%;
  left: 50%;
}

/* 面板初始状态被隐藏 */
.panel {
  opacity: 0; /* 初始面板透明 */
  width: 0; /* 初始面板宽度为0 */
  height: 0; /* 初始面板高度为0 */
}

/* 激活状态下修改面板的尺寸和颜色 */
.active {
  opacity: 1; /* 面板透明度为1 */
  height: 10em; /* 面板高度为10em */
  width: 11.7em; /* 面板宽度为11.7em */
}
</style>
