<template>
  <main>
    <div class="login_box">
      <!-- <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition> -->
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import router from "@utils/router/index";
import "@styleV/base/login.scss";
import { useStore } from "@store/index";
import { defineComponent } from "vue";
export default defineComponent({
  name: "login",
  data() {
    return {
    };
  },
  setup() {
    const store = useStore();
    let query = router().getQuery() || {};

    if (JSON.stringify(query) !== "{}" && query.hasOwnProperty("projectItem")) {
      store.commit("system/setProjectItem", query.projectItem);
    } else {
      store.commit("system/setProjectItem", "");
    }
    return {};
  },
});
</script>

<style lang="less" scoped>
main{
  background-image: url(../../../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: auto 100%;
}
</style>
