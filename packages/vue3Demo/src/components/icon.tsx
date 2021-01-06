import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: "iconfont",
  props: {
    icon: {
      type: String,
      default: "",
    },
    sizeNum: {
      type: Number,
      default: 16,
    },
  },
  setup(props) {
    const { icon, sizeNum } = toRefs(props);
    return () => (
      <>
        <i
          class={`iconfont icon-${icon.value}`}
          style={`font-size:${sizeNum.value}px`}
        ></i>
      </>
    );
  },
});
