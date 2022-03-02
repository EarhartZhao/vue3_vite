import base from './base'
import build from './build'
import optimizeDeps from './optimizeDeps'
import server from './server'

const config = Object.assign(base, { build, optimizeDeps, server });

// console.log("config", config);

export default config;
