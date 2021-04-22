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
              <el-form-item label="用户ID" class="item">
                <el-input v-model="userInfo.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" class="item">
                <div class="nameBotton">
                  <el-input v-model="userInfo.name" disabled></el-input>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    class="elbtn"
                  ></el-button>
                  <el-button type="primary" class="pwdbtn">修改密码</el-button>
                </div>
              </el-form-item>
              <el-form-item label="用户权限" class="item">
                <el-input v-model="userInfo.permissions" disabled></el-input>
              </el-form-item>
              <el-form-item label="创建日期" class="item">
                <el-input v-model="userInfo.create" disabled></el-input>
              </el-form-item>
              <el-form-item label="上次登录时间" class="item">
                <el-input v-model="userInfo.lastOn" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="searchCard">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户昵称" :style="{ marginBottom: '0px' }">
              <el-input placeholder="用户昵称"></el-input>
            </el-form-item>

            <el-form-item label="用户权限" :style="{ marginBottom: '0px' }">
              <el-input placeholder="用户权限"></el-input>
            </el-form-item>

            <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="hover" class="box-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="用户ID"> </el-table-column>
            <el-table-column prop="name" label="用户昵称"> </el-table-column>
            <el-table-column prop="permissions" label="用户权限">
            </el-table-column>
            <el-table-column prop="nums" label="稿件数量"> </el-table-column>
            <el-table-column prop="money" label="稿件收入"> </el-table-column>
            <el-table-column prop="create" label="创建时间"> </el-table-column
            ><el-table-column prop="lastOn" label="上次登录时间">
            </el-table-column>

            <el-table-column label="操作">
              <template #header>
                <el-button type="primary" class="pwdbtn">新建账户</el-button>
              </template>
              <template #default="scope">
                <el-button
                  @click="handleClick(scope.row)"
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
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "Account",
  setup: () => {
    const userInfo = reactive({
      id: 1234556,
      name: "mingming",
      pwd: 12346,
      permissions: "管理员",
      create: "2021-4-22",
      lastOn: "2021-4-21",
    });
    const tableData = reactive([
      {
        id: 0,
        name: "test1",
        permissions: "作者",
        nums: 10,
        money: 100,
        create: "2021-4-22",
        lastOn: "2021-4-21",
      },
    ]);
    return {
      userInfo,
      tableData,
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
