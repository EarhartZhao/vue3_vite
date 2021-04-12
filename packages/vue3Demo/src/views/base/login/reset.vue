<template>
  <main>
    <div class="login_form_box">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </main>
</template>

<script>
import { ParticlesOptions } from "./ParticlesOptions";
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
