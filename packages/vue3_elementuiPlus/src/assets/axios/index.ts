import router from '@/router'
import cfg from '@config/index'
import { store } from '@store/index'
import { exitSystem } from '@utils/system/index'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
// import interceptAxios from '@utils/timeout/interceptAxios'
import interceptAxios from 'intercept-axios'

// 配置axios
Object.assign(axios.defaults, {
  baseURL: cfg.BASE_URL,
  timeout: 600000,
});

const source = axios.CancelToken.source();

const whiteListAPI = []; // 白名单

export const interceptAxiosInstance = interceptAxios({ throttle: 2000 });

// 拦截器
axios.interceptors.request.use(
  (config) => {

    if (
      config.url.indexOf(cfg.BASE_URL) > -1 ||
      config.url.indexOf(cfg.UPLOAD_URL) > -1
    ) {
      let token = store.getters["user/getToken"] || "";
      config.headers.Authorization = token;
    } else {
      let token = store.getters["user/getToken"] || "";
      config.headers.Authorization = token;
    }

    // return config;
    return interceptAxiosInstance.request(config);

  },
  (err) => {
    // 请求错误时的动作
    Promise.reject(err);
  }
);

// 相应拦截器
axios.interceptors.response.use(
  (res) => {

    let sendData;

    if (!res) {
      ElMessage(res.data.msg);
      return Promise.reject();
    }
    const url = res.config.url;
    if (url.indexOf(cfg.BASE_URL) > -1 || url.indexOf(cfg.UPLOAD_URL) > -1) {
      if (res.data && res.data.status === 0) {
        sendData = res.data.data;
      } else {
        ElMessage(res.data.msg);
        return Promise.reject();
      }
    } else {
      //其他接口
      // sendData = res;
      sendData = res.data.data;
    }
    return interceptAxiosInstance.response(res.config, sendData);
    // return sendData;
  },
  (err) => {
    console.log('axios error', err)
    if (err.message === 'interceptAxiosCancel') return;

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
