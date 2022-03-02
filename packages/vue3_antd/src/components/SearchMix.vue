<template>
  <el-input
    v-model="searchKeyword"
    :placeholder="'输入' + placeholder + '搜索'"
    :style="{ width: inputWidth }"
    class="item"
    suffix-icon="el-icon-search"
    @input="input"
    @keyup.native.enter="search"
  >
    <template #prepend>
      <el-select
        placeholder="请选择"
        v-model="searchBy"
        :style="{ width: selectWidth }"
        @change="change"
      >
        <el-option
          v-for="(item, index) in options"
          :label="item[optionKey]"
          :value="item[optionValue]"
          :key="index"
        />
      </el-select>
    </template>
    <!-- <template #append>
      <el-button icon="el-icon-search"></el-button>
    </template> -->
  </el-input>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted } from "vue";
export default defineComponent({
  name: "SearchMix",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    inputWidth: {
      type: String,
      default: "250px",
    },
    selectWidth: {
      type: String,
      default: "94px",
    },
    options: {
      type: Array,
      required: true,
    },
    by: {
      type: String,
      default: "",
    },
    keyword: {
      type: String,
      default: "",
    },
    optionKey: {
      type: String,
      default: "key",
    },
    optionValue: {
      type: String,
      default: "value",
    },
  },
  setup(props, { emit }) {
    let place = ref("");
    let searchKeyword = ref("");
    let searchBy = ref("");
    const { options, by } = toRefs(props);

    const input = (val) => {
      emit("update:keyword", searchKeyword);
      emit("input", searchBy.value, val);
    };
    const change = (val) => {
      emit("update:by", searchBy);
      emit("change", val, searchKeyword.value);
    };
    const search = () => {
      emit("search", searchBy.value, searchKeyword.value);
    };

    onMounted(() => {
      // const opts = options;
      // if (!by) {
      //   if (opts.length && opts[0].key) {
      //     searchBy.value = opts[0].key;
      //   }
      // } else {
      //   searchBy = by;
      // }
    });

    return { place, searchKeyword, searchBy, input, change, search };
  },
});
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 10px;
  margin-right: 4px;
}
</style>
