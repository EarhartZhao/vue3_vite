
export type interceptAxiosProxyListStateType = "success" | "pending" | "error";

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

export const interceptAxiosProxy = (data: interceptAxiosProxyListInterface) => {
  return new Proxy(data, {
    get: function (obj, prop) {
      console.log('proxy get', obj, prop)
      // 默认行为是返回属性值
      return obj[prop];
    },
    // "set": function (oTarget, sKey, vValue) {
    //   if (sKey in oTarget) { return false; }
    //   return oTarget.setItem(sKey, vValue);
    // },
  });
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
