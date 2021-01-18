import storeState from '/@types/store/index'
import stronge from '/@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

const state: StoreOptions<storeState> = {
  routers: [],
};

const getters = {
  getRouters() {},
};

const actions = {
  getAllProducts() {},
};

const mutations = {
  setProducts() {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
