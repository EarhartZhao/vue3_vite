import { store } from '@store/index'
import router from '@utils/router/index'

export const exitSystem = () => {
  store.commit("user/clearUser");
  router({ path: `/` }).routerPush();
};
