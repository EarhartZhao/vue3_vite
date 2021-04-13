import { axios, cfg } from '../axios/index'

const URL = cfg.HW_URL;
const HWLOGIN = {
  loginByPassword(data) {
    // domain, username, password
    return axios.post(`${URL}/login/loginByPassword`, data);
  },
  loginByMFA(data) {
    // domain, username, password, MFACode, huaweiId
    return axios.post(`${URL}/login/loginByMFA`, data);
  },
};

export default HWLOGIN;
