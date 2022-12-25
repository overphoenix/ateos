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
      message: "collecting info"
    });

    const r = new realm.RealmManager({ cwd });
    await r.connect({
      transpile: true
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

    let nodes;
    try {
      nodes = require(path.join(cwd, ".ateos", "nodes.specter.json"));
    } catch (ex) {
    }

    let pubkeys;
    let tasks;
    try {
      const specterInfo = require(path.join(cwd, "specter.json"));
      pubkeys = specterInfo.pubkeys;
      tasks = specterInfo.tasks;
    } catch (ex) {

    }

    this.result/*: {
      specs: any;
    } */ = {
      specs,
      nodes,
      pubkeys,
      tasks
    };

    this.manager.notify(this, "progress", {
      clean: true,
      status: true
    });
  }
}
