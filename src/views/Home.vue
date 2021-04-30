<template>
  <div class="warp">
    <Header class="header" />
    <Aside class="aside" />
    <div class="context" :style="{ left: isCollapse }">
      <suspense>
        <router-view />
      </suspense>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Header from "../components/Header.vue";
import Aside from "../components/Aside";

export default defineComponent({
  components: { Header, Aside },
  setup: () => {
    const store = useStore();
    const isCollapse = computed(() =>
      store.state.collapse ? "64px" : "250px"
    );

    return { isCollapse };
  },
});
</script>
<style scoped>
.warp {
  height: 100%;
  /* overflow: hidden; */
}
.aside {
  position: absolute;
  top: 70px;
  bottom: 0px;
  width: 250px;
  height: 91.3%;
}
.context {
  position: absolute;
  top: 70px;
  right: 0px;
  bottom: 0px;
  background-color: #f0f0f0;
  padding: 10px;
  transition: all 0.4s;
  overflow-y: scroll;
}
</style>
