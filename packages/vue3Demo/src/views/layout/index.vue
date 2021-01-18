<template>
  <el-container class="main layout">
    <el-header>
      <Header />
    </el-header>
    <el-container class="layout_box">
      <el-aside>
        <Menu />
      </el-aside>
      <el-main>
        <!-- <router-view></router-view> -->
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import "/@styleLayout/index.scss";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
import AppMain from "./appMain/index";
import strong from "/@utils/stronge";
export default {
  name: "Index",
  components: {
    Header,
    Menu,
  },
  data() {
    return {
      msg: "home",
    };
  },
};
</script>
