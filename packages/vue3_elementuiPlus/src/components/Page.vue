<template>
  <el-pagination
    v-model:currentPage="currentPage"
    :page-size.sync="pageSize"
    :layout="layout"
    :total="total"
    class="align-c"
    @current-change="change"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "Page",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    layout: {
      type: String,
      default: "total, prev, pager, next, jumper",
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const currentPage = computed({
      get: () => props.page,
      set: (val) => emit("update:page", val),
    });
    const change = () => {
      emit("change");
    };
    return { change, currentPage };
  },
});
</script>
