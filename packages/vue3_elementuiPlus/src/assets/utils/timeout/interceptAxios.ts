/*
  拦截Axios请求(axios)，实现接口pending后统一处理接口。
  1. 调用接口时，传递一组接口的唯一值  (如果想要在跳转回页面时得到之前接口pending的数据，推荐传递页面的 name 值)
     传递接口路由，传递接口参数，默认为空
*/

import { AxiosRequestConfig, CancelTokenSource } from 'axios'

import { interceptAxiosProxy, observe } from './interceptAxiosProxy'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * @description interceptAxios插件 每组数据唯一标识
     */
    interceptAxiosId?: string;
  }
}

interface InterceptAxiosOptionInterface {
  throttle?: number, //是否开启节流，单位ms
  axiosSource?: CancelTokenSource,  //axios取消请求函数
}

class interceptAxios {
  // id: string;
  // path: string;
  // props?: any;
  throttle?: number;
  axiosSource: CancelTokenSource;
  private list: object;
  private idArr: Array<string>;
  private AxiosRequestRO: object;

  constructor(options: InterceptAxiosOptionInterface) {
    this.throttle = options.throttle || 500;
    this.axiosSource = options.axiosSource;
    this.list = {};
    this.idArr = [];  //id缓存
    this.AxiosRequestRO = interceptAxiosProxy({})
  }

  request = (RO: AxiosRequestConfig): AxiosRequestConfig => {
    // const AxiosRequestRO = interceptAxiosProxy(RO)  // 代理
    console.log('request this.AxiosRequestRO 1', this.AxiosRequestRO)
    this.AxiosRequestRO.url = RO.url;
    console.log('request this.AxiosRequestRO 2', this.AxiosRequestRO)
    const AxiosRequestROPrint = () => {
      console.log('AxiosRequestROPrint ------', this.AxiosRequestRO)
    }
    observe(AxiosRequestROPrint)
    if (!this.idArr.includes(RO.interceptAxiosId)) {
      this.idArr.push(RO.interceptAxiosId);
      this.list[RO.interceptAxiosId] = [];
    }
    if (!this.throttle) { }

    RO.cancelToken = this.axiosSource.token;
    // this.axiosSource.cancel('interceptAxiosCancel')
    console.log('ro', RO)

    // console.log('this.list', this.list['TIMEOUT'])

    // const data = {
    //   RO[interceptAxiosId]: [

    //   ]
    // }
    return RO;
  }

  private turnString = (data: any) => typeof (data) === 'string' ? data : String(data);
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

export default (options: InterceptAxiosOptionInterface) => new interceptAxios(options);




