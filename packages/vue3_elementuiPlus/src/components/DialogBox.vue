<template>
  <el-dialog
    :title="title"
    v-model="visible"
    :width="dialogWidth"
    @close="closeDialog"
    :lock-scroll="true"
    :show-close="true"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :append-to-body="true"
  >
    <slot name="body" />
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "DialogBox",
  props: {
    title: {
      type: String,
      default: "",
    },
    dialogWidth: {
      type: String,
      default: "500px",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const visible = computed({
      get: () => props.show,
      set: (val) => val,
    });

    const closeDialog = () => {
      emit("close", false);
    };
    return { closeDialog, visible };
  },
});
</script>

<style lang="scss">
.dialog-box-wrap {
  border-radius: 6px;

  .el-dialog__header {
    height: 55px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: 1px solid #f3f3f3;
  }

  .el-dialog__body {
    padding: 10px 10px;
    > div {
      padding: 10px 10px;
      max-height: calc(100vh - 20vh - 165px);
      overflow: auto;
    }
  }

  .el-dialog__footer {
    border-top: 1px solid #f3f3f3;
    height: 55px;
  }

  label {
    font-weight: normal;
  }
}
</style>
