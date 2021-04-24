export interface state {
  permissionRouters?: Array<any>;
  currentRouter?: String;
}
export interface getters {
  getRouters(s: state): Array<any>;
}
export interface actions {}
export interface mutations {}
