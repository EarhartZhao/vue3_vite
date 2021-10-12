import Mock from "./index";
// 登录
let Login = {
  token: "11111",
  userName: 'admin'
};

export default {
  "post|/login": (option: any) => {
    return Mock.successResp(Login);
  },
};
