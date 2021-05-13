import router from '@/router'
import cfg from '@config/index'
import { store } from '@store/index'
import { exitSystem } from '@utils/system/index'
import interceptHttpRequest from '@utils/timeout/interceptHttp'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

export const interceptHttp = interceptHttpRequest({
  throttle: 3000
})

// interceptHttp.request({})

export const intercept = (config) => {
  console.log('intercept config', config)
  return false;
}



// 配置axios
Object.assign(axios.defaults, {
  baseURL: cfg.BASE_URL,
  timeout: 600000,
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const whiteListAPI = []; // 白名单

// 拦截器
axios.interceptors.request.use(
  (config) => {
    intercept(config)
    console.log('come here')
    // source.cancel('Operation canceled by the user.')
    // if (
    //   config.url.indexOf(cfg.BASE_URL) > -1 ||
    //   config.url.indexOf(cfg.UPLOAD_URL) > -1
    // ) {
    //   let token = store.getters["user/getToken"] || "";
    //   config.headers.Authorization = token;
    // } else {
    // }
    // return config;
  },
  (err) => {
    // 请求错误时的动作
    Promise.reject(err);
  }
);

// 相应拦截器
axios.interceptors.response.use(
  (res) => {
    console.log("axios.interceptors.res", res);
    if (!res) {
      ElMessage(res.data.msg);
      return Promise.reject();
    }
    const url = res.config.url;
    if (url.indexOf(cfg.BASE_URL) > -1 || url.indexOf(cfg.UPLOAD_URL) > -1) {
      if (res.data && res.data.status === 0) {
        return res.data.data;
      } else {
        ElMessage(res.data.msg);
        return Promise.reject();
      }
    } else {
      //其他接口
      return res;
    }
  },
  (err) => {
    console.log("axios err", err);
    if (err.response && err.response.status == "401") {
      ElMessage.error("用户信息失效，请重新登录");
      exitSystem();
    } else if (err.response && err.response.status == "403") {
      ElMessage.error("没有此权限");
    } else {
      ElMessage.error("服务错误");
    }
  }
);

export { axios, cfg };
