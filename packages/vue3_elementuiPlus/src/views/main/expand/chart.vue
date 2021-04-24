<template>
  <div>
    <div ref="containerDom">
      <p style="color: #fff" @click="showFormF">112312312312</p>
    </div>
    <chartFrom ref="chartFromRef" />
  </div>
</template>

<script lang="ts">
import { init } from "@utils/print";
import data from "@utils/print/printData.json";
import { defineComponent, onMounted, ref } from "vue";
import "@styleMain/expend/chart.scss";
import chartFrom from "./chartFrom.vue";
export default defineComponent({
  name: "chart",
  components: { chartFrom },
  setup(props, { emit }) {
    const containerDom = ref(null);
    const chartFromRef = ref(null);

    const showFormF = () => {
      chartFromRef.value.showForm()
    };

    onMounted(() => {
      // DOM元素将在初始渲染后分配给ref
      try {
        init(containerDom.value, data);
      } catch (error) {
        console.log(error);
      }
    });
    return { containerDom, chartFromRef,showFormF };
  },
});
</script>
