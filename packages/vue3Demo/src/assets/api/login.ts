import { axios, cfg } from "../axios/index";
const URL = cfg.BASE_URL;
const LOGIN = {
  code(phone) {
    return axios.post(`${URL}/account/sendSms.do`, { phone });
  },
  veritycode(phone, code) {
    return axios.post(`${URL}/account/veritycode.do`, { phone, code });
  },
  registered(phone) {
    return axios.post(`${URL}/account/registered.do`, { phone });
  },
  login(username, password) {
    return axios.post(`${URL}/account/login.do`, { username, password });
  },
  loginByPhone(phone, code) {
    return axios.post(`${URL}/account/login.do`, { phone, code });
  },
  modifyPassword(data) {
    return axios.post(`${URL}/account/modifyPassword.do`, data);
  },
  completeUserInfo(data) {
    return axios.post(`${URL}/account/completeUserInfo.do`, data);
  },
  forgetPassword(data) {
    return axios.post(`${URL}/account/forgetPassword.do`, data);
  },
};

export default LOGIN;
