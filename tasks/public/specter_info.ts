import { readdir } from 'node:fs/promises';

const {
  error,
  is,
  fs,
  path,
  realm
} = ateos;

@ateos.task.Task("specterInfo")
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

  async main(opts: { cwd: string, common?: boolean, units?: boolean, tasks?: boolean/*, structFull = false*/ }) {
    if (!ateos.isString(opts.cwd)) {
      throw new error.NotValidException(`Invalid type of cwd: ${ateos.typeOf(opts.cwd)}`);
    }

    this.manager.notify(this, "progress", {
      message: "connecting to realm"
    });

    const all = (opts.common && opts.units && opts.tasks) || (!opts.common && !opts.units && !opts.tasks);

    const r = new realm.RealmManager({ cwd: opts.cwd });
    await r.connect({
      transpile: true
    });

    this.manager.notify(this, "progress", {
      message: "collecting info"
    });

    let specFiles = (await readdir(r.cwd)).filter((name) => name.endsWith('.spec.json'));
    const specs: any[] = [];
    for (const fileName of specFiles ) {
      try {
        specs.push(require(path.join(r.cwd, fileName)));
      } catch (ex) {
        continue;
      }
    }

    const result: {
      specs: any[];
    } = {
      specs
    }; 

    this.manager.notify(this, "progress", {
      clean: true,
      status: true
    });

    return result;
  }

  async undo(err) {
    this.manager.notify(this, "progress", {
      message: err.message,
      status: false
    });
  }
}
