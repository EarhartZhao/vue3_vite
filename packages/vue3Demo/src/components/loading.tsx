import '/@style/component/index.scss'

import { defineComponent } from 'vue'

export default defineComponent({
  name: "Loading",
  setup() {
    return () => (
      <>
        <div class="loadingBox">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </>
    );
  },
});
