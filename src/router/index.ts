import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Person from "../views/Person.vue";
import Audit from "../views/Audit.vue";
import Management from "../views/Management.vue";
import Payment from "../views/Payment.vue";
import Account from "../views/Account.vue";
import Task from "../views/Task.vue";
import Upload from "../views/Upload.vue";
import Reader from "../views/Reader.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/Person" },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/Person",
        name: "Person",
        meta: {
          title: "个人中心",
        },
        component: Person,
      },

      {
        path: "/Management",
        name: "Management",
        meta: {
          title: "稿件管理",
        },
        component: Management,
      },
      {
        path: "/Payment",
        name: "Payment",
        meta: {
          title: "稿件列表",
        },
        component: Payment,
      },
      {
        path: "/Audit",
        name: "Audit",
        meta: {
          title: "稿件审核",
        },
        component: Audit,
      },
      {
        path: "/Upload",
        name: "Upload",
        meta: {
          title: "稿件上传",
        },
        component: Upload,
      },
      {
        path: "/Account",
        name: "Account",
        meta: {
          title: "账户管理",
        },
        component: Account,
      },
      {
        path: "/Task",
        name: "Task",
        meta: {
          title: "任务中心",
        },
        component: Task,
      },

      {
        path: "/Reader",
        name: "Reader",
        meta: {
          title: "读者交流",
        },
        component: Reader,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
