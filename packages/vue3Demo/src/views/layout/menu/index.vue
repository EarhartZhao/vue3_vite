<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="defaultRouter"
    @select="selectRouter"
    class="el-menu-vertical"
  >
    <el-submenu :index="item.path" v-for="item in routers" :key="item.path">
      <template #title>
        <Icon :icon="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="ite in item.children"
          :key="ite.path"
          :index="ite.path"
          >{{ ite.meta.title }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import "/@styleLayout/menu/index.scss";
import { useStore } from "/@store/index";
import { computed, defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "Menu",
  data() {
    return {
      // defaultRouter: "/home/index",
    };
  },
  components: {},
  setup() {
    const store = useStore();
    const routers =
      computed(() => store.getters["router/getRouters"]).value || [];
    const defaultRouter =
      computed(() => store.getters["router/getDefaultRouter"]).value || "";
    const selectR = (key, keyPath) => {
      console.log("selectRouter----", key, keyPath);
      const path = keyPath[0] + "/" + keyPath[1];
      console.log("store----", store);
      store.commit("router/setCurrentRouter", path);
    };
    return { routers, defaultRouter, selectRouter: selectR };
  },
});
</script>
