import { axios, cfg } from '../axios/index'

const URL = cfg.BASE_URL;
const TIMEOUT = {
  search(time) {
    return axios.get(`${URL}/timeout/${time}`);
  },
};

export default TIMEOUT;
