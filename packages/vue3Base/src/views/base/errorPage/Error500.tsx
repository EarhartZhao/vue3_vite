import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: "App",
  setup() {
    // const store = useStore();

    return () => (
      <>
        <h1>Home</h1>
        <h1>This is 500 page</h1>
      </>
    );
  },
});
