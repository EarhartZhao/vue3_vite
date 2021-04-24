import { axios, cfg } from '../axios/index'

const URL = cfg.BASE_URL;
const LOGIN = {
  login(data) {
    // username, password, role
    return axios.post(`${URL}/account/login.do`, data);
  },
  completeUserInfo(data) {
    return axios.post(`${URL}/account/completeUserInfo.do`, data);
  },
  forgetPassword(data) {
    return axios.post(`${URL}/account/forgetPassword.do`, data);
  },
};

export default LOGIN;
