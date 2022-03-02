import { axios, cfg } from '../axios/index'

const URL = cfg.BASE_URL;
const TIMEOUT = {
  search1(time) {
    return axios.get(`${URL}/timeout/${time}`, { interceptAxiosId: 'TIMEOUT' });
  },
  search2(time) {
    return axios.get(`${URL}/timeout2/${time}`, { interceptAxiosId: 'TIMEOUT' });
  },
};

export default TIMEOUT;
