import { isString, UnknownException } from "@recalibratedsystems/common-cjs";

@ateos.task.Task("specterCheck")
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

    const observer = await ateos.task.runParallel(this.manager, nodes.map((node) => {
      const nodeInfo = isString(node) ? nodeMap.get(node) : (isObject(node) ? node : {});
      return {
        task: "sshCheck",
        args: nodeInfo
      };
    }), {
      privateKeyPath: opts.privkey,
      passphrase: opts.passphrase
    });

    this.result = await observer.result;
  }
}
