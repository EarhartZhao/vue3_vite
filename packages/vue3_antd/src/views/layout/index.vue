<template>
  <Layout class="main layout">
    <LayoutHeader>
      <Header />
    </LayoutHeader>
    <Layout class="layout_box">
      <LayoutSider>
        <Menu />
      </LayoutSider>
      <LayoutContent>
        <AppMain />
      </LayoutContent>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import "@styleLayout/index.scss";
import {
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
} from "ant-design-vue";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
import AppMain from "./appMain/index.vue";
export default {
  name: "Index",
  components: {
    Layout,
    LayoutHeader,
    LayoutSider,
    LayoutContent,
    Header,
    Menu,
    AppMain,
  },
};
</script>
