<template>
  <div>
    <div class="title">稿件审核</div>
    <el-card class="searchCard">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="稿件标题" :style="{ marginBottom: '0px' }">
          <el-input
            v-model="formInline.title"
            placeholder="稿件标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="稿件作者" :style="{ marginBottom: '0px' }">
          <el-input
            v-model="formInline.userName"
            placeholder="稿件作者"
          ></el-input>
        </el-form-item>

        <el-form-item label="稿件类型" :style="{ marginBottom: '0px' }">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发布网站" :style="{ marginBottom: '0px' }">
          <el-select v-model="formInline.website" placeholder="请选择">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
          <el-button type="primary" @click="onSubmit(formInline)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="稿件标题"> </el-table-column>
        <el-table-column prop="userName" label="稿件作者"> </el-table-column>
        <el-table-column prop="type" label="稿件类型"> </el-table-column>
        <el-table-column prop="website" label="发布网站"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="handleLook(scope.row)" type="text" size="small"
              >浏览</el-button
            >
            <el-button @click="handleAgree(scope.row)" type="text" size="small"
              >同意发布</el-button
            >
            <el-button @click="handleRefuse(scope.row)" type="text" size="small"
              >驳回请求</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="提示" v-model="dialogVisible" width="60%">
      <template #title>
        <div>{{ logTitle }}</div>
      </template>
      <div id="context">{{ logContext }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import URL from "../api/api";
import router from "../router/index";
import { option1, option2 } from "../api/config";
export default defineComponent({
  name: "Management",
  setup: async () => {
    let tableData = reactive([]);
    const userName = ref(localStorage.getItem("userName"));
    let drawerTitle = ref("");
    let drawer = ref(false);
    let drawerContext = ref("");
    let formInline = reactive({
      title: "",
      userName: "",
      type: "",
      website: "",
    });
    let dialogVisible = ref(false);
    let logTitle = ref("");
    let logContext = ref("");
    try {
      const localList = localStorage.getItem("tableData");
      const { data } = await axios({
        url: URL.auditList,
        method: "post",
        data: { userName: userName.value },
      });
      const res = data.data;
      const newList = [];
      res.forEach((item) =>
        item.length > 0
          ? newList.push({
              ...item[0],
              createTime: item[0].createTime.split("T")[0],
            })
          : null
      );
      localStorage.setItem("allTableData", JSON.stringify(newList));
      tableData = !localList ? newList : JSON.parse(localList);
    } catch (err) {
      ElMessage({ type: "error", message: "获取列表失败", center: true });
    }
    localStorage.removeItem("tableData");

    const onSubmit = (from) => {
      const { userName, title, website, type } = from;
      const allTableData = JSON.parse(localStorage.getItem("allTableData"));
      const newList = allTableData.filter(
        (item) =>
          item.userName.includes(userName === "" ? item.userName : userName) &&
          item.title.includes(title === "" ? item.title : title) &&
          item.website === (website === "" ? item.website : website) &&
          item.type === (type === "" ? item.type : type)
      );
      localStorage.setItem("tableData", JSON.stringify(newList));
      router.go(0);
    };
    const handleLook = (row) => {
      const { title, context } = row;
      logTitle.value = title;
      logContext.value = context;
      dialogVisible.value = true;
    };
    const handleAgree = (row) => {
      ElMessageBox.confirm("确定同意发布吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await axios({
              url: URL.auditAgree,
              method: "post",
              data: {
                userName: row.userName,
                title: row.title,
              },
            });
            ElMessage({ type: "success", message: "确定成功", center: true });
            router.go(0);
          } catch (err) {
            ElMessage({ type: "error", message: "确定失败", center: true });
          }
        })
        .catch(() => {
          ElMessage({ type: "info", message: "已取消确定", center: true });
        });
    };
    const handleRefuse = (row) => {
      ElMessageBox.confirm("确定拒绝发布吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await axios({
              url: URL.auditRefuse,
              method: "post",
              data: {
                userName: row.userName,
                title: row.title,
              },
            });
            ElMessage({ type: "success", message: "拒绝成功", center: true });
            router.go(0);
          } catch (err) {
            ElMessage({ type: "error", message: "拒绝失败", center: true });
          }
        })
        .catch(() => {
          ElMessage({ type: "info", message: "已取消确定", center: true });
        });
    };

    return {
      tableData,
      handleLook,
      drawerTitle,
      handleAgree,
      handleRefuse,
      onSubmit,
      drawerContext,
      drawer,
      formInline,
      option1,
      option2,
      logTitle,
      logContext,
      dialogVisible,
    };
  },
});
</script>
<style scoped>
.title {
  font-size: 28px;
  margin-bottom: 15px;
}
.searchCard {
  margin-bottom: 20px;
}
#context {
  white-space: pre-line;
}
</style>
