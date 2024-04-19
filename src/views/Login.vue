<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
const text = ref<HTMLElement | any>(null); // 获取显示文本的元素
let timer = reactive<any>(null);
let timer2 = reactive<any>(null);
const str = [
  '你好 ,这是一个在线todolist。',
  '是本人用来玩服务器的练习作。',
  '希望能够得到大家的鼓励，谢谢！',
]; // 要打印的字符串数组
function writeText(t: any, delay = 200) {
  return new Promise<void>((resolve, reject) => {
    timer = setTimeout(() => {
      text.value.innerHTML = t; // 显示当前字符串 t
      resolve(); // Promise 完成
    }, delay); // 延迟 delay 毫秒后执行
  });
}

const main = async (str: any) => {
  while (str != undefined) {
    // 无限循环
    for (let j = 0; j < str.length; j++) {
      // 写入
      for (let i = 0; i <= str[j].length; i++) {
        await writeText(str[j].substr(0, i)); // 显示当前字符串的前 i 个字符
      }
      // 回退
      // 回退前先等一秒
      await new Promise<void>((resolve, reject) => {
        timer2 = setTimeout(() => {
          resolve(); // 等待 1000 毫秒后 Promise 完成
        }, 1000); // 等待 1000 毫秒
      });
      for (let i = str[j].length; i >= 0; i--) {
        await writeText(str[j].substr(0, i), 200); // 显示当前字符串的前 i 个字符，间隔 200 毫秒
      }
    }
  }
};
main(str);
onUnmounted(() => {
  clearTimeout(timer);
  clearTimeout(timer2);
});
//水滴登录表单
import { useHomeStore, userInfoStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const home = useHomeStore();
const user = userInfoStore();
const userInfo = storeToRefs(user);
const Count = computed(() => {
  //用户账号和密码
  return userInfo.userCount.value || {};
});

//获取当前路由名称
// import router from '@/router';

const isLogin = ref(true);
const isRemember = ref(false);
const loginForm = reactive({
  username: '',
  password: '',
});
onMounted(() => {
  JSON.stringify(Count.value) != '{}'
    ? Object.assign(loginForm, Count.value)
    : '';
});
const rememberCount = () => {
  isRemember.value = !isRemember.value;
};

const registerForm = reactive({
  username: '',
  password: '',
  password2: '',
});
const Login = async () => {
  if (!loginForm.username) {
    ElMessage({
      message: '请输入用户名',
      type: 'warning',
    });
  } else if (!loginForm.password) {
    ElMessage({
      message: '请输入密码',
      type: 'warning',
    });
  } else {
    let res = await home.A_LOGIN(loginForm);
    if (res.data.success) {
      user.setUserInfo(res.data.data);
      isRemember.value ? user.setUserCount(loginForm) : user.removeUserCount(); //保存账号密码
      setTimeout(() => {
        router.push(`${router.currentRoute.value.query.redirect}`);
      }, 500);
    } else {
    }
  }
};
const toRegister = () => {
  isLogin.value = false;
};
const toLogin = () => {
  isLogin.value = true;
};
const register = () => {
  if (!registerForm.username) {
    ElMessage({
      message: '请输入用户名',
      type: 'warning',
    });
  } else if (!registerForm.password) {
    ElMessage({
      message: '请输入密码',
      type: 'warning',
    });
  } else if (registerForm.password != registerForm.password2) {
    ElMessage({
      message: '两次密码不一致',
      type: 'warning',
    });
  } else {
    home.A_REGISTER(registerForm);
    isLogin.value = true;
  }
};
</script>
<template>
  <div class="bigBox">
    <header class="header">
      <!-- 网站Logo -->
      <a href="#" class="logo">This is a Logo!</a>
      <!-- 导航栏 -->
      <nav class="navbar">
        <!-- 导航栏选项1 -->
        <a
          href="https://a-wandering-lonely-soul.github.io/personal-web/"
          class="item"
          style="--i: 1"
          >Home</a
        >
        <!-- 导航栏选项2 -->
        <a href="https://winterfinale.com:8080/" class="item" style="--i: 2"
          >blog</a
        >
        <!-- 导航栏选项3 -->
        <a href="#" class="item" style="--i: 3">Skills</a>
        <!-- 导航栏选项4 -->
        <a href="#" class="item" style="--i: 4">Me</a>
      </nav>
    </header>

    <!-- 主页部分 -->
    <section class="home">
      <!-- 主页内容 -->
      <div class="home-content">
        <!-- 主页标题 -->
        <h3>Hello,It's Me</h3>
        <h1>Welcome To Know Me!</h1>
        <!-- 主页小标题 -->
        <h3>
          网页介绍
          <!-- 小标题下的文本 -->
          <span class="text" ref="text"></span>
        </h3>
        <!-- 主页正文 -->
        <p>越努力，越幸运！！！Lucky!</p>
        <!-- 社交媒体链接 -->
        <div class="social-media">
          <!-- 社交媒体链接1 -->
          <a href="#" style="--i: 7">
            <i class="bx bxl-tiktok"></i>
          </a>
          <!-- 社交媒体链接2 -->
          <a href="#" style="--i: 8">
            <i class="bx bxl-facebook-circle"></i>
          </a>
          <!-- 社交媒体链接3 -->
          <a href="https://gitee.com/iioouu" style="--i: 9">
            <i class="bx bxl-google"></i>
          </a>
          <!-- 社交媒体链接4 -->
          <a href="#" style="--i: 10">
            <i class="bx bxl-linkedin-square"></i>
          </a>
        </div>
        <!-- 主页按钮 -->
        <a href="https://www.v2ex.com/" class="btn">Learn More</a>
      </div>
      <!-- 主页图片 -->
      <div class="loginMain">
        <form v-if="isLogin">
          <p>
            用户名
            <br />
            <input
              type="text"
              v-model="loginForm.username"
              class="textinput"
              placeholder="请输入用户名"
            />
          </p>
          <p>
            密码
            <br />
            <input
              type="password"
              v-model="loginForm.password"
              class="textinput"
              placeholder="请输入密码"
            />
          </p>
          <p>
            <input id="remember" type="checkbox" @click="rememberCount" />
            <label for="remember">记住密码</label>
          </p>
          <p>
            <input type="button" @click="Login" value="登录" />
          </p>
          <p class="txt">
            还没有账户？
            <a href="#" @click="toRegister">注册</a>
          </p>
        </form>
        <form v-else>
          <p>
            用户名
            <br />
            <input
              type="text"
              v-model="registerForm.username"
              class="textinput"
              placeholder="请输入用户名"
            />
          </p>
          <p>
            密码
            <br />
            <input
              type="password"
              v-model="registerForm.password"
              class="textinput"
              placeholder="请输入密码"
            />
          </p>
          <p>
            重复密码
            <br />
            <input
              type="password"
              v-model="registerForm.password2"
              class="textinput"
              placeholder="请输入密码"
            />
          </p>
          <p>
            <input id="remember" type="checkbox" @click="rememberCount" />
            <label for="remember">记住密码</label>
          </p>
          <p>
            <input type="button" @click="register" value="注册" />
          </p>
          <p class="txt">
            已有账户？
            <a href="#" @click="toLogin">登录</a>
          </p>
        </form>
      </div>
    </section>
  </div>
</template>
<style lang="less" scoped>
/* 重置所有元素的外边距、内边距和盒模型 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

/* 设置页面的背景图片和颜色 */
.bigBox {
  width: 100%;
  height: 100%;
  color: #fff;
  background-image: url(https://ts1.cn.mm.bing.net/th/id/R-C.fe2cb92a9809a66b8ea0b5046d1ed9aa?rik=%2fV8LlDUqV6ALpg&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1308%2f17%2fc2%2f24561028_1376699679461.jpg&ehk=B6h1WTUP7MXtzYqgUfEXmcFR2epNpUivg8Ev2udBFXA%3d&risl=&pid=ImgRaw&r=0);
  background-repeat: no-repeat;
  background-size: cover;
}

/* 设置导航栏的样式 */
.header {
  position: fixed;
  /* 将导航栏固定在页面顶部 */
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 10%;
  /* 设置导航栏内边距 */
  background: transparent;
  /* 设置导航栏背景为透明 */
  display: flex;
  /* 将导航栏的子元素设置为flex布局 */
  justify-content: space-between;
  /* 将导航栏子元素分散对齐 */
  align-items: center;
  /* 将导航栏子元素垂直居中对齐 */
  z-index: 100;
  /* 将导航栏设置为最上层 */
}

/* 设置导航栏Logo的样式 */
.logo {
  font-size: 25px;
  /* 设置字体大小 */
  color: #fff;
  /* 设置字体颜色 */
  text-decoration: none;
  /* 取消下划线 */
  font-weight: 600;
  /* 设置字体粗细 */
  opacity: 0;
  /* 设置初始透明度为0 */
  animation: slideRight 1s ease forwards;
  -webkit-animation: slideRight 1s ease forwards;
  /* 设置动画效果 */
}

/* 设置导航栏链接的样式 */
.navbar a {
  display: inline-block;
  /* 将链接设置为块级元素 */
  font-size: 18px;
  /* 设置字体大小 */
  color: #fff;
  /* 设置字体颜色 */
  text-decoration: none;
  /* 取消下划线 */
  font-weight: 500;
  /* 设置字体粗细 */
  margin-left: 35px;
  /* 设置左侧间距 */
  opacity: 0;
  /* 设置初始透明度为0 */
  transition: 0.3s;
  /* 设置过渡效果 */
  animation: slideTop 1s ease forwards;
  -webkit-animation: slideTop 1s ease forwards;
  /* 设置动画效果 */
  animation-delay: calc(0.2s * var(--i));
  /* 设置动画延迟时间 */
}

/* 设置导航栏链接的鼠标悬停和点击样式 */
.navbar a:hover,
.navbar a:active {
  color: #b7b2a9;
  /* 设置字体颜色 */
}

/* 设置首页的样式 */
.home {
  position: relative;
  /* 设置为相对定位，用于子元素定位 */
  width: 100%;
  height: 100vh;
  /* 设置高度为视口高度 */
  display: flex;
  /* 将子元素设置为flex布局 */
  justify-content: space-between;
  /* 将子元素分散对齐 */
  align-items: center;
  /* 将子元素垂直居中对齐 */
  padding: 70px 10% 0;
  /* 设置内边距 */
}

/* 设置首页内容的样式 */
.home-content {
  max-width: 600px;
  /* 设置最大宽度 */
}

/* 设置首页标题的样式 */
.home-content h3 {
  font-size: 32px;
  /* 设置字体大小 */
  font-weight: 700;
  /* 设置字体粗细 */
  opacity: 0;
  /* 设置初始透明度为0 */
  animation: slideBottom 1s ease forwards;
  -webkit-animation: slideBottom 1s ease forwards;
  /* 设置动画效果 */
  animation-delay: 0.7s;
  /* 设置动画延迟时间 */
}

/* 设置首页标题中的颜色 */
.home-content h3 span {
  color: #b7b2a9;
}

.text {
  /* 添加光标效果 */
  border-right: 2px solid white;
  /* 添加光标闪烁效果 */
  animation: blink 0.5s step-end infinite;
  -webkit-animation: blink 0.5s step-end infinite;
}

/* 设置首页内容标题的样式 */
.home-content h3:nth-of-type(2) {
  margin-bottom: 30px;
  /* 设置下方间距 */
  animation: slideTop 1s ease forwards;
  -webkit-animation: slideTop 1s ease forwards;
  /* 设置动画效果 */
  animation-delay: 0.7s;
  /* 设置动画延迟时间 */
}

/* 设置首页内容主标题的样式 */
.home-content h1 {
  font-size: 56px;
  /* 设置字体大小 */
  font-weight: 700;
  /* 设置字体粗细 */
  margin: -3px 0;
  /* 设置上下间距 */
  opacity: 0;
  /* 设置初始透明度为0 */
  animation: slideRight 1s ease forwards;
  -webkit-animation: slideRight 1s ease forwards;
  /* 设置动画效果 */
  animation-delay: 1s;
  /* 设置动画延迟时间 */
}

/* 设置首页内容段落的样式 */
.home-content p {
  font-size: 18px;
  /* 设置字体大小 */
  animation: slideLeft 1s ease forwards;
  -webkit-animation: slideLeft 1s ease forwards;
  /* 设置动画效果 */
  animation-delay: 0.7s;
  /* 设置动画延迟时间 */
}

/* 设置首页图片的样式 */

.social-media a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid #b7b2a9;
  color: #b7b2a9;
  text-decoration: none;
  font-size: 20px;
  margin: 30px 15px 30px 0;
  transition: 0.5s ease;
  opacity: 0;
  animation: slideLeft 1s ease forwards;
  -webkit-animation: slideLeft 1s ease forwards;
  animation-delay: calc(0.2s * var(--i));
}

.social-media a:hover {
  background: #b7b2a9;
  color: #1f252d;
  box-shadow: 0 0 20px #b7b2a9;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  background: #b7b2a9;
  text-decoration: none;
  border-radius: 40px;
  box-shadow: 0 0 10px #b7b2a9;
  font-size: 16px;
  color: #1f252d;
  letter-spacing: 1px;
  font-weight: 600;
  transition: 0.5s ease;
  opacity: 0;
  animation: slideTop 1s ease forwards;
  -webkit-animation: slideTop 1s ease forwards;
  animation-delay: 2s;
}

.btn:hover {
  box-shadow: 0 0 20px #b7b2a9;
}

.btn:active {
  background: none;
  color: #b7b2a9;
  border: 2px solid #b7b2a9;
}

/*动画*/
@keyframes blink {
  from,
  to {
    border-color: transparent;
    /* 透明边框颜色 */
  }

  50% {
    border-color: white;
    /* 黑色边框颜色 */
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(-100px);
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes slideLeft {
  0% {
    transform: translateX(100px);
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes slideTop {
  0% {
    transform: translateY(100px);
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes slideBottom {
  0% {
    transform: translateY(-100px);
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes zoomIn {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes floatImg {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-36px);
  }

  100% {
    transform: translateY(0);
  }
}
//水滴表单
.loginMain {
  // position: relative;
  display: flex;
  align-items: center;
  width: 45rem;
  height: 45rem;
  box-sizing: border-box;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 15px 10px 40px #00d0ff21, 10px 10px 20px #0070ffa6,
    15px 15px 30px #fef0f0, inset -10px -10px 20px #008aff85;
  animation: move-08aaad4e 6s linear infinite;
  -webkit-animation: move-08aaad4e 6s linear infinite;
}

.loginMain::after {
  position: absolute;
  content: '';
  width: 40px;
  height: 40px;
  background: rgba(254, 254, 254, 0.667);
  left: 80px;
  top: 80px;
  border-radius: 50%;
  animation: move2 6s linear infinite;
  -webkit-animation: move2 6s linear infinite;
  filter: blur(1px);
}

.loginMain::before {
  position: absolute;
  content: '';
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  left: 130px;
  top: 70px;
  border-radius: 50%;
  animation: move3 6s linear infinite;
  -webkit-animation: move3 6s linear infinite;
  filter: blur(1px);
}
@keyframes move {
  50% {
    border-radius: 42% 58% 49% 51% / 52% 36% 64% 48%;
  }
  75% {
    border-radius: 52% 48% 49% 51% / 43% 49% 51% 57%;
  }
  25% {
    border-radius: 52% 48% 59% 41% / 43% 49% 51% 57%;
  }
}

@keyframes move2 {
  25% {
    left: 100px;
    top: 150px;
  }
  50% {
    left: 70px;
    top: 90px;
  }
  75% {
    left: 100px;
    top: 130px;
  }
}

@keyframes move3 {
  25% {
    left: 110px;
    top: 100px;
  }
  50% {
    left: 120px;
    top: 85px;
  }
  75% {
    left: 140px;
    top: 110px;
  }
}
form {
  opacity: 0.8;
  text-align: center;
  padding: 0px 100px;
  border-radius: 10px;
  margin: 120px auto;
}
#remember {
  margin: auto 5px;
  cursor: url('/static/pokemon/正常选择.cur'), default;
}
p {
  -webkit-text-stroke: 1px #8e87c3;
  font-size: 25px;
  line-height: 40px;
}

.textinput {
  height: 4rem;
  font-size: 1.5rem;
  width: 20rem;
  padding: 0 35px;
  border: none;
  background: rgba(250, 249, 249, 0.532);
  box-shadow: inset 4px 4px 10px #5561c999, 4px 4px 10px #0043ff,
    15px 15px 30px #d3bcbc, inset -2px -2px 10px #546273;
  border-radius: 50px;
  -webkit-text-stroke: 0px;
  color: saddlebrown;
  outline-style: none;
}

input[type='button'] {
  width: 110px;
  height: 40px;
  text-align: center;
  outline-style: none;
  border-style: none;
  border-radius: 50px;
  background: rgb(31, 209, 218);
  -webkit-text-stroke: 0px;
  box-shadow: inset 4px 4px 10px rgba(160, 162, 158, 0.814),
    4px 4px 10px rgba(117, 117, 117, 0.3),
    15px 15px 30px rgba(72, 70, 70, 0.193),
    inset -2px -2px 10px rgba(255, 254, 254, 0.873);
}
input[type='button']:hover {
  background-color: rgb(31, 218, 78);
}

a {
  text-decoration: none;
  color: rgba(236, 20, 20, 0.433);
  -webkit-text-stroke: 1px;
}

a:hover {
  text-decoration: underline;
}
</style>
