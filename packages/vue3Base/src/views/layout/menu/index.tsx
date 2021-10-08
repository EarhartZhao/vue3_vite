// import '@styleLayout/menu/index.scss'

// import { Icon, Image } from '@comp/index'
// import { useStore } from '@store/index'
// import { Router } from '@types/components/router'
// import { Menu } from 'ant-design-vue'
// const { Item, SubMenu, ItemGroup } = Menu

// import { computed, defineComponent, reactive, ref } from 'vue'

// export default defineComponent({
//   name: "Menu",
//   setup() {
//     const store = useStore();
//     const routers =
//       computed(() => store.getters["router/getRouters"]).value || [];
//     return { routers };
//   },
//   onOpenChange(openKeys) {
//     const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
//     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//       this.openKeys = openKeys;
//     } else {
//       this.openKeys = latestOpenKey ? [latestOpenKey] : [];
//     }
//   },
//   render() {
//     const { routers } = this;
//     const slots = {
//       // title: () => (
//       //   <span>
//       //     <Icon icon="ceche" />
//       //     <span>123123</span>
//       //   </span>
//       // ),
//       default: () => (
//         <span>
//           <Icon icon="ceche" />
//           <span>123123</span>
//         </span>
//       ),
//       title: (item: any) => (
//         <span>
//           <Icon icon={item.meta.icon} />
//           <span>{item.meta.title}</span>
//         </span>
//       ),
//     };
//     const openKeys:Array<any> = []
//     return (
//       <Menu mode="inline" openKeys={openKeys} v-model-selectedKeys="selectedKeys" >
//         {routers.map((item: Router) => (
//           <SubMenu key={item.path}>
//             {slots}
//             {/* <ItemGroup> */}
//               {item.children && item.children.length > 0
//                 ? item.children.map((ite: Router) => (
//                     <Item key={item.path + "/" + ite.path}>
//                       {ite.meta.title}
//                     </Item>
//                   ))
//                 : null}
//             {/* </ItemGroup> */}
//           </SubMenu>
//         ))}
//       </Menu>
//     );
//   },
// });
