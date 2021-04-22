<template>
  <div>
    <div class="title">稿件上传</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" class="box-card textHead">
          <div>
            <el-form
              :inline="true"
              class="demo-form-inline"
              label-width="100px"
            >
              <el-form-item
                label="稿件标题"
                class="item"
                :style="{ marginBottom: '0px' }"
              >
                <el-input></el-input>
              </el-form-item>
              <el-form-item
                label="稿件类型"
                class="item"
                :style="{ marginBottom: '0px' }"
              >
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="上传平台"
                class="item"
                :style="{ marginBottom: '0px' }"
              >
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-button
                type="primary"
                :style="{
                  marginLeft: '30px',
                  float: 'right',
                }"
                >稿件上传</el-button
              >
            </el-form>
          </div>
        </el-card>
        <el-card shadow="hover" class="box-card">
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 10 }"
              placeholder="请输入内容"
              v-model="textarea2"
            >
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Upload",
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
.textHead {
  margin-bottom: 20px;
}
</style>
