const {
  std
} = ateos;

export default class Configuration extends ateos.configuration.GenericConfig {
  getPath() {
    return std.path.join(this.cwd, Configuration.configName);
  }

  async load() {
    return super.load(Configuration.configName);
  }

  async save() {
    return super.save(Configuration.configName, {
      space: "  "
    });
  }

  static async load(opts: { cwd: string }) {
    const config = new Configuration(opts);
    await config.load();
    return config;
  }

  static configName = "package.json";
}
