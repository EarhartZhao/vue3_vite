import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: "home",
  setup() {
    // const store = useStore();

    return () => (
      <>
        <h1>Home</h1>
        <h1>This is home page</h1>
      </>
    );
  },
});
