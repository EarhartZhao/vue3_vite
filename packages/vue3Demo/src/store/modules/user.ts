import stronge from '@utils/stronge'
import { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex'

import { commitVal, getterVal } from '../common'

const state = {
  token: stronge.get("token") || "",
  hwToken: stronge.get("hwToken") || "",
  userInfo: stronge.get("userInfo") || {},
};

const getters = {
  getState: (state: any, key: string) => getterVal(state, key),
  getToken: (state: any) => state.token,
  getHWToken: (state: any) => state.hwToken,
};

const actions = {
  // async getAllProducts({ commit:any, dispatch:any }) {},
};

const mutations = {
  setState(state: any, valueObj: object) {
    commitVal(state, valueObj);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
