const state = {
  chartFromStatus: true,
  chartFromData: {},
};

const getters = {
  chartFromStatus: (state: any) => state.chartFromStatus,
  chartFromData: (state: any) => state.chartFromData,
};

const actions = {
  // async getAllProducts({ commit:any, dispatch:any }) {},
};

const mutations = {
  setChartFormStatus(state: any, setValue: Boolean) {
    state.chartFromStatus = setValue;
  },
  setChartFormData(state: any, setValue: Object) {
    state.chartFromData = setValue;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
