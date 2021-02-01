<template>
  <ElContainer class="main layout">
    <ElHeader>
      <Header />
    </ElHeader>
    <ElContainer class="layout_box">
      <ElAside>
        <Menu />
      </ElAside>
      <ElMain>
        <AppMain />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
import "/@styleLayout/index.scss";
import { ElAside, ElContainer, ElHeader, ElMain } from "element-plus";
import Header from "./header/index";
import Menu from "./menu/index.vue";
import AppMain from "./appMain/index.vue";
export default {
  name: "Index",
  components: {
    ElAside,
    ElContainer,
    ElHeader,
    ElMain,
    Header,
    Menu,
    AppMain,
  },
};
</script>
