/*
  拦截Axios请求(axios)，实现接口pending后统一处理接口。
  1. 调用接口时，传递一组接口的唯一值  (如果想要在跳转回页面时得到之前接口pending的数据，推荐传递页面的 name 值)
     传递接口路由，传递接口参数，默认为空
*/

import { AxiosRequestConfig, CancelTokenSource } from 'axios'

import { interceptAxiosObserve, interceptAxiosProxy, interceptAxiosProxyListDataInterface, interceptAxiosProxyListObjInterface } from './interceptAxiosProxy'

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
  isSaveResponseData?: boolean, // 是否缓存数据
  axiosSource?: CancelTokenSource,  //axios取消请求函数
}

const proxyOptions = (options: AxiosRequestConfig, throttle: number): interceptAxiosProxyListObjInterface => {
  let optionsObj: any = {}
  optionsObj.interceptAxiosId = options.interceptAxiosId;
  optionsObj.path = options.url;
  optionsObj.props = options.hasOwnProperty('data') ? options.data || '' : '';
  optionsObj.method = options.method;
  optionsObj.dateTime = Date.now();
  optionsObj.state = "pending";
  optionsObj.throttle = throttle;
  return optionsObj;
}

class interceptAxios {
  isSaveResponseData?: boolean;
  throttle?: number;
  axiosSource: CancelTokenSource;
  private list: object;
  private AxiosRequestROProxy: interceptAxiosProxyListDataInterface;

  constructor(options: InterceptAxiosOptionInterface) {
    this.isSaveResponseData = options.isSaveResponseData || true;
    this.throttle = options.throttle || 500;
    this.axiosSource = options.axiosSource;
    this.list = {};
    this.AxiosRequestROProxy = interceptAxiosProxy({})
    interceptAxiosObserve(this.AxiosRequestROFunc)
  }

  AxiosRequestROFunc = (config: interceptAxiosProxyListObjInterface) => {
    // this.axiosSource.cancel('interceptAxiosCancel')
    if (!this.list.hasOwnProperty(config.interceptAxiosId)) {
      this.list[config.interceptAxiosId] = [{ ...config }]
    } else {
      const sameListArr = this.sameListArr(config)
      if (sameListArr.length === 0) {  // 同组没有相同数据
        this.list[config.interceptAxiosId].push(config)
      } else {  // 节流，取消请求
        const intervalTime = config.dateTime - sameListArr[0].dateTime;
        console.log('intervalTime', intervalTime, intervalTime < this.throttle)
        if (intervalTime < this.throttle) {
          console.log('cancel request -----, ------', this.axiosSource)
          this.axiosSource.cancel('interceptAxiosCancel')
        }
      }

    }
  }

  private judegSame = (ele: interceptAxiosProxyListObjInterface, config: interceptAxiosProxyListObjInterface) => ele.path === config.path && ele.method === config.method && ele.props === config.props;
  private sameListArr = (config: interceptAxiosProxyListObjInterface) => this.list[config.interceptAxiosId].filter((ele: any) => this.judegSame(ele, config))

  response = (RO: AxiosRequestConfig, data: any): void => {

    const config = proxyOptions(RO, this.throttle)
    // console.log('response config', config)
    // console.log('response this.list', this.list)
    // console.log('response interceptAxiosId', this.list.hasOwnProperty(config.interceptAxiosId))

    if (!this.list.hasOwnProperty(config.interceptAxiosId)) return console.log('response no data');

    const sameListArr = this.sameListArr(config)

    // console.log('response sameListArr', sameListArr)
    if (sameListArr.length === 0) return console.log('response no same data');

    if (!this.isSaveResponseData) {  // 删除list缓存数据
      // console.log('response delete list')
      this.list[config.interceptAxiosId].filter((ele: any) => this.judegSame(ele, config))
    } else {  // 缓存数据 data
      // console.log('response save list')
      sameListArr[0].state = "done";
      sameListArr[0].saveData = data;
    }
    // console.log('response this.list', this.list)
  }

  request = (RO: AxiosRequestConfig): AxiosRequestConfig => {

    this.AxiosRequestROProxy.config = proxyOptions(RO, this.throttle)

    console.log('request this.AxiosRequestROProxy 1', this.AxiosRequestROProxy)
    console.log('request this.list 1', this.list)

    RO.cancelToken = this.axiosSource.token;
    // this.axiosSource.cancel('interceptAxiosCancel')

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




