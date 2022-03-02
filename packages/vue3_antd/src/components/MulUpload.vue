<template>
  <el-upload
    class="upload-demo"
    ref="mulUpload"
    action=""
    :on-preview="handlePreview"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :file-list="data.fileList"
    :http-request="uploadData"
    :auto-upload="false"
    :accept="accept"
    :limit="10"
    multiple
  >
    <template #trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
    <el-button
      style="margin-left: 10px"
      size="small"
      v-show="false"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <template #tip>
      <div class="el-upload__tip">只能上传 xxxx 文件</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "MulUpload",
  props: {
    place: {
      type: String,
      default: "内容",
    },
    accept: {
      type: String,
      default: ".",
    },
  },
  setup(props, { emit }) {
    let mulUpload = ref(null);
    const data = reactive({
      fileList: [],
      files: null,
    });

    const submitUpload = () => {
      mulUpload.value.submit();
    };
    const handleChange = (file, fileList) => {
      data.files = null;
      const formData = new FormData();

      fileList.forEach((ele) => {
        formData.append("files", ele.raw, ele.name);
      });
      data.files = formData;
    };

    const uploadData = (params) => {
      emit("uploadData", data.files);
    };

    const clearUpload = () => {
      //清除表单
      data.fileList = [];
      data.files = null;
      mulUpload.value.clearFiles();
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

    return {
      data,
      mulUpload,
      submitUpload,
      handleChange,
      handleRemove,
      handlePreview,
      handleSuccess,
      handleError,
      uploadData,
      clearUpload,
    };
  },
});
</script>

<style lang="scss" scoped></style>
