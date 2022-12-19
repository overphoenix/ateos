import { omit } from "@recalibratedsystems/common-cjs";

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
  async load(options: any) {
    await super.load(Configuration.configName, options);
  }

  loadSync(options: any) {
    super.loadSync(Configuration.configName, options);
  }

  /**
     * Saves configuration.
     * 
     * @param {string} cwd path where config should be saved
     */
  save(opts: { cwd: string, ext?: string, space?: string }) {
    if (!opts.ext) {
      opts.ext = ".json";
    }
    if (opts.ext === ".json" && !opts.space) {
      opts.space = "  ";
    }
    return super.save(ateos.isString(opts.cwd) ? aPath.join(opts.cwd, Configuration.configName) : Configuration.configName, omit(opts, ['cwd', 'ext']));
  }

  static async load(opts: { cwd: string }) {
    const config = new Configuration(opts);
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
