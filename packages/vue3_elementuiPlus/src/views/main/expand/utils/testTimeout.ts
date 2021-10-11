import { TIMEOUT } from '@api/index'
import { interceptAxiosInstance } from '@assets/axios/index'
import { reactive } from 'vue'

export const timeoutData = reactive({
  search: {
    time: 1000,
    type: "api1",
    success: false
  },
  searchList: [],
  list: {}
});

export const run = () => {
  let config = { ...timeoutData.search }
  let type = timeoutData.search.type == "api1" ? "search1" : "search2"
  TIMEOUT[type](timeoutData.search.time).then(r => {
    config.success = true;
    console.log(r);
    getList()
  })
  timeoutData.searchList.push(config);
};

export const clear = () => {
  timeoutData.searchList = []
}

export const getList = () => {
  timeoutData.list = interceptAxiosInstance.interceptAxiosList()
  console.log('timeoutData.list', timeoutData.list)
}
