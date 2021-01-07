const isApple = (): boolean => {
  const u = navigator.userAgent;
  const ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  const iPhone = u.indexOf("iPhone") > -1; // 是否为iPhone或者QQHD浏览器
  const iPad = u.indexOf("iPad") > -1; // 是否iPad
  return ios || iPhone || iPad;
};

// const store = {
//   version: "1.0.0",
//   local: isApple() ? window.localStorage : window.sessionStorage,
// };

export default class store {
  constructor() {}
}

// const browser = {
//   isApple() {
//     const u = navigator.userAgent
//     const ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
//     const iPhone = u.indexOf('iPhone') > -1 // 是否为iPhone或者QQHD浏览器
//     const iPad = u.indexOf('iPad') > -1 // 是否iPad
//     return ios || iPhone || iPad
//   }
// }

// const isApple = browser.isApple()

// const store = {
//   version: '1.0.0',
//   local: window.localStorage,
//   session: {
//     local: isApple ? window.localStorage : window.sessionStorage,
//     sess: true
//   }
// }

// const serialize = val => JSON.stringify(val)
// const deserialize = val => {
//   if (typeof val !== 'string') {
//     return undefined
//   }
//   try {
//     return JSON.parse(val)
//   } catch (e) {
//     return val || undefined
//   }
// }

// const api = {
//   set(key, val) {
//     if (this.cannot) {
//       return
//     }
//     if (val === undefined) {
//       return this.remove(key)
//     }
//     this.local.setItem(key, serialize(val))
//     return val
//   },
//   get(key, def) {
//     if (this.cannot) {
//       return def
//     }
//     const val = deserialize(this.local.getItem(key))
//     return (val === undefined ? def : val)
//   },
//   has(key) {
//     return this.get(key) !== undefined
//   },
//   remove(key) {
//     if (this.cannot) {
//       return
//     }
//     this.sess ? sessionStorage.removeItem(key) : localStorage.removeItem(key)
//   },
//   clear() {
//     this.sess ? sessionStorage.clear() : localStorage.clear()
//   },
//   getAll() {
//     if (this.cannot) {
//       return null
//     }
//     const obj = {}
//     this.forEach((key, val) => {
//       obj[key] = val
//     })
//     return obj
//   },
//   forEach(callback) {
//     if (this.cannot) {
//       return
//     }
//     for (const i in this.local.length) {
//       const key = this.local.key(i)
//       callback(key, this.get(key))
//     }
//   }
// }

// Object.assign(store, api)
// Object.assign(store.session, api)

// try {
//   const testKey = '__key__'
//   store.set(testKey, testKey)
//   if (store.get(testKey, '') !== testKey) {
//     store.cannot = true
//   }
//   store.remove(testKey)
// } catch (e) {
//   store.cannot = true
// }
// export default store
