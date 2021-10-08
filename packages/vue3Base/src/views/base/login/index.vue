<template>
  <main>
    <Particles id="tsparticles" :options="ParticlesOptions" />
    <div class="box">
      <el-button type="primary" @click="turnPage">进入</el-button>
    </div>
  </main>
</template>

<script>
import { ParticlesOptions } from "./ParticlesOptions";
import "@styleV/base/login/index.scss";
export default {
  name: "login",
  data() {
    return {
      msg: "login",
      ParticlesOptions,
    };
  },
  methods: {
    turnPage() {
      this.$router.push("/index");
    },
  },
};
</script>
