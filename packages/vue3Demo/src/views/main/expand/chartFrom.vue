<template>
  <div>
    <DialogBox
      title="文字测试"
      :show="dialogFormVisible"
      dialogWidth="400px"
      @close="hideForm"
    >
      <template #body>
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </template>
    </DialogBox>
  </div>
</template>

<script lang="ts">
import { getRevisedAttrAndName } from "@utils/print";
import DialogBox from "@comp/DialogBox.vue";
import { useStore } from "@store/index";
import { reactive, defineComponent, computed } from "vue";
export default defineComponent({
  name: "chartFrom",
  components: { DialogBox },
  setup() {
    const store = useStore();
    const formLabelWidth = "100";
    let form = reactive({});

    const dialogFormVisible = computed(
      () => store.getters["chartForm/chartFromStatus"]
    );

    const sure = () => {
      // console.log("form", form);
      getRevisedAttrAndName(form);
      hideForm();
    };

    const setStatus = (status: any) =>
      store.commit("chartForm/setChartFormStatus", status);

    const showForm = () => setStatus(true);
    const hideForm = () => setStatus(false);

    return {
      setStatus,
      showForm,
      sure,
      hideForm,
      dialogFormVisible,
      form,
      formLabelWidth,
    };
  },
});
</script>
