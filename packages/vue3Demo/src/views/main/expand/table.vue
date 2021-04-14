<template>
  <div></div>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      label="文件名称"
      prop="fileName"
      align="center"
      min-width="120"
    >
    </el-table-column>
    <el-table-column
      label="文档目录"
      prop="dirName"
      min-width="120"
      align="center"
    ></el-table-column>
    <el-table-column
      label="文档标签"
      prop="labels"
      align="center"
      min-width="120"
    >
    </el-table-column>
    <el-table-column
      label="导入时间"
      prop="createTime"
      align="center"
      min-width="120"
    >
    </el-table-column>
    <el-table-column
      label="生成时间"
      prop="atlasCreateTime"
      align="center"
      min-width="120"
    >
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="270">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >预览文档</el-button
        >
        <el-button type="text" size="small">预览图谱</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { KBBASE } from "@api/index";
export default defineComponent({
  name: "table111",
  data() {
    return {
      tableData: [
        {
          fileName: "wew",
          fileId: "06dca2cc3d90a3e50593f5a8989c769b",
          labels: 1123,
          createTime: 231231,
          atlasCreateTime: 123124,
          atlasStatus: 0,
          filePath: 324234,
          dirId: null,
          dirName: 234532423,
        },
        {
          fileName: "wew",
          fileId: "b7a016b34b153e430841a1945d7bc9ae",
          labels: null,
          createTime: null,
          atlasCreateTime: null,
          atlasStatus: 0,
          filePath: null,
          dirId: null,
          dirName: null,
        },
      ],
    };
  },
  setup(props, { emit }) {
    const chartFromRef = ref(null);
    const handleClick = (row) => {
      console.log(row);
    };
    return { chartFromRef, handleClick };
  },
});
</script>
