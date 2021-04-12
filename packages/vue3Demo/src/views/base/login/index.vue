<template>
  <main>
    <Particles id="tsparticles" :options="ParticlesOptions" />
    <div class="login_box">
      <!-- <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition> -->
      <router-view />
    </div>
  </main>
</template>

<script>
import { ParticlesOptions } from "./ParticlesOptions";
import router from "@utils/router/index";
import "@styleV/base/login/index.scss";
import { useStore } from "@store/index";
import { defineComponent } from "vue";
export default defineComponent({
  name: "login",
  data() {
    return {
      ParticlesOptions,
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
