<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="
      router.currentRouter ? router.currentRouter : router.defaultRouter
    "
    @select="selectRouter"
    class="el-menu-vertical"
  >
    <template v-for="item in router.routerData">
      <el-submenu
        v-if="item.children.length > 1"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <Icon :icon="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="ite in item.children"
            :key="ite.path"
            :index="item.path + '/' + ite.path"
            >{{ ite.meta.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        class="el-menu-item-single"
        :index="item.path + '/' + item.children[0].path"
        v-if="item.children.length == 1"
        ><Icon :icon="item.meta.icon" /><span>{{
          item.meta.title
        }}</span></el-menu-item
      >
    </template>
  </el-menu>
</template>

<script lang="ts">
import "@styleLayout/menu.scss";
import { useStore } from "@store/index";
import { default as routerFunc } from "@utils/router/index";
import { computed, defineComponent, reactive, watch } from "vue";
export default defineComponent({
  name: "Menu",
  setup() {
    const store = useStore();
    const router = reactive({
      routerData: [],
      defaultRouter: "",
      currentRouter: "",
    });

    router.routerData = computed(
      () => store.getters["router/getRouters"]
    ).value;
    router.defaultRouter = computed(
      () => store.getters["router/getDefaultRouter"]
    ).value;
    watch(
      () => store.getters["router/getCurrentRouter"],
      (val) => {
        router.currentRouter = val;
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const selectR = (key, keyPath) => {
      const path = keyPath.length == 1 ? keyPath[0] : keyPath[1];
      routerFunc({ path: path }).routerPush();
    };

    return { router, selectRouter: selectR };
  },
});
</script>
