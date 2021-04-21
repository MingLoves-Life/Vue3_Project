<template>
  <div class="person">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div class="avator">
            <div class="avator_top">
              <div class="block">
                <el-avatar :size="120"></el-avatar>
              </div>
              <div class="avator_text">
                <div class="username">明明</div>
                <div class="admin">管理员</div>
              </div>
            </div>
            <div class="datebox">
              上次登录时间：
              <span class="date">2021-4-21</span>
            </div>
          </div>
        </el-card>
        <el-card class="box-card agebox">
          <template #header>
            <div class="clearfix">
              <span>读者年龄</span>
            </div>
          </template>
          00后
          <el-progress :percentage="36.3" color="#42b983"></el-progress>90后
          <el-progress :percentage="44.1" color="#f1e05a"></el-progress>80后
          <el-progress :percentage="18.7"></el-progress>70后
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card
              class="box-card"
              :body-style="{ padding: '0px', border: '0px' }"
            >
              <div class="iconbox first">
                <i class="el-icon-user-solid icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1000</div>
                  <div class="grid-text">阅读量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card" :body-style="{ padding: '0px' }">
              <div class="iconbox second">
                <i class="el-icon-message-solid icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">12</div>
                  <div class="grid-text">事件量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card" :body-style="{ padding: '0px' }">
              <div class="iconbox third">
                <i class="el-icon-s-goods icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">288</div>
                  <div class="grid-text">昨日收益</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="box-card event">
          <template #header>
            <div class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
          </template>

          <el-table :show-header="false" :data="todoList" style="width: 100%">
            <el-table-column width="40">
              <template>
                <el-checkbox></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template>
                <div class="todo-item"></div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div>777</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div>888</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Person",
});
</script>
<style scoped>
.avator_top {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px #999999 solid;
}
.avator_text {
  position: absolute;
  left: 190px;
}
.username {
  font-size: 28px;
}
.admin {
  margin-top: 8px;
  font-size: 17px;
  color: #999;
}
.datebox {
  display: flex;
  align-items: center;
  margin-top: 23px;
  font-size: 16px;
}
.date {
  margin-left: 70px;
}
.agebox {
  margin-top: 15px;
  margin-bottom: 15px;
}
.iconbox {
  padding: 0;
  display: flex;
  align-items: center;
}
.first .icon {
  background-color: rgb(45, 140, 240);
}
.second .icon {
  background-color: rgb(100, 213, 114);
}
.third .icon {
  background-color: rgb(242, 94, 67);
}
.icon {
  width: 100px;
  height: 100px;
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
}
.grid-cont-right {
  margin-left: 35px;
  text-align: center;
}
.grid-num {
  font-size: 28px;
}
.grid-text {
  margin-top: 3px;
  font-size: 14px;
  color: #999;
}
.event {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
