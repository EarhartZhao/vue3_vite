import { TIMEOUT } from '@api/index'
import { reactive } from 'vue'

export const data = reactive({
  search: {
    time: 1000,
    type: "api1",
  },
});

export const run = () => {
  let type = data.search.type == "api1" ? "search1" : "search2"
  TIMEOUT[type](data.search.time).then(r => {
    console.log(r);
  })
};
