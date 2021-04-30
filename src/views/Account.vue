<template>
  <div>
    <div class="title">账户管理</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="box-card avatorbox">
          <div class="avator">
            <el-avatar :size="100" :src="circleUrl"></el-avatar>
          </div>
          <div class="avatorInfo">
            <el-form
              :inline="true"
              class="demo-form-inline"
              label-width="100px"
            >
              <el-form-item label="用户昵称" class="item">
                <div class="nameBotton">
                  <el-input v-model="userName" disabled></el-input>
                  <el-button type="primary" class="elbtn" @click="open"
                    >修改密码</el-button
                  >
                </div>
              </el-form-item>
              <el-form-item label="用户权限" class="item">
                <el-input v-model="permissions" disabled></el-input>
              </el-form-item>
              <el-form-item label="创建日期" class="item">
                <el-input v-model="createAt" disabled></el-input>
              </el-form-item>
              <el-form-item label="上次登录时间" class="item">
                <el-input v-model="lastLoginAt" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="searchCard" v-if="permissions !== '作者'">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户昵称" :style="{ marginBottom: '0px' }">
              <el-input
                v-model="formInline.userName"
                placeholder="用户昵称"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户权限" :style="{ marginBottom: '0px' }">
              <el-select
                v-model="formInline.newPermissions"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in option4"
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
        <el-card shadow="hover" class="box-card" v-if="permissions !== '作者'">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="userName" label="用户昵称">
            </el-table-column>
            <el-table-column prop="permissions" label="用户权限">
            </el-table-column>
            <el-table-column prop="nums" label="稿件数量"> </el-table-column>
            <el-table-column
              prop="earningsNum"
              label="稿件收入"
            ></el-table-column>
            <el-table-column prop="create" label="创建时间"> </el-table-column
            ><el-table-column prop="lastTime" label="上次登录时间">
            </el-table-column>

            <el-table-column label="操作">
              <template #header>
                <el-button type="primary" class="pwdbtn" @click="newAccount"
                  >新建账户</el-button
                >
              </template>
              <template #default="scope">
                <el-button
                  @click="handleDelete(scope.row)"
                  type="text"
                  size="small"
                  >注销</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="新建账号" v-model="outerVisible" width="400px">
      <el-form
        :inline="true"
        class="demo-form-inline"
        label-width="100px"
        v-model="fromInfo"
      >
        <el-form-item label="用户昵称" class="item">
          <div class="nameBotton">
            <el-input v-model="fromInfo.newUserName"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="账号密码" class="item">
          <div class="nameBotton">
            <el-input type="password" v-model="fromInfo.newPassword"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="用户权限" class="item">
          <el-select v-model="fromInfo.newPermissions" placeholder="请选择">
            <el-option
              v-for="item in option4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleNewAccount(fromInfo)"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import circleUrl from "../assets/img/avater.jpg";
import router from "../router/index";
import URL from "../api/api";
import { option4 } from "../api/config";
export default defineComponent({
  name: "Account",
  setup: async () => {
    let outerVisible = ref(false);
    let fromInfo = reactive({
      newUserName: "",
      newPassword: "",
      newPermissions: "",
    });
    let formInline = reactive({
      userName: "",
      permissions: "",
    });
    let userInfo = reactive({});
    let tableData = reactive([]);
    let memberList = reactive([]);
    const userName = ref(localStorage.getItem("userName"));
    const permissions = localStorage.getItem("permissions");

    try {
      const localList = localStorage.getItem("tableData");
      const { data } = await axios({
        url: URL.account,
        method: "post",
        data: { userName: userName.value },
      });

      const results = await axios({
        url: URL.accountList,
        method: "post",
        data: { userName: userName.value },
      });

      const res = data.data;
      const { articalResult, result, userResult, member } = results.data.data;
      memberList = member;
      Object.keys(res).forEach((item) =>
        item.split("_").length > 1 ? null : (userInfo[item] = res[item])
      );
      const tableList = [];

      for (let i = 0; i < articalResult.length; i++) {
        const obj = {
          nums: articalResult[i].length,
          userName: result[i][0].userName,
          permissions: result[i][0].permissions,
          earningsNum: result[i][0].earningsNum,
          lastTime: result[i][0].lastTime.split("T")[0],
          create: userResult[i][0].createAt.split("T")[0],
        };
        tableList.push(obj);
      }
      localStorage.setItem("allTableData", JSON.stringify(tableList));
      tableData = !localList ? tableList : JSON.parse(localList);
    } catch (err) {
      ElMessage({ type: "error", message: err, center: true });
    }
    localStorage.removeItem("tableData");

    const handleClick = async (pwd) => {
      try {
        await axios({
          url: URL.change,
          method: "post",
          data: { userName: userName.value, password: pwd },
        });
        ElMessage({ type: "success", message: "修改成功", center: true });
        localStorage.removeItem("userName");
        router.push("/login");
      } catch (err) {
        ElMessage({ type: "error", message: "更改密码失败", center: true });
      }
    };

    const handleDelete = (row) => {
      ElMessageBox.confirm("此操作将永久删除账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await axios({
              url: URL.accountDelete,
              method: "post",
              data: {
                userName: localStorage.getItem("userName"),
                deleteUser: row.userName,
                memberList,
              },
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

    const open = () => {
      try {
        ElMessageBox.prompt("请输入新密码", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => handleClick(value))
          .catch((err) =>
            ElMessage({ type: "error", message: "更改密码失败", center: true })
          );
      } catch (err) {
        ElMessage({ type: "error", message: "取消更改密码", center: true });
      }
    };

    const newAccount = () => (outerVisible.value = true);

    const handleNewAccount = async (from) => {
      try {
        await axios({
          url: URL.addAccount,
          method: "post",
          data: {
            userName: localStorage.getItem("userName"),
            ...from,
            newMember: [...memberList, from.newUserName],
          },
        });
        ElMessage({ type: "success", message: "新建成功", center: true });
      } catch (err) {
        ElMessage({ type: "error", message: "新建失败", center: true });
      }
      outerVisible.value = false;
      router.go(0);
    };

    const onSubmit = (from) => {
      const { userName, newPermissions } = from;
      const allTableData = JSON.parse(localStorage.getItem("allTableData"));
      const newList = allTableData.filter(
        (item) =>
          item.userName.includes(userName === "" ? item.userName : userName) &&
          item.permissions ===
            (newPermissions === undefined ? item.permissions : newPermissions)
      );

      localStorage.setItem("tableData", JSON.stringify(newList));
      router.go(0);
    };
    return {
      ...toRefs(userInfo),
      createAt: userInfo.createAt.split("T")[0],
      lastLoginAt: userInfo.lastLoginAt.split("T")[0],
      tableData,
      circleUrl,
      open,
      outerVisible,
      newAccount,
      handleNewAccount,
      handleDelete,
      fromInfo,
      option4,
      onSubmit,
      formInline,
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
.avatorbox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.avator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.avatorInfo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  display: block;
}
.nameBotton {
  display: flex;
}
.pwdinput .el-input--suffix .el-input__inner {
  padding-right: 0px;
}
.elbtn {
  margin-left: 10px;
}
</style>
