<template>
  <div>
    <div class="title">读者交流</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="searchCard">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="发布人" :style="{ marginBottom: '0px' }">
              <el-input placeholder="发布人"></el-input>
            </el-form-item>
            <el-form-item label="稿件类型" :style="{ marginBottom: '0px' }">
              <el-select placeholder="稿件类型">
                <el-option label="科普" value="v"></el-option>
                <el-option label="影视" value="q"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card shadow="hover" class="box-card">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="任务要求">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="任务 ID" prop="id"> </el-table-column>
            <el-table-column label="发布人" prop="person"> </el-table-column>
            <el-table-column label="任务类型" prop="type"> </el-table-column>
            <el-table-column label="发布网站" prop="website"> </el-table-column>
            <el-table-column label="发布日期" prop="createTime">
            </el-table-column>
            <el-table-column label="截止日期" prop="cutTime"> </el-table-column>
            <el-table-column label="操作">
              <template #header>
                <el-button type="primary" class="pwdbtn">发布任务</el-button>
              </template>
              <template #default="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >接取任务</el-button
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
  name: "Task",
  setup: () => {
    const tableData = reactive([
      {
        id: "12987122",
        person: "小红",
        type: "科普",
        website: "腾讯网",
        createTime: "2021-4-20",
        cutTime: "2021-4-22",
        desc: "要求要求要求要求要求要求要求要求要求要求要求",
      },
    ]);
    return {
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
</style>
