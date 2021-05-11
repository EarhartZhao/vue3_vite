import { axios, cfg } from '../axios/index'

const URL = cfg.BASE_URL;
const TABLE = {
  search(data) {
    return axios.get(`${URL}/table`, data);
  },
};

export default TABLE;
