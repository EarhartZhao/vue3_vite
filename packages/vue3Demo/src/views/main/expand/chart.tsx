import '@styleMain/expend/chart.scss'

import { init } from '@utils/print'
import data from '@utils/print/printData.json'
import { defineComponent, onMounted, ref } from 'vue'

import chartFrom from './chartFrom.vue'

export default defineComponent({
  name: "Expand_Chart",
  components: { chartFrom },
  setup() {
    const containerDom = ref(null);
    const chartFromRef = ref();

    onMounted(() => {
      // DOM元素将在初始渲染后分配给ref
      try {
        init(containerDom.value, data);
      } catch (error) {
        console.log(error);
      }
    });

    const showFormF = () => {
      chartFromRef.value.showForm();
    };

    return () => (
      <div ref={containerDom}>
        <p onClick={showFormF}>112312312312</p>
        <chartFrom ref={chartFromRef} onSetShowForm={showFormF} />
      </div>
    );
  },
});
