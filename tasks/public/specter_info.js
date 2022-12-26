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

    let nodes;
    try {
      nodes = require(path.join(cwd, ".specter", "nodes.json"));
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

    this.result = {
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
