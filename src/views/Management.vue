<template>
  <div>
    <div class="title">稿件管理</div>
    <el-card shadow="hover" class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="稿件ID"> </el-table-column>
        <el-table-column prop="title" label="稿件标题"> </el-table-column>
        <el-table-column prop="nums" label="浏览次数"> </el-table-column>
        <el-table-column prop="money" label="稿件收入"> </el-table-column>
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
        nums: 10,
        money: 100,
        create: "2021-4-22",
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
