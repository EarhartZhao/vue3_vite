import { AxiosRequestConfig } from 'axios'

export type interceptAxiosProxyListStateType = "pending" | "success" | "error";

interface interceptAxiosProxyListObjInterface {
  path: string,
  props: string,
  dateTime: number,
  state: interceptAxiosProxyListStateType,
  throttle?: string,
}

// export interface interceptAxiosProxyIdArrInterface {}

export interface interceptAxiosProxyListInterface {
  [propName: string]: Array<interceptAxiosProxyListObjInterface>
}

const observableArray = new Set();
export const observe = (fn: Function) => observableArray.add(fn);

export const interceptAxiosProxy = (data: AxiosRequestConfig) => {
  console.log('interceptAxiosProxy data', data)
  const handle = {
    get: (target, name, receiver) => {
      console.log('proxy get', target, name)
      return Reflect.get(target, name, receiver);
    },
    set: (target, key, value, receiver) => {
      console.log('proxy set target', target)
      console.log('proxy set key', key)
      console.log('proxy set value', value)
      //内部调用对应的 Reflect 方法
      const result = Reflect.set(target, key, value, receiver);
      //执行观察者队列
      observableArray.forEach(item => item());
      return result;
    }
  }
  return new Proxy(data, handle)
}

// const list = {
//   'id': [
//     {
//       'path': 11111,
//       'props': 222,
//       'dateTime': 123123,
//       'state': 'pending',
//       'throttle': null
//     }
//   ]
// }

// const idArr = [
//   'id1', 'id2', 'id3',
// ]
