import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { ElMessage } from "element-plus";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";
createApp(App)
  .provide("$message", ElMessage)
  .use(router)
  .use(ElementPlus, { locale })
  .use(store)
  .mount("#app");
