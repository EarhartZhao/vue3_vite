import { store } from "@store/index";
import router from "@utils/router/index";
import { message } from "ant-design-vue";
import { computed, reactive } from "vue";

export const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入用户密码",
    },
  ],
});

export const roleData = [
  {
    roleName: "用户",
    role: "user",
  },
  {
    roleName: "超管",
    role: "super",
  },
];

export const formData = reactive({
  form: {
    username: "123",
    password: "123",
  },
});

export const saveUserData = (userData: any, callback: Function) => {
  const token = userData.token || "";
  const userName = userData.userName || "";
  store.commit("router/clearProducts");
  store.commit("user/setState", {
    token,
    userName,
  });

  // message.success("登录成功，正在跳转中", 2).then(
  //   () => callback(),
  //   () => {}
  // );
  message.success("登录成功，正在跳转中", 2, callback());
};

export const turnPage = (path: string) => {
  router({ path: path }).routerPush();
};
