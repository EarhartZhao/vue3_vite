import { build_config } from './BuildConfig'
import { server_config } from './ServerConfig'
import { share_config } from './SharedConfig'

export const config = Object.assign(
  {},
  build_config,
  server_config,
  share_config
);
