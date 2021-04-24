import { Index } from './base'

const Expand_Table = () => import("@/views/main/expand/table.vue");
const Expand_Form = () => import("@/views/main/expand/form.vue");
const Expand_Chart = () => import("@/views/main/expand/chart");
const Expand_Category = () => import("@/views/main/expand/category");
const Expand_RefDemo = () => import("@/views/main/expand/refDemo.vue");

const expandRouters = {
  path: "/expand",
  name: "Expand",
  component: Index,
  redirect: "/expand/table",
  meta: {
    title: "扩展",
    noCache: true,
    icon: "",
  },
  children: [
    {
      path: "table",
      component: Expand_Table,
      name: "Expand_Table",
      meta: {
        title: "表格",
        noCache: true,
        icon: "",
      },
    },
    {
      path: "form",
      component: Expand_Form,
      name: "Expand_Form",
      meta: {
        title: "表单",
        noCache: true,
        icon: "",
      },
    },
    {
      path: "chart",
      component: Expand_Chart,
      name: "Expand_Chart",
      meta: {
        title: "图表",
        noCache: true,
        icon: "",
      },
    },
    {
      path: "category",
      component: Expand_Category,
      name: "Expand_Category",
      meta: {
        title: "category",
        noCache: true,
        icon: "",
      },
    },
    {
      path: "refDemo",
      component: Expand_RefDemo,
      name: "Expand_RefDemo",
      meta: {
        title: "refDemo",
        noCache: true,
        icon: "",
      },
    },
  ],
};

export default expandRouters;
