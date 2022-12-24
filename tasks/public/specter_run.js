import { UnknownException } from "@recalibratedsystems/common-cjs";

@ateos.task.Task("specterRun")
export default class extends ateos.task.AdvancedTask {
  async main(opts/*: { task?: string[] }*/) {
    this.result/*: any*/ = {};
    const specterInfo = await this.runAnotherTask("specterInfo");
    const nodeMap = new Map();
    for (const n of specterInfo.nodes) {
      nodeMap.set(n.host, n);
    }

    const spec = specterInfo.specs[opts.spec];
    if (!ateos.isObject(spec)) {
      throw new UnknownException(`Unknown specification: ${opts.spec}`);
    }
    const taskInfo = specterInfo.tasks[opts.task];
    if (!taskInfo) {
      throw new UnknownException(`Unknown task: ${opts.task}`);
    }

    const observer = await ateos.task.runParallel(this.manager, spec.nodes.map((node) => {
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
