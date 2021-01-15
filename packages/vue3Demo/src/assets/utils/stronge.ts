const isApple = (): boolean => {
  const u = navigator.userAgent;
  const ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  const iPhone = u.indexOf("iPhone") > -1; // 是否为iPhone或者QQHD浏览器
  const iPad = u.indexOf("iPad") > -1; // 是否iPad
  return ios || iPhone || iPad;
};

class store {
  local: Storage;

  constructor() {
    this.local = isApple() ? window.localStorage : window.sessionStorage;
  }

  private serialize = (val: string) => JSON.stringify(val);
  private deserialize = (val: any) => {
    if (typeof val !== "string") {
      return undefined;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return val || undefined;
    }
  };
  set(key: string, val: any) {
    if (val === undefined) {
      return this.remove(key);
    }
    this.local.setItem(key, this.serialize(val));
    return val;
  }
  get(key: string, def?: any) {
    const val = this.deserialize(this.local.getItem(key));
    return val === undefined ? def : val;
  }
  has(key: string) {
    return this.get(key) !== undefined;
  }
  remove(key: string) {
    this.local.removeItem(key);
  }
  clear() {
    this.local.clear();
  }
}

export default new store();
