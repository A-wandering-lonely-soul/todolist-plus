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
const uservalid = ref(true);
const psdvalid = ref(true);
const uservalid2 = ref(true);
const psdvalid2 = ref(true);
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
const checkPassword = () => {
  if (loginForm.password) {
    psdvalid.value = true;
  } else {
    psdvalid.value = false;
  }
};
const checkPassword2 = () => {
  if (registerForm.password) {
    psdvalid2.value = true;
  } else {
    psdvalid2.value = false;
  }
};
const checkUsername = () => {
  if (loginForm.username) {
    uservalid.value = true;
  } else {
    uservalid.value = false;
  }
};
const checkUsername2 = () => {
  if (registerForm.username) {
    uservalid2.value = true;
  } else {
    uservalid2.value = false;
  }
};

const Login = async () => {
  checkPassword();
  checkUsername();
  if (uservalid.value && psdvalid.value) {
    let res = await home.A_LOGIN(loginForm);
    if (res.data.success) {
      user.setUserInfo(res.data.data);
      isRemember.value ? user.setUserCount(loginForm) : user.removeUserCount(); //保存账号密码
      setTimeout(() => {
        router.push(`${router.currentRoute.value.query.redirect}`);
      }, 500);
    }
  }
};
const toRegister = () => {
  isLogin.value = false;
  loginForm.username = '';
  loginForm.password = '';
  uservalid.value = true;
  psdvalid.value = true;
};
const toLogin = () => {
  isLogin.value = true;
  registerForm.username = '';
  registerForm.password = '';
  registerForm.password2 = '';
  uservalid2.value = true;
  psdvalid2.value = true;
};
const register = () => {
  checkPassword2();
  checkUsername2();
  if (psdvalid2.value && uservalid2.value) {
    if (registerForm.password != registerForm.password2) {
      ElMessage({
        message: '两次密码不一致',
        type: 'warning',
      });
    } else {
      home.A_REGISTER(registerForm);
      isLogin.value = true;
    }
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
        <a href="https://agnw.me:8080/" class="item" style="--i: 2">blog</a>
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
        <div class="loginForm" v-if="isLogin">
          <div class="inputBox">
            <p>用户名</p>
            <input
              type="text"
              v-model="loginForm.username"
              class="textinput"
              placeholder="请输入用户名"
              @blur="checkUsername"
            />
            <div class="el-form-item__error" v-if="!uservalid">
              用户名不能为空
            </div>
          </div>
          <div class="inputBox">
            <p>密码</p>
            <input
              type="password"
              v-model="loginForm.password"
              class="textinput"
              placeholder="请输入密码"
              @blur="checkPassword"
              @keyup.enter="Login()"
            />
            <div class="el-form-item__error" v-if="!psdvalid">密码不能为空</div>
          </div>

          <div class="rememberPsd">
            <div class="checkbox" @click="rememberCount">
              <div v-if="isRemember" class="isRemember"></div>
            </div>
            <span>记住密码</span>
          </div>
          <div class="cut-corner-rectangle" @click="Login()">
            <span>登 录</span>
            <svg viewBox="0 0 418 62" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1">
                  <stop offset="0%" stop-color="#02e8ff">
                    <animate
                      attributeName="stop-color"
                      values="#02e8ff;#629aff;#3c03c3"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stop-color="#02e8ff">
                    <animate
                      attributeName="stop-color"
                      values="#02e8ff;#3c03c3;#629aff"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
              <polygon
                points="10,0 418,0 418,10 418,52 408,62 0,62 0,52 0,10"
                fill="url(#grad1)"
                opacity="0.5"
              />
            </svg>
          </div>
          <p class="txt">
            还没有账户？
            <a href="#" @click="toRegister">注册</a>
          </p>
        </div>
        <div class="registForm" v-else>
          <div class="inputBox">
            <p>用户名</p>
            <input
              type="text"
              v-model="registerForm.username"
              class="textinput"
              placeholder="请输入用户名"
              @blur="checkUsername2"
            />
            <div class="el-form-item__error" v-if="!uservalid2">
              用户名不能为空
            </div>
          </div>
          <div class="inputBox">
            <p>密码</p>
            <input
              type="password"
              v-model="registerForm.password"
              class="textinput"
              placeholder="请输入密码"
              @blur="checkPassword2"
              @keyup.enter="Login()"
            />
            <div class="el-form-item__error" v-if="!psdvalid2">
              密码不能为空
            </div>
          </div>
          <div class="inputBox">
            <p>重复密码</p>
            <input
              type="password"
              v-model="registerForm.password"
              class="textinput"
              placeholder="请输入密码"
            />
          </div>

          <div class="cut-corner-rectangle" @click="register()">
            <span>注 册</span>
            <svg viewBox="0 0 418 62" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1">
                  <stop offset="0%" stop-color="#02e8ff">
                    <animate
                      attributeName="stop-color"
                      values="#02e8ff;#629aff;#3c03c3"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stop-color="#02e8ff">
                    <animate
                      attributeName="stop-color"
                      values="#02e8ff;#3c03c3;#629aff"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
              <polygon
                points="10,0 418,0 418,10 418,52 408,62 0,62 0,52 0,10"
                fill="url(#grad1)"
                opacity="0.5"
              />
            </svg>
          </div>
          <p class="txt">
            已有账户？
            <a href="#" @click="toLogin">登录</a>
          </p>
        </div>
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
  background-image: url(/static/loginImage/arola.jpg);
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
p {
  -webkit-text-stroke: 1px #8deeff;
  color: rgb(72, 24, 116);
  font-size: 25px;
  line-height: 40px;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45rem;
  height: 45rem;
  box-sizing: border-box;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 15px 10px 40px #00d0ff21, 10px 10px 20px #0070ffa6,
    15px 15px 30px #fef0f0, inset -10px -10px 20px #008aff85;
  animation: move 6s linear infinite;
  -webkit-animation: move 6s linear infinite;
  .loginForm,
  .registForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    .inputBox {
      margin-bottom: 25px;
      position: relative;
      .el-form-item__error {
        color: #f56c6c;
        font-size: 20px;
        line-height: 25px;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0px);
      }
    }
  }
  .rememberPsd {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 3rem;
    .checkbox {
      cursor: url('/static/pokemon/后台运行.cur'), pointer;
      width: 18px;
      height: 18px;
      background: url('/static/loginImage/checkbox.png');
      background-size: 100% 100%;
      margin: 0 10px;
      position: relative;
      overflow: visible;
      .isRemember {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 21px;
        height: 21px;
        background-image: url('/static/loginImage/right.png');
        background-size: 100% 100%;
      }
    }
    span {
      font-family: Source Han Sans CN;
      font-weight: 400;
      font-size: 20px;
      color: #00eaff;
    }
  }
}
.cut-corner-rectangle {
  cursor: url('/static/pokemon/后台运行.cur'), pointer;
  width: 150px;
  height: 50px;
  position: relative;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: Source Han Sans CN;
    font-weight: bold;
    font-size: 30px;
    color: #ffffff;
  }
}
.cut-corner-rectangle svg {
  width: 100%;
  height: 100%;
}
.cut-corner-rectangle polygon {
  stroke: #00eaff;
  stroke-width: 2;
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

a {
  text-decoration: none;
  color: rgba(236, 20, 20, 0.433);
  -webkit-text-stroke: 1px;
}

a:hover {
  text-decoration: underline;
}
</style>
