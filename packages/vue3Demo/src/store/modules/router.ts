import router from '@router/index'
import { storeGetters, storeState } from '@types/store/index'
import stronge from '@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

const state: storeState = {
  permissionRouters: stronge.get("permissionRouters") || [],
  getCurrentRouter: stronge.get("getCurrentRouter") || "",
};

const getters: GetterTree<storeState, storeState> & storeGetters = {
  getRouters: (state: storeState): Array<any> => state.permissionRouters,
  getDefaultRouter: (state: storeState): string =>
    state.permissionRouters[0].path +
    "/" +
    state.permissionRouters[0].children[0].path,
  getCurrentRouter: (state: storeState): string => state.getCurrentRouter,
};

const actions: ActionTree<storeState, storeState> = {
  async getAllProducts({ commit, dispatch }) {},
};

const mutations: MutationTree<storeState> = {
  setProducts(state: storeState, router: Array<any>) {
    state.permissionRouters = router;
    router.length > 0
      ? stronge.remove("permissionRouters")
      : stronge.set("permissionRouters", router);
  },
  setCurrentRouter(state: storeState, currentRouter: String) {
    state.getCurrentRouter = currentRouter;
    router.push(currentRouter);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
