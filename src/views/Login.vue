<template>
  <div class="loginBody">
    <div class="main">
      <form v-if="isLogin">
        <p>
          用户名
          <br />
          <input type="text" v-model="loginForm.username" class="textinput" placeholder="请输入用户名" />
        </p>
        <p>
          密码
          <br />
          <input type="password" v-model="loginForm.password" class="textinput" placeholder="请输入密码" />
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
          <input type="text" v-model="registerForm.username" class="textinput" placeholder="请输入用户名" />
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
            type="password2"
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
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useHomeStore, userInfoStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const home = useHomeStore();
const user = userInfoStore();
const userInfo = storeToRefs(user);
const userCount = computed(() => {
  return userInfo.userCount.value || {};
});

//获取当前路由名称
// import router from '@/router';

const isLogin = ref(true);
const isRemember = ref(true);
const loginForm = reactive({
  username: '',
  password: '',
});
onMounted(() => {
  JSON.stringify(userCount.value) != '{}'
    ? Object.assign(loginForm, userCount.value)
    : '';
  // console.log(
  //   'router.currentRoute.value',
  //   router.currentRoute.value.query.redirect
  // );
});
const rememberCount = () => {
  isRemember.value != isRemember.value;
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
      type: 'success',
    });
  } else {
    await home.A_LOGIN(loginForm);
    isRemember.value ? user.setUserCount(loginForm) : user.removeUserCount(); //保存账号密码
    setTimeout(() => {
      router.push(`${router.currentRoute.value.query.redirect}`);
    }, 500);
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
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.loginBody {
  height: 100vh;
  width: 100vw;
  background: skyblue;
}

.main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  box-sizing: border-box;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 15px 10px 40px #00ffff21, 10px 10px 20px #00d0ffa6,
    15px 15px 30px #fef0f0, inset -10px -10px 20px #00c3ff85;
  animation: move-08aaad4e 6s linear infinite;
}

.main::after {
  position: absolute;
  content: '';
  width: 40px;
  height: 40px;
  background: rgba(254, 254, 254, 0.667);
  left: 80px;
  top: 80px;
  border-radius: 50%;
  animation: move2 6s linear infinite;
  filter: blur(1px);
}

.main::before {
  position: absolute;
  content: '';
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  left: 130px;
  top: 70px;
  border-radius: 50%;
  animation: move3 6s linear infinite;
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
    left: 80px;
    top: 110px;
  }
  50% {
    left: 50px;
    top: 80px;
  }
  75% {
    left: 80px;
    top: 120px;
  }
}

@keyframes move3 {
  25% {
    left: 100px;
    top: 90px;
  }
  50% {
    left: 110px;
    top: 75px;
  }
  75% {
    left: 130px;
    top: 100px;
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
}
p {
  -webkit-text-stroke: 1px #8e87c3;
  line-height: 40px;
}

.textinput {
  height: 40px;
  font-size: 15px;
  width: 200px;
  padding: 0 35px;
  border: none;
  background: rgba(250, 249, 249, 0.532);
  box-shadow: inset 4px 4px 10px #00ccff99, 4px 4px 10px #007eff,
    15px 15px 30px #fde2e2, inset -2px -2px 10px #00c5ff;
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
