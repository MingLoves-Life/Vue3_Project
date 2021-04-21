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
  left: 250px;
  top: 70px;
}
</style>
