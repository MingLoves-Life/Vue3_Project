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
                <el-input
                  v-model="title"
                  :input="titleChange(title)"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="稿件类型"
                class="item"
                :style="{ marginBottom: '0px' }"
              >
                <el-select v-model="type" placeholder="请选择">
                  <el-option
                    v-for="item in option1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :change="typeChange(type)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="上传平台"
                class="item"
                :style="{ marginBottom: '0px' }"
              >
                <el-select v-model="website" placeholder="请选择">
                  <el-option
                    v-for="item in option2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :change="websiteChange(website)"
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
                @click="handleClick"
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
              v-model="context"
              :input="contextChange(context)"
            >
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import URL from "../api/api";
import router from "../router/index";
import { option1, option2 } from "../api/config";

export default defineComponent({
  name: "Upload",
  setup: () => {
    const uploadObj = reactive({
      title: "",
      type: "",
      website: "",
      context: "",
    });

    const titleChange = (title) => (uploadObj.title = title);
    const typeChange = (type) => (uploadObj.type = type);
    const websiteChange = (website) => (uploadObj.website = website);
    const contextChange = (context) => (uploadObj.context = context);

    const handleClick = async () => {
      try {
        await axios({
          url: URL.upload,
          method: "post",
          data: {
            ...uploadObj,
            userName: localStorage.getItem("userName"),
            readTimes: 0,
            money: 0,
            createTime: new Date(),
            status: "pendding",
          },
        });
        ElMessage({ type: "success", message: "上传稿件成功", center: true });
        router.go(0);
      } catch (err) {
        ElMessage({ type: "error", message: "上传稿件失败", center: true });
      }
    };
    return {
      option1,
      option2,
      handleClick,
      titleChange,
      typeChange,
      websiteChange,
      contextChange,
      ...toRefs(uploadObj),
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
.textHead {
  margin-bottom: 20px;
}
</style>
