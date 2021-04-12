<template>
  <main>
    <Particles id="tsparticles" :options="ParticlesOptions" />
    <div class="login_box">
      <!-- <el-button type="primary" @click="turnPage">进入</el-button> -->
    </div>
  </main>
</template>

<script>
import { ParticlesOptions } from "./ParticlesOptions";
// import { createRouter, createWebHistory } from 'vue-router';
// import router from "@router/index";
import router from "@utils/router/index";
import "@styleV/base/login/index.scss";
import { useStore } from "@store/index";
import { reactive, defineComponent, computed, ref, onMounted } from "vue";
export default defineComponent({
  name: "login",
  data() {
    return {
      ParticlesOptions,
      form: {},
    };
  },
  setup() {
    const store = useStore();
    // let projectItem = store.getters("projectItem");
    let query = router().getQuery() || {};
    if (JSON.stringify(query) !== "{}" && query.hasOwnProperty("projectItem")) {
      store.commit("projectItem", query.projectItem);
    } else {
      store.commit("projectItem", "");
    }

    const turnPage = () => {
      // this.$router.push("/index");
      console.log("router", router);
      console.log("router-get", router().getQuery());
      router({ path: "/index" }).routerPush();
    };
    return { turnPage };
  },
});
</script>
