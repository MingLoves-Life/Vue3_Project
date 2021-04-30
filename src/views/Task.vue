<template>
  <div>
    <div class="title">任务中心</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="searchCard">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="发布人" :style="{ marginBottom: '0px' }">
              <el-input
                placeholder="发布人"
                v-model="formInline.userName"
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

            <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
              <el-button type="primary" @click="onSubmitOwn()"
                >我的任务</el-button
              >
            </el-form-item>

            <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
              <el-button type="primary" @click="onSubmitAll(formInline)"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="hover" class="box-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="任务要求">
                    <span>{{ props.row.context }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="发布人" prop="userName"> </el-table-column>
            <el-table-column label="任务类型" prop="type"> </el-table-column>
            <el-table-column label="发布网站" prop="website"> </el-table-column>
            <el-table-column label="发布日期" prop="createTime">
            </el-table-column>
            <el-table-column label="截止日期" prop="downTime">
            </el-table-column>
            <el-table-column label="接受人" prop="accept"> </el-table-column>
            <el-table-column label="操作">
              <template #header>
                <el-button
                  type="primary"
                  class="pwdbtn"
                  @click="newTask"
                  v-if="permissions !== '作者'"
                  >发布任务</el-button
                >
              </template>
              <template #default="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.accept === '暂无'"
                  >接取任务</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="创建任务" v-model="outerVisible" width="400px">
      <el-form
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        v-model="fromInfo"
      >
        <el-form-item label="稿件类型" class="item">
          <div class="nameBotton">
            <el-select
              v-model="fromInfo.type"
              placeholder="请选择"
              :style="{ width: '184px' }"
            >
              <el-option
                v-for="item in option1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="发布网站" class="item">
          <div class="nameBotton">
            <el-select
              v-model="fromInfo.website"
              placeholder="请选择"
              :style="{ width: '184px' }"
            >
              <el-option
                v-for="item in option2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="截止日期" class="item">
          <div class="nameBotton">
            <el-input v-model="fromInfo.downTime"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="任务要求" class="item">
          <div class="nameBotton">
            <el-input v-model="fromInfo.context"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleNewTask(fromInfo)"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "../router/index";
import URL from "../api/api";
import { option1, option2 } from "../api/config";
export default defineComponent({
  name: "Task",
  setup: async () => {
    let outerVisible = ref(false);
    const fromInfo = reactive({
      type: "",
      website: "",
      downTime: "",
      context: "",
    });
    const formInline = reactive({ userName: "", type: "" });
    let tableData = reactive([]);
    const userName = ref(localStorage.getItem("userName"));
    const permissions = localStorage.getItem("permissions");

    try {
      const localList = localStorage.getItem("tableData");
      const { data } = await axios({ url: URL.task, method: "post" });
      const res = data.data;
      const newList = [];
      res.forEach((item) =>
        newList.push({
          ...item,
          createTime: item.createTime.split("T")[0],
          accept: item.accept === "" ? "暂无" : item.accept,
        })
      );
      localStorage.setItem("allTableData", JSON.stringify(newList));
      tableData = !localList ? newList : JSON.parse(localList);
    } catch (err) {
      ElMessage({ type: "error", message: "获取列表失败", center: true });
    }
    localStorage.removeItem("tableData");

    const newTask = () => {
      outerVisible.value = true;
    };

    const handleNewTask = async (from) => {
      const obj = { userName: userName.value, ...from };
      try {
        await axios({
          url: URL.taskAdd,
          method: "post",
          data: obj,
        });
        ElMessage({ type: "success", message: "发布成功", center: true });
      } catch (err) {
        ElMessage({ type: "error", message: "发布失败", center: true });
      }
      outerVisible.value = false;
      router.go(0);
    };

    const handleClick = (row) => {
      const { _id } = row;
      ElMessageBox.confirm("确定接受任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await axios({
              url: URL.taskChoose,
              method: "post",
              data: { _id, userName: userName.value },
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

    const onSubmitAll = (from) => {
      const { userName, type } = from;
      const allTableData = JSON.parse(localStorage.getItem("allTableData"));
      const newList = allTableData.filter(
        (item) =>
          item.userName.includes(userName === "" ? item.userName : userName) &&
          item.type === (type === "" ? item.type : type)
      );
      localStorage.setItem("tableData", JSON.stringify(newList));
      router.go(0);
    };
    const onSubmitOwn = () => {
      const allTableData = JSON.parse(localStorage.getItem("allTableData"));
      const newList = allTableData.filter(
        (item) =>
          item.userName === userName.value || item.accept === userName.value
      );
      localStorage.setItem("tableData", JSON.stringify(newList));
      router.go(0);
    };
    return {
      tableData,
      newTask,
      outerVisible,
      option1,
      option2,
      fromInfo,
      handleNewTask,
      handleClick,
      formInline,
      onSubmitAll,
      onSubmitOwn,
      permissions,
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
</style>
