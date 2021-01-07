import { createLogger, createStore } from 'vuex'

import router from './modules/router'

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    router,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
