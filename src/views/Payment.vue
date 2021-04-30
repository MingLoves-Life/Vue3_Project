<template>
  <div>
    <div class="title">稿件列表</div>
    <el-card class="searchCard">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="75px"
      >
        <el-form-item label="稿件标题" :style="{ marginBottom: '0px' }">
          <el-input
            placeholder="稿件标题"
            v-model="inputTitle"
            :input="titleChange(inputTitle)"
          ></el-input>
        </el-form-item>

        <el-form-item label="稿件类型" :style="{ marginBottom: '0px' }">
          <el-select
            v-model="type"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :change="typeChange(type)"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发布网站" :style="{ marginBottom: '0px' }">
          <el-select
            v-model="website"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :change="websiteChange(website)"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="审核状态" :style="{ marginBottom: '0px' }">
          <el-select
            v-model="status"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in option3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :change="statusChange(status)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="稿件标题"> </el-table-column>
        <el-table-column prop="type" label="稿件类型"> </el-table-column>
        <el-table-column prop="readTimes" label="浏览次数"> </el-table-column>
        <el-table-column prop="money" label="稿件收入"> </el-table-column>
        <el-table-column prop="website" label="发布网站"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="status" label="审核状态"> </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              @click="handleClickLook(scope.row)"
              type="text"
              size="small"
              >浏览</el-button
            >
            <el-button @click="handleDelete(scope.row)" type="text" size="small"
              >删除</el-button
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
import URL from "../api/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { option1, option2, option3, statusType } from "../api/config";

import router from "../router/index";
export default defineComponent({
  name: "Management",
  setup: async () => {
    let tableData = reactive([]);
    let drawer = ref(false);
    let drawerTitle = ref("");
    let drawerContext = ref("");
    let inputTitle = ref("");
    let type = ref("");
    let website = ref("");
    let status = ref("");
    let searchObj = reactive({});
    let dialogVisible = ref(false);
    let logTitle = ref("");
    let logContext = ref("");
    try {
      const localList = localStorage.getItem("tableData");
      const { data } = await axios({
        url: URL.articalList,
        method: "post",
        data: { userName: localStorage.getItem("userName") },
      });
      const list = data.data.map((item) => {
        const date = item.createTime.split("T")[0];
        return {
          ...item,
          createTime: date,
          status: statusType[item.status],
        };
      });
      localStorage.setItem("allTableData", JSON.stringify(list));
      tableData = !localList ? [...list] : JSON.parse(localList);
    } catch (err) {
      ElMessage({ type: "error", message: "获取列表失败", center: true });
    }
    localStorage.removeItem("tableData");
    const handleClickLook = (row) => {
      const { title, context } = row;
      logTitle.value = title;
      logContext.value = context;
      dialogVisible.value = true;
    };
    const handleDelete = (row) => {
      ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await axios({
              url: URL.articalDelete,
              method: "post",
              data: row,
            });
            ElMessage({ type: "success", message: "删除成功", center: true });
            router.go(0);
          } catch (err) {
            ElMessage({ type: "error", message: "删除失败", center: true });
          }
        })
        .catch(() => {
          ElMessage({ type: "info", message: "已取消删除", center: true });
        });
    };

    const titleChange = (title) => (searchObj.title = title);
    const typeChange = (type) => (searchObj.type = type);
    const websiteChange = (website) => (searchObj.website = website);
    const statusChange = (status) => (searchObj.status = status);

    const onSubmit = () => {
      const allTableData = JSON.parse(localStorage.getItem("allTableData"));
      const newList = allTableData.filter(
        (item) =>
          item.title.includes(
            searchObj.title === "" ? item.title : searchObj.title
          ) &&
          item.type === (searchObj.type === "" ? item.type : searchObj.type) &&
          item.website ===
            (searchObj.website === "" ? item.website : searchObj.website) &&
          item.status ===
            (searchObj.status === "" ? item.status : searchObj.status)
      );
      localStorage.setItem("tableData", JSON.stringify(newList));
      router.go(0);
    };

    return {
      logTitle,
      logContext,
      tableData,
      handleClickLook,
      drawer,
      drawerTitle,
      drawerContext,
      inputTitle,
      titleChange,
      typeChange,
      websiteChange,
      statusChange,
      option1,
      option2,
      option3,
      type,
      website,
      status,
      onSubmit,
      handleDelete,
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
