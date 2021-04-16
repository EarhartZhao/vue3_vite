<template>
  <el-upload
    class="upload-demo"
    ref="mulUpload"
    action=""
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :file-list="data.fileList"
    :http-request="uploadData"
    :auto-upload="false"
    accept=".doc,.docx"
    :limit="10"
    multiple
  >
    <template #trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <template #tip>
      <div class="el-upload__tip">只能上传 doc/docx 文件，且不超过 500kb</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
export default defineComponent({
  name: "MulUpload",
  props: {
    place: {
      type: String,
      default: "内容",
    },
  },
  setup(props, { emit }) {
    let mulUpload = ref(null);
    const data = reactive({
      fileList: [],
      files: [],
    });

    // const { input } = toRefs(props);

    const submitUpload = () => {
      data.files = [];
      mulUpload.value.submit();
      console.log("child-submitUpload");
    };
    const handleRemove = (file, fileList) => {
      console.log("handleRemove", file, fileList);
    };
    const handlePreview = (file) => {
      //点击文件列表中已上传的文件时的钩子
      console.log("handlePreview", file);
    };

    const handleSuccess = (response, file, fileList) => {
      console.log("handleRemove", response, file, fileList);
    };
    const handleError = (err, file, fileList) => {
      console.log("handleRemove", err, file, fileList);
    };
    const uploadData = (params) => {
      data.files.push(params.file);
      emit("uploadData", data.files);
    };

    return {
      data,
      submitUpload,
      handleRemove,
      handlePreview,
      mulUpload,
      handleSuccess,
      handleError,
      uploadData,
    };
  },
});
</script>

<style></style>
