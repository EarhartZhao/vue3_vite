import stronge from '@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

const state = {
  projectItem: stronge.get("projectItem") || "",
};

const getters = {
  getProjectItem: (state: any) => state.projectItem,
};

const actions = {
  // async getAllProducts({ commit:any, dispatch:any }) {},
};

const mutations = {
  setProjectItem(state: any, value: string) {
    state.projectItem = value;
    stronge.set("projectItem", value);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
