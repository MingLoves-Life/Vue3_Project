<template>
  <div>
    <div class="title">读者交流</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="searchCard">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="稿件标题" :style="{ marginBottom: '0px' }">
              <el-input
                v-model="formInline.title"
                placeholder="稿件标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="读者昵称" :style="{ marginBottom: '0px' }">
              <el-input
                v-model="formInline.readerName"
                placeholder="读者昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="处理状态" :style="{ marginBottom: '0px' }">
              <el-select
                v-model="formInline.status"
                placeholder="请选择"
                :style="{ width: '120px' }"
              >
                <el-option
                  v-for="item in option5"
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
            <el-table-column type="expand">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="稿件标题">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="上传网站">
                    <span>{{ props.row.website }}</span>
                  </el-form-item>
                  <el-form-item label="读者昵称">
                    <span>{{ props.row.readerName }}</span>
                  </el-form-item>
                  <el-form-item label="留言时间">
                    <span>{{ props.row.messageTime }}</span>
                  </el-form-item>
                  <el-form-item label="留言内容">
                    <span>{{ props.row.messageContext }}</span>
                  </el-form-item>
                  <el-form-item label="回复内容">
                    <span>{{ props.row.context }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="稿件标题" prop="title"> </el-table-column>
            <el-table-column label="读者昵称" prop="readerName">
            </el-table-column>
            <el-table-column label="留言时间" prop="messageTime">
            </el-table-column>
            <el-table-column label="处理状态" prop="status"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button @click="open(scope.row)" type="text" size="small"
                  >回复</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
import URL from "../api/api";
import router from "../router/index";
import { readerStatusType, option5 } from "../api/config";
export default defineComponent({
  name: "Reader",
  setup: async () => {
    const userName = ref(localStorage.getItem("userName"));
    let tableData = reactive([]);
    let formInline = reactive({ title: "", readerName: "", status: "" });

    try {
      const localList = localStorage.getItem("tableData");
      const { data } = await axios({
        url: URL.reader,
        method: "post",
        data: { userName: userName.value },
      });
      const res = data.data.map((item) => {
        return {
          ...item,
          messageTime: item.messageTime.split("T")[0],
          status: readerStatusType[item.statue],
        };
      });
      localStorage.setItem("allTableData", JSON.stringify(res));
      tableData = !localList ? res : JSON.parse(localList);
    } catch (err) {
      ElMessage({ type: "error", message: err, center: true });
    }
    localStorage.removeItem("tableData");

    const onSubmit = (from) => {
      const { title, readerName, status } = from;
      const allTableData = JSON.parse(localStorage.getItem("allTableData"));
      const newList = allTableData.filter(
        (item) =>
          item.title.includes(title === "" ? item.title : title) &&
          item.readerName.includes(
            readerName === "" ? item.readerName : readerName
          ) &&
          item.status === (status === "" ? item.status : status)
      );
      localStorage.setItem("tableData", JSON.stringify(newList));
      router.go(0);
    };

    const handleClick = async (value, row) => {
      try {
        await axios({
          url: URL.readerReply,
          method: "post",
          data: { ...row, context: value },
        });
        ElMessage({ type: "success", message: "回复成功", center: true });
        router.go(0);
      } catch (err) {
        ElMessage({ type: "error", message: "回复失败", center: true });
      }
    };

    const open = (row) => {
      try {
        ElMessageBox.prompt("请输入回复内容", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => handleClick(value, row))
          .catch((err) =>
            ElMessage({ type: "error", message: "回复失败", center: true })
          );
      } catch (err) {
        ElMessage({ type: "error", message: "取消回复", center: true });
      }
    };
    return {
      tableData,
      formInline,
      option5,
      onSubmit,
      open,
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
