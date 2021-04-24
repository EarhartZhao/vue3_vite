import '@styleMain/expend/chart.scss'

import { init, data } from '@utils/category'
// import data from '@utils/category/categoryData.json'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: "Expand_Category",
  setup() {
    const containerDom = ref(null);

    onMounted(() => {
      // DOM元素将在初始渲染后分配给ref
      try {
        init(containerDom.value, data);
      } catch (error) {
        console.log(error);
      }
    });
    return () => <div ref={containerDom}>category page</div>;
  },
});
