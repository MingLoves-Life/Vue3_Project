<template>
  <div className="header">
    <div class="title_left">
      <i class="el-icon-s-unfold" />
      <!-- <i class="el-icon-s-fold" /> -->
      <div class="title">新闻稿件管理系统</div>
    </div>
    <div class="title_right">
      <i class="el-icon-bell" />
      <div class="user">
        <el-avatar></el-avatar>
        <div class="id">UserId</div>
      </div>
      <i class="el-icon-arrow-down" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
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
  font-size: 35px;
}
.el-icon-s-unfold {
  font-size: 50px;
  transform: translate(0, 2px);
}
.el-icon-s-fold {
  font-size: 50px;
  transform: translate(0, 2px);
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
  padding-left: 5px;
}
.el-icon-arrow-down {
  padding-left: 15px;
}
</style>
