<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="defaultRouter"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
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
      defaultRouter: "/home/index",
    };
  },
  components: {},
  setup() {
    const store = useStore();
    const routers =
      computed(() => store.getters["router/getRouters"]).value || [];
    return { routers };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
});
</script>
