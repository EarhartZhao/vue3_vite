import { Icon, Image } from '/@comp/index'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import CompTest from './compTest'

export default defineComponent({
  name: "home",
  setup() {
    // const store = useStore();
    const slot = {
      foo: () => <p>I am slot</p>,
      default: () => <div>A</div>,
    };

    return () => (
      <>
        <h1>Home</h1>
        <h1>This is home page</h1>
        <CompTest v-slots={slot.foo}></CompTest>
        <Image />
        <Icon icon="cache" />
      </>
    );
  },
});
