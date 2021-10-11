import Mock from 'mockjs';

import Login from './login';
import Table from './table';

// 设置拦截的相应时间
// Mock.setup({
//   timeout: '200-600'
// });

let concatObj = Object.assign({}, Login, Table);

Mock.successResp = (obj:any) => {
  return {
    code: 0,
    msg: "success",
    data: obj
  }
}

// 注册所有的Mock服务
for (let key of Object.keys(concatObj)) {
  let protocol = key.split('|');
  Mock.mock(new RegExp(protocol[1]), protocol[0], concatObj[key]);
}

console.log('mock', Mock)

export default Mock;

