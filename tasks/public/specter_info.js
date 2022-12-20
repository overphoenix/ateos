import { readdir } from "node:fs/promises";

const {
  error,
  path,
  realm
} = ateos;

@ateos.task.Task("specterInfo")
export default class extends ateos.task.AdvancedTask {
  async main(opts/*: { cwd?: string }*/) {
    const cwd = opts && opts.cwd ? opts.cwd : process.cwd();
    if (!ateos.isString(cwd)) {
      throw new error.NotValidException(`Invalid type of cwd: ${ateos.typeOf(cwd)}`);
    }

    this.manager.notify(this, "progress", {
      message: "connecting to realm"
    });

    const r = new realm.RealmManager({ cwd });
    await r.connect({
      transpile: true
    });

    this.manager.notify(this, "progress", {
      message: "collecting info"
    });

    const specFiles = (await readdir(cwd)).filter((name/*: string*/) => name.endsWith(".spec.json"));
    const specs/*: any*/ = {};
    for (const fileName of specFiles) {
      try {
        specs[fileName.substring(0, fileName.length - ".spec.json".length)] = require(path.join(cwd, fileName));
      } catch (ex) {
        continue;
      }
    }

    const result/*: {
      specs: any;
    } */ = {
      specs
    };

    this.manager.notify(this, "progress", {
      clean: true,
      status: true
    });

    return result;
  }

  async undo(err/*: any*/) {
    this.manager.notify(this, "progress", {
      message: err,
      status: false
    });
  }
}
