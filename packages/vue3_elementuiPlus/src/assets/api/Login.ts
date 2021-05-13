// import { axios, cfg } from '../axios/index'
import { axios, cfg } from '../axios/index'

const URL = cfg.BASE_URL;
const LOGIN = {
  login(data) {
    // username, password, role
    return axios.post(`${URL}/login`, data);
  },
};

export default LOGIN;
