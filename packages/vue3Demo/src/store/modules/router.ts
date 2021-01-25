import { storeGetters, storeState } from '/@types/store/index'
import stronge from '/@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

const state: storeState = {
  permissionRouters: stronge.get("permissionRouters") || [],
};

const getters: GetterTree<storeState, storeState> & storeGetters = {
  getRouters: (state: storeState) => state.permissionRouters,
  // getRouters(state: storeState) {
  //   return state.routers;
  // },
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
