import BaseConfig from "./base";
import GenericConfig from "./generic";
import NpmConfig from "./npm";

ateos.lazify({
  BaseConfig: "./base",
  GenericConfig: "./generic",
  NpmConfig: "./npm"
}, exports, require);

export const load = async (path: string, options: any) => {
  const config = new ateos.configuration.GenericConfig(options);
  await config.load(path, options);
  return config;
};

export const loadSync = (path: string, options: any) => {
  const config = new ateos.configuration.GenericConfig(options);
  config.loadSync(path, options);
  return config;
};

export interface IConfiguration {
  load: typeof load;
  loadSync: typeof loadSync;
  BaseConfig: typeof BaseConfig;
  GenericConfig: typeof GenericConfig;
  NpmConfig: typeof NpmConfig;
}
