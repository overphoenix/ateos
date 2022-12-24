const {
  error,
  is,
  fs,
  realm
} = ateos;

@ateos.task.Task("realmInfo")
export default class extends ateos.task.AdvancedTask {
  get arch() {
    const arch = process.arch;
    switch (arch) {
      case "ia32": return "x86";
      default: return arch;
    }
  }

  get os() {
    const platform = process.platform;
    switch (platform) {
      case "win32": return "win";
      default: return platform;
    }
  }

  async main({ cwd, common = false, units = false, tasks = false/*, structFull = false*/ } = {}) {
    if (!ateos.isString(cwd)) {
      throw new error.NotValidException(`Invalid type of cwd: ${ateos.typeOf(cwd)}`);
    }

    this.manager.notify(this, "progress", {
      message: "collecting to realm"
    });

    const all = (common && units && tasks) || (!common && !units && !tasks);

    const r = new realm.RealmManager({ cwd });
    await r.connect({
      transpile: true
    });

    this.manager.notify(this, "progress", {
      message: "collecting info"
    });

    this.result = {};

    if (common || all) {
      this.result.common = this._getCommonInfo(r);
    }

    if (tasks || all) {
      this.result.tasks = r.getTaskNames().sort();
    }

    if (units || all) {
      this.result.units = r.devConfig.getUnits();
    }

    this.manager.notify(this, "progress", {
      clean: true,
      status: true
    });
  }

  _getCommonInfo(ateosRealm) {
    const info = [];
    if (ateos.isString(ateosRealm.package.name)) {
      info.push({
        key: "Name:",
        value: ateosRealm.package.name
      });
    }

    if (ateos.isString(ateosRealm.package.version)) {
      info.push({
        key: "Version:",
        value: ateosRealm.package.version
      });
    }

    if (ateos.isString(ateosRealm.package.description)) {
      info.push({
        key: "Description:",
        value: ateosRealm.package.description
      });
    }

    if (ateos.isString(ateosRealm.package.author)) {
      info.push({
        key: "Author:",
        value: ateosRealm.package.author
      });
    }

    return info;
  }

  async undo(err) {
    this.manager.notify(this, "progress", {
      message: err.message,
      status: false
    });

    is.realm(this.destRealm) && await fs.remove(this.destRealm.cwd);
  }
}
