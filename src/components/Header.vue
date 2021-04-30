<template>
  <div className="header">
    <div class="title_left" @click="isCollapse">
      <i v-if="comCollapse" class="el-icon-s-unfold" />
      <i v-else class="el-icon-s-fold" />
      <div class="title">新闻稿件管理系统</div>
    </div>
    <div class="title_right">
      <div class="user">
        <el-avatar :src="Ava"></el-avatar>
        <div class="id">{{ userName }}</div>
      </div>

      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <a
              href="https://github.com/MingLoves-Life/Vue3_Project"
              target="_blank"
            >
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import router from "../router";
import { useStore } from "vuex";
import Ava from "../assets/img/avater.jpg";
export default defineComponent({
  name: "Header",
  setup: () => {
    const store = useStore();
    const comCollapse = computed(() => store.state.collapse);
    const userName = computed(() => localStorage.getItem("userName"));
    const handleCommand = (command) => {
      if (command === "loginout") {
        localStorage.removeItem("userName");
        router.push("/login");
      }
    };
    const isCollapse = () => {
      store.commit({
        type: "handleCollapse",
        collapse: !store.state.collapse,
      });
    };
    return {
      Ava,
      userName,
      isCollapse,
      comCollapse,
      handleCommand,
    };
  },
});
</script>
<style scoped>
.header {
  width: 100%;
  height: 70px;
  padding: 10px 15px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #242f42;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title_left {
  display: flex;
  align-items: center;
  font-size: 27px;
}
.el-icon-s-unfold {
  font-size: 40px;
  transform: translate(0, 2px);
  margin-right: 10px;
}
.el-icon-s-fold {
  font-size: 40px;
  transform: translate(0, 2px);
  margin-right: 10px;
}
.title_right {
  display: flex;
  align-items: center;
}
.el-icon-bell {
  font-size: 25px;
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
}
.id {
  padding-left: 15px;
}
.el-icon-arrow-down {
  padding-left: 15px;
  color: white;
}
</style>
