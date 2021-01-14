import '/@style/component/index.scss'

import { defineComponent, toRefs } from 'vue'

import Logo from '../assets/logo.png'
import ImageDialog from './imageDialog'

export default defineComponent({
  name: "Image",
  props: {
    srcUrl: {
      type: String,
      default: "",
    },
    size: {
      type: Array,
      validator: (val: Array<number>) => !!val,
      default: [100, 100],
    },
    alt: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { srcUrl, size, alt } = toRefs(props);
    const handleSize: any = (size: Array<number>) => {
      let obj: any = {};
      switch (size.length) {
        case 1:
          obj.width = size[0];
          break;
        case 2:
          obj.width = size[0];
          obj.height = size[1];
          break;
      }
      return obj;
    };
    return () => (
      <>
        <div class="ImageBox" style={handleSize}>
          <img src={Logo} alt={alt} />
          <ImageDialog />
        </div>
      </>
    );
  },
});
