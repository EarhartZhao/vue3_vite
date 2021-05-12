/*
  拦截http请求(axios)，实现接口pending后统一处理接口。
  1. 调用接口时，传递一组接口的唯一值  (如果想要在跳转回页面时得到之前接口pending的数据，推荐传递页面的 name 值)
     传递接口路由，传递接口参数，默认为空
*/

interface InterceptHttpOption {
  throttle?: number, //是否开启节流，单位ms
}
interface InterceptHttpRequestOption {
  id: string,  //每组数据唯一标识
  path: string,  //接口
  props?: any,  //请求参数
}

export class interceptHttp {
  // id: string;
  // path: string;
  // props?: any;
  throttle?: number;
  private list: object;
  private idArr: Array<string>;

  constructor(options: InterceptHttpOption) {
    // this.id = options.id;
    // this.path = options.path;
    // this.props = this.turnString(options.props);
    this.throttle = options.throttle;
    this.list = {};
    this.idArr = [];  //id缓存
  }

  request = (RO: InterceptHttpRequestOption) => {
    if (!this.idArr.includes(RO.id)) {
      this.idArr.push(RO.id);
      this.list[RO.id] = [];
    }
    if (!this.throttle) { }
  }

  turnString = (data: any) => typeof (data) === 'string' ? data : String(data);
}


const throttle = (fn: Function, wait: number) => {  //节流函数
  let pre = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  }
}
