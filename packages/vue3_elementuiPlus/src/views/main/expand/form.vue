<template>
  <div class="">
    <div class="page_func">
      <SearchMix
        class="item"
        :options="data.list"
        placeholder="语句"
        optionValue="id"
        optionKey="fileName"
        v-model:by="data.searchData.id"
        v-model:keyword="data.searchData.query"
        @search="goSearch"
      />
    </div>
    <el-table
      :data="data.tableData"
      v-loading="loadTable"
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column
        label="序号"
        align="center"
        width="50"
        type="index"
      ></el-table-column>
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
import { defineComponent, reactive, onMounted, ref } from "vue";
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

    let loadTable = ref(false);

    const showElPopover = (row, key) => {
      row[key] = true;
    };

    onMounted(() => {
      goSearch();
      getList();
    });

    const goSearch = () => {
      loadTable.value = true;
      KBBASE.kbQuery(data.searchData)
        .then((r) => {
          data.tableData = r.entities;
          loadTable.value = false;
        })
        .catch(() => {
          loadTable.value = false;
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
      loadTable,
      showElPopover,
    };
  },
});
</script>
