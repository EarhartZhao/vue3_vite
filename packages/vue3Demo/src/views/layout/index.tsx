import '/@styleLayout/index.scss'

import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus'
import { defineComponent } from 'vue'

import AppMain from './appMain/index'
import Header from './header/index.vue'
import Menu from './menu/index.vue'

export default defineComponent({
  name: "Index",
  // setup() {
  //   return () => (
  //     <ElContainer class="main layout">
  //       <ElHeader>
  //         <Header />
  //       </ElHeader>
  //       <ElContainer class="layout_box">
  //         <ElAside>
  //           <Menu />
  //         </ElAside>
  //         <ElMain>
  //           <AppMain />
  //         </ElMain>
  //       </ElContainer>
  //     </ElContainer>
  //   );
  // },
  render() {
    return () => (
      <ElContainer class="main layout">
        <ElHeader>
          <Header />
        </ElHeader>
        <ElContainer class="layout_box">
          <ElAside>
            <Menu />
          </ElAside>
          <ElMain>
            <AppMain />
          </ElMain>
        </ElContainer>
      </ElContainer>
    );
  },
});
