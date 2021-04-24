import stronge from '@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

import { clearVal, commitVal, getterVal } from '../common'

const state = {
  token: stronge.get("token") || "",
  userInfo: stronge.get("userInfo") || {},
};

const getters = {
  getState: (state: any, key: string) => getterVal(state, key),
  getToken: (state: any) => state.token,
};

const actions = {
  // async getAllProducts({ commit:any, dispatch:any }) {},
};

const mutations = {
  setState(state: any, valueObj: object) {
    commitVal(state, valueObj);
  },
  clearUser(state: any) {
    for (const key in state) {
      clearVal(state, key);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
