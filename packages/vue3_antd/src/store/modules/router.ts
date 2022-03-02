import { storeGetters, storeState } from '@types/store/index'
import stronge from '@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

const state: storeState = {
  permissionRouters: stronge.get("permissionRouters") || [],
  currentRouter: stronge.get("currentRouter") || "",
};

const getters: GetterTree<storeState, storeState> & storeGetters = {
  getRouters: (state: storeState): Array<any> => state.permissionRouters,
  getDefaultRouter: (state: storeState): string =>
    state.permissionRouters[0].path +
    "/" +
    state.permissionRouters[0].children[0].path,
  getCurrentRouter: (state: storeState) => state.currentRouter,
};

const actions: ActionTree<storeState, storeState> = {
  async getAllProducts({ commit, dispatch }) {},
};

const mutations: MutationTree<storeState> = {
  setProducts(state: storeState, router: Array<any>) {
    state.permissionRouters = router;
    stronge.set("permissionRouters", router);
  },
  clearProducts(state: storeState) {
    state.permissionRouters = [];
    stronge.remove("permissionRouters");
  },
  setCurrentRouter(state: storeState, currentRouter: string) {
    state.currentRouter = currentRouter;
    stronge.set("currentRouter", currentRouter);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
