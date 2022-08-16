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

    const result = {};

    if (common || all) {
      result.common = this._getCommonInfo(r);
    }

    if (tasks || all) {
      result.tasks = r.getTaskNames().sort();
    }

    if (units || all) {
      result.units = r.devConfig.getUnits();
    }

    this.manager.notify(this, "progress", {
      clean: true,
      status: true
    });

    return result;
  }

  _getCommonInfo(rootRealm) {
    const info = [];
    if (ateos.isString(rootRealm.package.name)) {
      info.push({
        key: "Name:",
        value: rootRealm.package.name
      });
    }

    if (ateos.isString(rootRealm.package.version)) {
      info.push({
        key: "Version:",
        value: rootRealm.package.version
      });
    }

    if (ateos.isString(rootRealm.package.description)) {
      info.push({
        key: "Description:",
        value: rootRealm.package.description
      });
    }

    if (ateos.isString(rootRealm.package.author)) {
      info.push({
        key: "Author:",
        value: rootRealm.package.author
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
