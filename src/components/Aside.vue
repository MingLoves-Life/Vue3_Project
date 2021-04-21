<template>
  <div class="aside">
    <el-menu
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <el-menu-item index="Person">
        <i class="el-icon-menu"></i>
        <template #title>个人中心</template>
      </el-menu-item>

      <el-menu-item index="Account">
        <i class="el-icon-menu"></i>
        <template #title>账户管理</template>
      </el-menu-item>

      <el-menu-item index="Management">
        <i class="el-icon-menu"></i>
        <template #title>稿件管理</template>
      </el-menu-item>

      <el-menu-item index="Payment">
        <i class="el-icon-menu"></i>
        <template #title>稿费统计</template>
      </el-menu-item>

      <el-menu-item index="Audit">
        <i class="el-icon-menu"></i>
        <template #title>稿件审核</template>
      </el-menu-item>

      <el-menu-item index="Upload">
        <i class="el-icon-menu"></i>
        <template #title>稿件上传</template>
      </el-menu-item>

      <el-menu-item index="Reader">
        <i class="el-icon-menu"></i>
        <template #title>读者交流</template>
      </el-menu-item>

      <el-menu-item index="Task">
        <i class="el-icon-menu"></i>
        <template #title>任务中心</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "aside",
});
</script>
<style scoped>
.aside {
  width: 250px;
  position: absolute;
  top: 70px;
  bottom: 0;
  background-color: rgb(50, 65, 87);
}
</style>
