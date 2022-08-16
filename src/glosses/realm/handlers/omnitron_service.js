const {
  is,
  fs,
  std,
  omnitron,
  realm
} = ateos;

export default class OmnitronServiceHandler extends realm.TypeHandler {
  constructor(pkg) {
    super(pkg, "Omnitron services", "omnitron.service");
  }

  async register(ateosConf, destPath) {
    await fs.mkdirp(this.manager.config.omnitron.SERVICES_PATH);

    const servicePath = std.path.join(this.manager.config.omnitron.SERVICES_PATH, ateosConf.raw.name);
    if (await fs.exists(servicePath)) {
      await fs.remove(servicePath);
    }

    await fs.symlink(destPath, servicePath, ateos.isWindows ? "junction" : undefined);

    await omnitron.dispatcher.registerService(ateosConf.raw.name);
  }

  async unregister(ateosConf) {
    await omnitron.dispatcher.unregisterService(ateosConf.raw.name);
    return fs.remove(std.path.join(this.manager.config.omnitron.SERVICES_PATH, ateosConf.raw.name));
  }

  list() {
    return fs.readdir(this.manager.config.omnitron.SERVICES_PATH);
  }

  checkAndRemove(name) {
    return false;
  }
}
