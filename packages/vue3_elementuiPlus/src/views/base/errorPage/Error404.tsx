import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: "App",
  setup() {
    // const store = useStore();

    return () => (
      <>
        <h1>Home</h1>
        <h1>This is 404 page</h1>
      </>
    );
  },
});
