<template>
  <Menu
    mode="inline"
    :openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @openChange="onOpenChange"
  >
    <SubMenu :key="item.path" :id="item.path" v-for="(item, index) in routers">
      <template #title>
        <span>
          <Icon :icon="item.meta.icon" /><span>{{ item.meta.title }}</span>
        </span>
      </template>
      <Item
        :key="ite.path"
        :id="ite.path"
        v-for="(ite, ind) in item.children"
        >{{ ite.path }}</Item
      >
    </SubMenu>
  </Menu>
</template>

<script lang="ts">
import "/@styleLayout/menu/index.scss";
import { useStore } from "/@store/index";
import { Menu } from "ant-design-vue";
const { Item, SubMenu, ItemGroup } = Menu;
import { computed, defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "Menu",
  data() {
    return {
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      selectedKeys: [],
    };
  },
  components: {
    Item,
    SubMenu,
    ItemGroup,
    Menu,
  },
  setup() {
    const store = useStore();
    const routers =
      computed(() => store.getters["router/getRouters"]).value || [];
    return { routers };
  },
  methods: {
    onOpenChange(openKeys) {
      console.log("openKeys", openKeys);
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
});
</script>
