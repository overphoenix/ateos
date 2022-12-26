import { UnknownException } from "@recalibratedsystems/common-cjs";

@ateos.task.Task("specterRun")
export default class extends ateos.task.AdvancedTask {
  async main(opts) {
    this.result = {};
    const specterInfo = await this.runAnotherTask("specterInfo");
    const nodeMap = new Map();
    for (const n of specterInfo.nodes) {
      nodeMap.set(n.host, n);
    }

    let nodes;
    try {
      nodes = require(ateos.path.join(this.manager.cwd, ".specter", "ngroups", `${opts.group}.json`));
    } catch (ex) {
      throw new UnknownException(`Unknown nodes group: ${opts.group}`);
    }
    
    const taskInfo = specterInfo.tasks[opts.task];
    if (!taskInfo) {
      throw new UnknownException(`Unknown task: ${opts.task}`);
    }

    const observer = await ateos.task.runParallel(this.manager, nodes.map((node) => {
      const nodeInfo = ateos.isString(node) ? nodeMap.get(node) : (ateos.isObject(node) ? node : {});
      return {
        task: taskInfo.task,
        args: {
          ...nodeInfo,
          argv: opts.argv
        }
      };
    }), {
      privateKeyPath: opts.privkey,
      passphrase: opts.passphrase,
      gitUser: opts.gitUser,
      gitPat: opts.gitPat
    });

    this.result = await observer.result;
  }
}
