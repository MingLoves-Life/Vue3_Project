<template>
  <div>
    <el-menu
      class="aside"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
      :collapse="isCollapse"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>
                  <i :class="subItem.icon"></i>
                  {{ subItem.title }}</template
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <i :class="subItem.icon"></i>
                {{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "aside",
  setup: () => {
    const store = useStore();
    const isCollapse = computed(() => store.state.collapse);
    const permissions = localStorage.getItem("permissions");
    const editorItems = [
      {
        icon: "el-icon-user",
        index: "Person",
        title: "个人中心",
      },
      {
        icon: "el-icon-s-tools",
        index: "Account",
        title: "账户管理",
      },
      {
        icon: "el-icon-menu",
        index: "Management",
        title: "稿件管理",
        subs: [
          {
            icon: "el-icon-s-order",
            index: "Payment",
            title: "稿件列表",
          },
          {
            icon: "el-icon-s-cooperation",
            index: "Audit",
            title: "稿件审核",
          },
          {
            icon: "el-icon-upload",
            index: "Upload",
            title: "稿件上传",
          },
        ],
      },
      {
        icon: "el-icon-s-comment",
        index: "Reader",
        title: "读者交流",
      },
      {
        icon: "el-icon-data-line",
        index: "Task",
        title: "任务中心",
      },
    ];
    const authorItems = [
      {
        icon: "el-icon-user",
        index: "Person",
        title: "个人中心",
      },
      {
        icon: "el-icon-s-tools",
        index: "Account",
        title: "账户管理",
      },
      {
        icon: "el-icon-s-cooperation",
        index: "Management",
        title: "稿件管理",
        subs: [
          {
            icon: "el-icon-s-order",
            index: "Payment",
            title: "稿件列表",
          },
          {
            icon: "el-icon-upload",
            index: "Upload",
            title: "稿件上传",
          },
        ],
      },
      {
        icon: "el-icon-s-comment",
        index: "Reader",
        title: "读者交流",
      },
      {
        icon: "el-icon-data-line",
        index: "Task",
        title: "任务中心",
      },
    ];
    return {
      isCollapse,
      items: permissions === "作者" ? authorItems : editorItems,
    };
  },
});
</script>
<style scoped>
.aside {
  height: 100%;
  overflow: hidden;
}
</style>
