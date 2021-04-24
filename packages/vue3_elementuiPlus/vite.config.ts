import { defineConfig, UserConfigExport } from 'vite'

import config from './vite/index'

export default ({ command, mode }) => {
  // console.log("command", command);
  // console.log("mode", mode);
  return defineConfig(config);
};
