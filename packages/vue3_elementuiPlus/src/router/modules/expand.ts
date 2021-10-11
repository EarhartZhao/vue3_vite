import { Index } from './base'

const Expand_Table = () => import("@/views/main/expand/table.vue");
const Expand_Form = () => import("@/views/main/expand/form.vue");
const Expand_TestTimeout = () => import("@/views/main/expand/testTimeout.vue");

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
      path: "testTimeout",
      component: Expand_TestTimeout,
      name: "Expand_TestTimeout",
      meta: {
        title: "测试延迟",
        noCache: true,
        icon: "",
      },
    },
  ],
};

export default expandRouters;
