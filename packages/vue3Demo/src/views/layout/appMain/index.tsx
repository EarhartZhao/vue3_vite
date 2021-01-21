import { computed, defineComponent, toRefs, Transition } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'

export default defineComponent({
  name: "AppMain",
  setup() {
    // const { icon, sizeNum } = toRefs(props);
    // const cachedViews: Array<string> = [];
    // const key: string = "";
    // const router = useRouter()
    const route = useRoute();
    const key = computed(() => route.fullPath);
    console.log("key -----------", key.value);
    return () => (
      <>
        {/* <template> */}
        <div class="appMain">
          {/* <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view route={key.value} />
            </keep-alive>
          </transition> */}
          {/* <Transition name="fade" mode="in-out">
            <RouterView />
          </Transition> */}
          {/* <router-view v-slot="{ Component }">
            <transition mode="in-out">
              <component is="{Component}" />
            </transition>
          </router-view> */}
          {/* <router-view></router-view> */}
          <RouterView />
        </div>
        {/* </template> */}
      </>
    );
  },
});
