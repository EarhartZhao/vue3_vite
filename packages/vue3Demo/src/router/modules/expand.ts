import { Index } from './base'

const Expand_Table = () => import("/@/views/main/expand/table");
const Expand_Form = () => import("/@/views/main/expand/form");

const expandRouters = {
  path: "/expand",
  name: "Expand",
  component: Index,
  redirect: "noredirect",
  meta: {
    title: "扩展",
    noCache: true,
    icon: "",
  },
  children: [
    {
      path: "Table",
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
  ],
};

export default expandRouters;
