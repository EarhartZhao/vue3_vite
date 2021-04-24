import { Icon, Image } from '@comp/index'
import { defineComponent } from 'vue'

import CompTest from './compTest'

export default defineComponent({
  name: "home",
  setup() {
    // const store = useStore();
    const slot = {
      title: () => <p>I am slot</p>,
      default: () => <div>A</div>,
    };

    return () => (
      <>
        <h1>Home</h1>
        <h1>This is home page tsx</h1>
        <CompTest>{slot}</CompTest>
        <Image />
        <Icon icon="cache" />
      </>
    );
  },
});
