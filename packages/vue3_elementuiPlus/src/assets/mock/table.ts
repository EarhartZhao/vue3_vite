import Mock from "./index";
// 登录
let Table: any[] = [];

export default {
  "get|/table": (option: any) => {
    return Mock.successResp(Table);
  },
};
