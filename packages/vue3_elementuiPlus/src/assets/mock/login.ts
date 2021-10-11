import Mock from "./index";
// 登录
let Login = {
  token: "11111",
  admin: '123123'
};

export default {
  "post|/login": (option: any) => {
    return Mock.successResp(Login);
  },
};
