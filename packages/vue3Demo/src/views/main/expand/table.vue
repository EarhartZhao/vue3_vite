<template>
  <div class="">
    <div class="page_func">
      <Search
        :input.sync="data.searchData.fileName"
        place="文件名称"
        style="width: 160px"
        @search="goSearch"
      />
      <el-button type="primary" @click="dialogFormVisible = true"
        >导入</el-button
      >
    </div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column
        label="文件名称"
        prop="fileName"
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
      <el-table-column
        label="图谱ID"
        prop="huaweiKgId"
        align="center"
        min-width="120"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="320">
        <template #default="scope">
          <el-button
            @click="generateAtlas(scope.row)"
            type="text"
            size="small"
            >{{ atlaState(scope.row.atlasStatus) }}</el-button
          >
          <!-- <el-button type="text" size="small" @click="bindAtlasId(scope.row)">{{
            scope.row.huaweiKgId ? "编辑图谱ID" : "添加图谱ID"
          }}</el-button> -->
          <el-popover
            placement="bottom"
            :width="160"
            trigger="hover"
            v-model:visible="scope.row.visibleB"
          >
            <p>
              <el-input placeholder="请输入内容" v-model="huaweiKgId" clearable>
              </el-input>
            </p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="scope.row.visibleB = false"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="
                  scope.row.visibleB = false;
                  bindAtlasId(scope.row);
                "
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button
                @click="scope.row.visibleB = true"
                size="small"
                type="text"
                >{{
                  scope.row.huaweiKgId ? "编辑图谱ID" : "添加图谱ID"
                }}</el-button
              >
            </template>
          </el-popover>
          <el-button type="text" size="small" @click="download(scope.row)"
            >下载</el-button
          >
          <el-popover
            placement="bottom"
            :width="200"
            trigger="hover"
            v-model:visible="scope.row.visibleD"
          >
            <p>删除后文件和图谱不可恢复，是否继续？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="text" @click="scope.row.visibleD = false"
                >取消</el-button
              >
              <el-button type="text" @click="deleteFile(scope.row)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-button
                type="text"
                @click="showElPopover(scope.row, 'visibleD')"
                >删除</el-button
              >
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <DialogBox
      title="文字测试"
      :show="dialogFormVisible"
      dialogWidth="400px"
      @close="hideForm"
    >
      <template #body>
        <el-form :model="data.form">
          <el-form-item label="上传文件">
            <MulUpload
              ref="MulUpload"
              @uploadData="upload"
              accept=".doc,.docx"
            />
          </el-form-item>
          <el-form-item
            label="失败文件"
            v-if="
              data.uploadInfo.failedList &&
              data.uploadInfo.failedList.length > 0
            "
          >
            <p v-for="item in data.uploadInfo.failedList">
              {{ item }}
            </p>
          </el-form-item>
          <el-form-item
            label="成功文件"
            v-if="
              data.uploadInfo.successList &&
              data.uploadInfo.successList.length > 0
            "
          >
            <p v-for="item in data.uploadInfo.successList">
              {{ item.fileName }}
            </p>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="hideForm">关闭</el-button>
        <el-button type="primary" @click="submitForm">上 传</el-button>
      </template>
    </DialogBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch, ref } from "vue";
import { ElMessage } from "element-plus";
import DialogBox from "@comp/DialogBox.vue";
import MulUpload from "@comp/MulUpload.vue";
import { KBBASE } from "@api/index";
import { downFile } from "@utils/downLoad/index";
import Search from "@/components/Search.vue";
export default defineComponent({
  name: "table111",
  components: { Search, DialogBox, MulUpload },
  setup() {
    const data = reactive({
      searchData: {
        page: 1,
        pageSize: 10,
        fileName: "",
      },
      tableData: [],
      from: {},
      files: null,
      uploadInfo: {},
    });
    let huaweiKgId: any = ref("");
    let dialogFormVisible = ref(false);
    let MulUpload = ref(null);

    const hideForm = () => {
      dialogFormVisible.value = false;
      data.files = null;
      data.uploadInfo = {};
      MulUpload.value.clearUpload();
    };

    const submitForm = () => {
      MulUpload.value.submitUpload();
      KBBASE.upload(data.files).then((r) => {
        ElMessage.success("操作成功");
        console.log("upload", r);
        data.uploadInfo = { ...r };
        if (r.successList && r.successList.length > 0)
          postSuccess(r.successList);
      });
      // dialogFormVisible.value = false;
    };

    const postSuccess = (data) => {
      KBBASE.saveUpload(data).then((r) => {
        // ElMessage.success("操作成功");
        console.log("saveUpload", r);
        goSearch();
      });
    };

    const upload = (files) => {
      data.files = files;
    };

    const generateAtlas = (row) => {
      KBBASE.generateAtlas(row.id).then((r) => {
        ElMessage.success("操作成功");
        row.atlasStatus = r;
      });
    };

    const showElPopover = (row, key) => {
      row[key] = true;
    };

    const atlaState = (s) => {
      let text = "";
      switch (s) {
        case 0:
          text = "未生成";
          break;
        case 1:
          text = "生成中";
          break;
        case 2:
          text = "生成完毕";
          break;
        default:
          text = "error";
          break;
      }
      return text;
    };

    onMounted(() => {
      goSearch();
    });

    const bindAtlasId = (row) => {
      KBBASE.bind(row.id, huaweiKgId).then((r) => {
        huaweiKgId = "";
        ElMessage.success("操作成功");
      });
    };

    const deleteFile = (row) => {
      KBBASE.deleteFile(row.id).then((r) => {
        row.visibleD = false;
        ElMessage.success("操作成功");
      });
    };

    const download = (row) => {
      KBBASE.download(row.id).then((r) => {
        downFile("测试文件", r);
      });
    };

    const goSearch = () => {
      KBBASE.search(data.searchData).then((r) => {
        data.tableData = r.list;
        // console.log("tableData get", data.tableData);
      });
    };
    return {
      generateAtlas,
      goSearch,
      data,
      download,
      atlaState,
      bindAtlasId,
      deleteFile,
      showElPopover,
      huaweiKgId,
      dialogFormVisible,
      hideForm,
      submitForm,
      upload,
      MulUpload,
    };
  },
});
</script>
