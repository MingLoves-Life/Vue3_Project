<template>
  <div>
    <Header class="header" />
    <Aside class="aside" />
    <div class="context">
      <router-view />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Aside from "../components/Aside";

export default defineComponent({
  components: { Header, Aside },
});
</script>
<style scoped>
.context {
  position: absolute;
  top: 70px;
  right: 0px;
  bottom: 0px;
  left: 250px;
  background-color: #f0f0f0;
  padding: 10px;
}
</style>
