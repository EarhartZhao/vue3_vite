import { axios, cfg } from '../axios/index'

const URL = cfg.HW_URL;
const KBBASE = {
  upload(files) {
    return axios.post(`${URL}/file/upload.do`, { files });
  },
  saveUpload(files) {
    return axios.post(`${URL}/file/save.do`, { files });
  },
  download(id) {
    return axios.get(`${URL}/file/download.do?id=${id}`);
  },
  deleteFile(id) {
    return axios.post(`${URL}/file/delete.do`, { id });
  },
  generateAtlas(id) {
    return axios.post(`${URL}/file/generateAtlas.do`, { id });
  },
  search(data) {
    //page, pageSize, fileName
    return axios.post(`${URL}/file/search.do`, data);
  },
  bind(id, huaweiKgId) {
    return axios.post(`${URL}/file/bind.do`, { id, huaweiKgId });
  },
};

export default KBBASE;
