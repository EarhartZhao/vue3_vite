<template>
  <div class="">
    <div class="page_func">
      <SearchMix
        :options="data.list"
        placeholder=" xxx "
        optionValue="id"
        optionKey="fileName"
        v-model:by.sync="data.searchData.id"
        v-model:keyword.sync="data.searchData.query"
        @search="goSearch"
      />
    </div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column
        label="实体类型"
        prop="label"
        align="center"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        label="实体名称"
        prop="name"
        align="center"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        label="属性"
        prop="properties"
        align="center"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        label="关联得分"
        prop="score"
        align="center"
        min-width="120"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { KBBASE } from "@api/index";
import SearchMix from "@comp/SearchMix.vue";
export default defineComponent({
  name: "table111",
  components: { SearchMix },
  setup() {
    const data = reactive({
      searchData: {
        query: "",
        limit: 10,
        id: "",
      },
      tableData: [],
      list: [],
    });

    const showElPopover = (row, key) => {
      row[key] = true;
    };

    onMounted(() => {
      goSearch();
      getList();
    });

    const goSearch = () => {
      KBBASE.kbQuery(data.searchData).then((r) => {
        data.tableData = r.entities;
        // console.log("tableData get", data.tableData);
      });
    };

    const getList = () => {
      KBBASE.list().then((r) => {
        data.list = r.list;
      });
    };

    return {
      goSearch,
      data,
      showElPopover,
    };
  },
});
</script>
