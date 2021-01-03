<template>
  <el-container class="main layout">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container class="layout_box">
      <el-aside>
        <Menu></Menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import "/@styleLayout/index.scss";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
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
