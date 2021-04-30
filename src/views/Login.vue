<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input name="username" placeholder="username" v-model="userName">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            type="password"
            placeholder="password"
            v-model="password"
          >
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="loginBtn()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import URL from "@/api/api.js";
import router from "../router";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Login",
  setup: () => {
    const userName = ref("");
    const password = ref("");
    const loginBtn = () => {
      axios({
        url: URL.login,
        method: "post",
        data: { userName: userName.value, password: password.value },
      })
        .then((res) => {
          const { code, message } = res.data;
          if (code === 200) {
            ElMessage({ type: "success", message: "登陆成功", center: true });
            localStorage.setItem("userName", userName.value);
            localStorage.setItem("permissions", message.permissions);
            router.push("/");
          } else {
            ElMessage({ type: "error", message: message, center: true });
          }
        })
        .catch((err) => {
          ElMessage({ type: "error", message: err, center: true });
        });
    };
    return {
      userName,
      password,
      loginBtn,
    };
  },
});
</script>

<style scoped>
.login-wrap {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: cover;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
