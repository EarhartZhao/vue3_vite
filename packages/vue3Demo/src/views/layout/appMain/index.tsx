import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: "AppMain",
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // const { icon, sizeNum } = toRefs(props);
    const cachedViews: Array<string> = [];
    const key: string = "";
    return () => (
      <>
        <div class="appMain">
          <transition name="fade-transform" mode="out-in">
            <keep-alive include={cachedViews}>
              <router-view key={key} />
            </keep-alive>
          </transition>
        </div>
      </>
    );
  },
});
