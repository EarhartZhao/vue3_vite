<template>
  <el-input
    v-model="name"
    :placeholder="`输入${place}搜索`"
    :style="`width: ${width}px`"
    suffix-icon="el-icon-search"
    @keyup.enter.native="search"
    clearable
  ></el-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "Search",
  props: {
    place: {
      type: String,
      default: "内容",
    },
    width: {
      type: String,
      default: "134",
    },
    input: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let name = ref("");
    // const { input } = toRefs(props);

    onMounted(() => {
      emit("update:input", name.value);
    });

    watch(name, () => {
      emit("update:input", name);
    });

    const search = () => {
      emit("search", name);
    };

    const closeDialog = () => {
      emit("close", false);
    };
    return { closeDialog, name, search };
  },
});
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 10px;
  margin-right: 4px;
}
</style>
