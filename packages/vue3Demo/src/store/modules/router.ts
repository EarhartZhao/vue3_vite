import { storeGetters, storeState } from '/@types/store/index'
import stronge from '/@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

const state: storeState = {
  routers: stronge.get("routers") || [],
};

const getters: GetterTree<storeState, storeState> & storeGetters = {
  // getRouters: (state: storeState) => state.routers,
  getRouters(state: storeState) {
    return state.routers;
  },
};

const actions: ActionTree<storeState, storeState> = {
  getAllProducts(state: storeState) {},
};

const mutations: MutationTree<storeState> = {
  setProducts(state: storeState) {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
