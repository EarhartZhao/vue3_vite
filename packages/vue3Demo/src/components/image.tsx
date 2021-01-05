import '/@style/component/index.scss'

import { defineComponent } from 'vue'

import Logo from '../assets/logo.png'
import ImageDialog from './imageDialog'

export default defineComponent({
  name: "Image",
  props: {},
  setup() {
    return () => (
      <>
        <div class="ImageBox">
          <img src={Logo} alt="" />
          <ImageDialog />
        </div>
      </>
    );
  },
});
