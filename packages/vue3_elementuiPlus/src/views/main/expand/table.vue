<template>
  <div class="page_func">
    <Search
      v-model:input="data.searchData.fileName"
      place="名称"
      style="width: 160px"
      class="item"
      @search="goSearch"
    />
    <el-button type="primary" @click="dialogFormVisible = true" class="item"
      >导入</el-button
    >
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
      :index="indexMethod"
    ></el-table-column>
    <el-table-column
      label="文件名称"
      prop="title"
      align="center"
      min-width="120"
    ></el-table-column>
    <el-table-column
      label="id"
      prop="id"
      align="center"
      min-width="120"
    ></el-table-column>
    <el-table-column
      label="属性1"
      prop="attr1"
      align="center"
      min-width="120"
    ></el-table-column>
    <el-table-column
      label="属性2"
      prop="attr2"
      align="center"
      min-width="120"
    ></el-table-column>
    <el-table-column label="属性3" align="center" :width="200">
      <template #default="scope">
        <div class="table_edit">
          <template v-if="!scope.row.visibleB">
            <p>{{ scope.row.attr3 }}</p>
          </template>
          <template v-else>
            <el-input
              placeholder="请输入"
              v-model="scope.row.attrCopy"
              clearable
            ></el-input>
            <i class="el-icon-circle-check" @click="saveAttr(scope.row)" />
            <i
              class="el-icon-circle-close"
              @click="scope.row.visibleB = false"
            />
          </template>
        </div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="180">
      <template #default="scope">
        <el-button @click="editAttr(scope.row)" size="small" type="text"
          >编辑属性3</el-button
        >
        <el-popconfirm
          confirmButtonText="确定"
          cancelButtonText="取消"
          icon="el-icon-info"
          iconColor="red"
          title="删除后文件不可恢复，是否继续？"
          @confirm="deleteFile(scope.row)"
        >
          <template #reference>
            <el-button type="text" class="delete">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <Page
    :total="data.total"
    :pageSize="data.searchData.pageSize"
    v-model:page="data.searchData.page"
    @change="goSearch"
  />

  <DialogBox
    title="弹框"
    :show="dialogFormVisible"
    dialogWidth="400px"
    @close="hideForm"
  >
    <template #body>
      <el-form :model="data.form">
        <el-form-item label="上传文件">
          <MulUpload ref="MulUpload" @uploadData="upload" accept="." />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="hideForm">关闭</el-button>
      <el-button type="primary" @click="submitForm">上传</el-button>
    </template>
  </DialogBox>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch, ref } from "vue";
import { ElMessage } from "element-plus";
import DialogBox from "@comp/DialogBox.vue";
import MulUpload from "@comp/MulUpload.vue";
import { TABLE } from "@api/index";
import Search from "@/components/Search.vue";
import Page from "@/components/Page.vue";
export default defineComponent({
  name: "tableEX",
  components: { Search, DialogBox, MulUpload, Page },
  setup() {
    const data = reactive({
      searchData: {
        page: 1,
        pageSize: 10,
        fileName: "",
      },
      total: 0,
      tableData: [],
      from: {},
      files: null,
    });
    let loadTable = ref(false);
    let dialogFormVisible = ref(false);
    let MulUpload = ref(null);

    const hideForm = () => {
      dialogFormVisible.value = false;
      data.files = null;
      MulUpload.value.clearUpload();
    };

    const submitForm = () => {
      MulUpload.value.submitUpload();
      // dialogFormVisible.value = false;
    };

    const upload = (files) => {
      data.files = files;
    };
    const editAttr = (row) => {
      row.visibleB = true;
      row.attrCopy = row.attr3;
    };
    const saveAttr = (row) => {
      if (!row.attrCopy) return ElMessage("属性不能为空！");
      row.visibleB = false;
      row.attr3 = row.attrCopy;
      ElMessage.success("操作成功");
    };

    onMounted(() => {
      goSearch();
    });

    const deleteFile = (row) => {};

    const goSearch = () => {
      loadTable.value = true;
      TABLE.search(data.searchData)
        .then((r) => {
          data.tableData = r;
          loadTable.value = false;
        })
        .catch(() => {
          loadTable.value = false;
        });
    };

    const indexMethod = (index) => {
      return index + 1 + (data.searchData.page - 1) * 10;
    };

    return {
      goSearch,
      data,
      loadTable,
      deleteFile,
      dialogFormVisible,
      hideForm,
      submitForm,
      upload,
      MulUpload,
      indexMethod,
      saveAttr,
      editAttr,
    };
  },
});
</script>

<style lang="scss" scoped>
.table_edit {
  display: flex;
  align-items: center;
  p {
    text-align: center;
    width: 100%;
  }
  i {
    font-size: 16px;
    cursor: pointer;
    margin: 0 0 0 4px;
  }
}
</style>
