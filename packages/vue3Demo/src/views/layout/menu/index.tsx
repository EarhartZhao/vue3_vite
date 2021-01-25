import '/@styleLayout/menu/index.scss'

import { Icon, Image } from '/@comp/index'
import { useStore } from '/@store/index'
import { Router } from '/@types/components/router'
import { ElAside, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu } from 'element-plus'
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: "Menu",
  setup() {
    const store = useStore();
    const routers =
      computed(() => store.getters["router/getRouters"]).value || [];
    return { routers };
  },
  render() {
    const { routers } = this;
    const slots = {
      title: () => <span>导航一</span>,
      // title: () => {
      //   <span>
      //     <Icon icon="cache" />
      //     <span>导航一</span>
      //   </span>;
      // },
      foo: () => [
        <div>
          <Icon icon="cache" />
          <span>导航一</span>
        </div>,
      ],
    };
    // return (
    //   <ElMenu class="el-menu-vertical-demo">
    //     <ElSubmenu index="/home" v-slots={slots}>
    //       <ElMenuItemGroup>
    //         <ElMenuItem index="home/index">home1111</ElMenuItem>
    //       </ElMenuItemGroup>
    //     </ElSubmenu>
    //   </ElMenu>
    // );
    return (
      <ElMenu class="el-menu-vertical-demo">
        {routers.map((item: Router) => {
          <ElSubmenu index={item.path}>
            {/* {{
              title: () => {
                <span>
                  <Icon icon={item.meta.icon} />
                  <span>{item.meta.title}</span>
                </span>;
              },
            }} */}
            <ElMenuItemGroup>
              {item.children && item.children.length > 0
                ? item.children.map((ite: Router) => {
                    <ElMenuItem index={item.path + "/" + ite.path}>
                      {ite.meta.title}
                    </ElMenuItem>;
                  })
                : null}
            </ElMenuItemGroup>
          </ElSubmenu>;
        })}
      </ElMenu>
    );
  },
});
