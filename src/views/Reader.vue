<template>
  <div>
    <div class="title">读者交流</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="searchCard">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="稿件标题" :style="{ marginBottom: '0px' }">
              <el-input placeholder="稿件标题"></el-input>
            </el-form-item>
            <el-form-item label="读者昵称" :style="{ marginBottom: '0px' }">
              <el-input placeholder="读者昵称"></el-input>
            </el-form-item>
            <el-form-item label="处理状态" :style="{ marginBottom: '0px' }">
              <el-select placeholder="处理状态">
                <el-option label="已回复" value="true"></el-option>
                <el-option label="未回复" value="false"></el-option>
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
                  <el-form-item label="稿件标题">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="上传网站">
                    <span>{{ props.row.website }}</span>
                  </el-form-item>
                  <el-form-item label="读者昵称">
                    <span>{{ props.row.reader }}</span>
                  </el-form-item>
                  <el-form-item label="留言时间">
                    <span>{{ props.row.messageTime }}</span>
                  </el-form-item>
                  <el-form-item label="留言内容">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="稿件 ID" prop="id"> </el-table-column>
            <el-table-column label="稿件标题" prop="title"> </el-table-column>
            <el-table-column label="读者昵称" prop="reader"> </el-table-column>
            <el-table-column label="留言时间" prop="messageTime">
            </el-table-column>
            <el-table-column label="处理状态" prop="status"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
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
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "Reader",
  setup: () => {
    const tableData = reactive([
      {
        id: "12987122",
        title: "test1",
        reader: "小强",
        status: "已回复",
        website: "腾讯网",
        messageTime: "2021-4-22",
        desc: "留言留言留言留言留言留言留言留言留言留言留言留言留言留言留言",
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
