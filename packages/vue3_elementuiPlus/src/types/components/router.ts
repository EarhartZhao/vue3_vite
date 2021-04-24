export interface router {
  path: String;
  name: String;
  redirect?: String;
  component: any;
  meta?: {
    title?: String;
    noCache?: boolean;
    icon?: String;
  };
  children?: Array<any>;
}
