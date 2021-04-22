<template>
  <div>
    <div class="title">稿件列表</div>
    <el-card class="searchCard">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="稿件标题" :style="{ marginBottom: '0px' }">
          <el-input placeholder="稿件标题"></el-input>
        </el-form-item>

        <el-form-item label="稿件类型" :style="{ marginBottom: '0px' }">
          <el-input placeholder="稿件类型"></el-input>
        </el-form-item>

        <el-form-item label="发布网站" :style="{ marginBottom: '0px' }">
          <el-input placeholder="发布网站"></el-input>
        </el-form-item>

        <el-form-item :style="{ marginBottom: '0px', float: 'right' }">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="hover" class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="稿件ID"> </el-table-column>
        <el-table-column prop="title" label="稿件标题"> </el-table-column>
        <el-table-column prop="type" label="稿件类型"> </el-table-column>
        <el-table-column prop="nums" label="浏览次数"> </el-table-column>
        <el-table-column prop="money" label="稿件收入"> </el-table-column>
        <el-table-column prop="website" label="发布网站"> </el-table-column>

        <el-table-column prop="create" label="创建时间"> </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >浏览</el-button
            >
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "Management",
  setup: () => {
    const tableData = reactive([
      {
        id: 0,
        title: "title1",
        author: "明明",
        type: "科普",
        nums: 10,
        money: 100,
        create: "2021-4-22",
        website: "腾讯网",
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
