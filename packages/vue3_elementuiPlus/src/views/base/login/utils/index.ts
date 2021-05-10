import { store } from '@store/index'
import router from '@utils/router/index'
import { ElMessage } from 'element-plus'
import { computed, reactive } from 'vue'

export const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
};

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
    username: "13821918251",
    password: "Deepthink1@3",
  },
});

export const saveUserData = (userInfo: any, callback: Function) => {
  const token = userInfo.token || "";
  const hwToken = userInfo.huaweiToken || "";
  store.commit("router/clearProducts");
  store.commit("user/setState", {
    token,
    hwToken,
    userInfo,
  });
  ElMessage({
    type: "success",
    message: "登录成功，正在跳转中",
    duration: 1000,
    onClose: () => {
      callback();
    },
  });
};

export const turnPage = (path: string) => {
  router({ path: path }).routerPush();
};
