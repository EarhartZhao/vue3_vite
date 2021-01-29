<template>
  <div id="components-layout-demo-basic">
    <a-layout class="main layout">
      <a-layout-header><Header /></a-layout-header>
      <a-layout class="layout_box">
        <a-layout-sider><Menu /></a-layout-sider>
        <a-layout-content><AppMain /></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import "/@styleLayout/index.scss";
import Header from "./header/index";
import Menu from "./menu/index";
import AppMain from "./appMain/index.vue";
export default {
  name: "Index",
  components: {
    Header,
    Menu,
    AppMain,
  },
};
</script>
