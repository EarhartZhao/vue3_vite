import router from '@/router'
import cfg from '@config/index'
import { store } from '@store/index'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

// 配置axios
Object.assign(axios.defaults, {
  baseURL: cfg.BASE_URL,
  timeout: 600000,
});

const whiteListAPI = []; // 白名单

// 拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.url.indexOf(cfg.BASE_URL) > -1) {
      let token = "";
      if (store.getters.token) {
        token = store.getters.token;
      } else {
        // 返回登陆页面 应去设置触发权限拦截
      }
      // 设置token
      // config.data.token = flowToken;
      // config.headers.Authorization = token;
    } else {
    }
    return config;
  },
  (err) => {
    // 请求错误时的动作
    ElLoading.service().close();
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
    if (url.indexOf(cfg.BASE_URL) > -1 || url.indexOf(cfg.HW_URL) > -1) {
      if (res.data && res.data.success) {
        console.log("res.data", res.data);
        return res.data.data;
      } else {
        ElMessage(res.data.message);
        return Promise.reject();
      }
    }
    // if (url.indexOf(cfg.HW_URL) > -1) {
    //   console.log("华为接口");
    //   return res.data;
    // }
    else {
      //其他接口
      return res;
    }
  },
  (err) => {
    ElLoading.service().close();
    if (err.response && err.response.status == "401") {
      ElMessage.error("用户信息失效，请重新登录");
      // store.dispatch("LogOut").then(() => {
      //   router.push({ path: "/" });
      // });
    } else if (err.response && err.response.status == "403") {
      ElMessage.error("没有此权限");
    } else {
      ElMessage.error("服务错误");
    }
  }
);

export { axios, cfg };
