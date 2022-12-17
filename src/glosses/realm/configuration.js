const {
  path: aPath
} = ateos;

export default class Configuration extends ateos.configuration.GenericConfig {
  /**
     * Returns absolute path of configuration.
     */
  getPath() {
    return aPath.join(this.cwd, Configuration.configName);
  }

  /**
     * Loads configuration.
     */
  async load(options) {
    await super.load(Configuration.configName, options);
  }

  loadSync(options) {
    super.loadSync(Configuration.configName, options);
  }

  /**
     * Saves configuration.
     * 
     * @param {string} cwd path where config should be saved
     */
  save({ cwd, ...options } = {}) {
    if (!options.ext) {
      options.ext = ".json";
    }
    if (options.ext === ".json" && !options.space) {
      options.space = "  ";
    }
    return super.save(ateos.isString(cwd) ? aPath.join(cwd, Configuration.configName) : Configuration.configName, options);
  }

  static async load({ cwd } = {}) {
    const config = new Configuration({
      cwd
    });
    await config.load();
    return config;
  }

  static loadSync({ cwd } = {}) {
    const config = new Configuration({
      cwd
    });
    config.loadSync();
    return config;
  }

  static configName = aPath.join(".ateos", "config");

  static default = {};
}
