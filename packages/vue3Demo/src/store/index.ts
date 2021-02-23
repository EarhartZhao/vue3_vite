import { storeState } from '@types/store/index'
import { InjectionKey } from 'vue'
import { createLogger, createStore, useStore as baseUseStore, Store as VuexStore } from 'vuex'

import router from './modules/router'

const debug = process.env.NODE_ENV !== "production";

export const key: InjectionKey<VuexStore<storeState>> = Symbol();

export const store = createStore({
  modules: {
    router,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export const useStore = () => baseUseStore(key);
