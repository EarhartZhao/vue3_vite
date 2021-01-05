import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: "iconfont",
  props:{
    icon:{
      type:String
    }
  },
  setup(props) {
    const { icon } = toRefs(props);
    // const {icon} = props
    return () => (
      <>
        <i class={`iconfont icon-${icon.value}`}></i>
      </>
    );
  },
});
