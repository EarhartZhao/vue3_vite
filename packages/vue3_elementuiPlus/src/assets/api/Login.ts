// import { axios, cfg } from '../axios/index'
import { axios, cfg, intercept } from '../axios/intercept'

const URL = cfg.BASE_URL;
const LOGIN = {
  login(data) {
    // username, password, role
    return axios.post(`${URL}/login`, data);
    // intercept()
    // return intercept().post(`${URL}/login`, data);
    // return intercept('LOGIN', () => {
    //   axios.post(`${URL}/login`, data)
    // });
  },
};

export default LOGIN;
