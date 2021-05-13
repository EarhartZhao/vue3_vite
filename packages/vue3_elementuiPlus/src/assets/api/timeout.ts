import {} from '@utils/timeout/interceptHttp'

import { axios, cfg, intercept } from '../axios/intercept'

const URL = cfg.BASE_URL;
const TIMEOUT = {
  search(time) {
    return axios.get(`${URL}/timeout/${time}`);
  },
  searchIntercept(time) {
    return intercept.get(`${URL}/timeout/${time}`);
  },
};

export default TIMEOUT;
