
const lazy = ateos.lazify({
  BaseConfig: "./base",
  GenericConfig: "./generic",
  NpmConfig: "./npm"
}, exports, require);

export const load = async (path, options) => {
  const config = new lazy.GenericConfig(options);
  await config.load(path, options);
  return config;
};

export const loadSync = (path, options) => {
  const config = new lazy.GenericConfig(options);
  config.loadSync(path, options);
  return config;
};
