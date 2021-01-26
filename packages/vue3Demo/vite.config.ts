import { defineConfig } from 'vite'

import config from './vite/index'

console.log("config", config);

export default defineConfig(config);

// import build from './vite/build'
// import optimizeDeps from './vite/optimizeDeps'
// import server from './vite/server'

// export default ({ command, mode }) => {
//   console.log("command", command);
//   console.log("mode", mode);

// };

// export default {
//   build,
//   optimizeDeps,
//   server,
// };
