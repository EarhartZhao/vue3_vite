export interface state {
  permissionRouters?: Array<any>;
  getCurrentRouter?: String;
}
export interface getters {
  getRouters(s: state): Array<any>;
}
export interface actions {}
export interface mutations {}
