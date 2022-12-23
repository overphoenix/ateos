import { isString, UnknownException } from "@recalibratedsystems/common-cjs";

@ateos.task.Task("specterRun")
export default class extends ateos.task.AdvancedTask {
  async main(opts/*: { spec?: string[] }*/) {
    this.result/*: any*/ = {};
    const specterInfo = await this.runAnotherTask("specterInfo");
    const nodeMap = new Map();
    for (const n of specterInfo.nodes) {
      nodeMap.set(n.host, n);
    }
    const parts = opts.command.split(".");
    const name = parts[0];
    const spec = specterInfo.specs[name];
    const taskName = spec.commands[parts[1]];
    if (!isString(taskName)) {
      throw new UnknownException(`Unknown task: ${taskName}`);
    }
    if (!opts.spec || opts.spec.length === 0 || opts.spec.includes(name)) {
      const observer = await ateos.task.runParallel(this.manager, spec.nodes.map((node) => {
        const nodeInfo = isString(node) ? nodeMap.get(node) : (isObject(node) ? node : {});
        return {
          task: taskName,
          args: nodeInfo
        };
      }), {
        privateKeyPath: opts.privkey,
        passphrase: opts.passphrase,
        gitUser: opts.gitUser,
        gitPat: opts.gitPat
      });

      const result = await observer.result;
      this.result[name] = result;
    }
  }
}
