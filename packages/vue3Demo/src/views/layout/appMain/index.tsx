import { computed, defineComponent, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: "AppMain",
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  setup() {
    // const { icon, sizeNum } = toRefs(props);
    // const cachedViews: Array<string> = [];
    // const key: string = "";
    // const router = useRouter()
    const route = useRoute();
    const key = computed(() => route.fullPath);
    console.log("key -----------", key);
    return () => (
      <>
        <div class="appMain">
          <transition name="fade-transform" mode="out-in">
            {/* <keep-alive include={cachedViews}> */}
            <keep-alive>
              <router-view key={key} />
            </keep-alive>
          </transition>
        </div>
      </>
    );
  },
});
