import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: "compTest",
  setup() {
    // const store = useStore();

    return () => (
      <>
        <div>
          <p>here is slot</p>
          <slot></slot>
        </div>
      </>
    );
  },
});
