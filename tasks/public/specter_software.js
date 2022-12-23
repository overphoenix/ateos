import { isObject, isString } from "@recalibratedsystems/common-cjs";

@ateos.task.Task("specterSoftware")
export default class extends ateos.task.AdvancedTask {
  async main(opts/*: { cwd?: string, spec: string }*/) {
    this.result/*: any*/ = {};
    const specterInfo = await this.runAnotherTask("specterInfo");
    const nodeMap = new Map();
    for (const n of specterInfo.nodes) {
      nodeMap.set(n.host, n);
    }

    for (const [name, spec] of Object.entries(specterInfo.specs)) {
      if (!opts.spec || opts.spec.length === 0 || opts.spec.includes(name)) {
        const observer = await ateos.task.runParallel(this.manager, spec.nodes.map((node) => {
          const nodeInfo = isString(node) ? nodeMap.get(node) : (isObject(node) ? node : {});
          return {
            task: "sshSoftware",
            args: {
              ...nodeInfo,
              specName: name,
              software: spec.software,
              specEnv: spec.env
            }
          };
        }), {
          privateKeyPath: opts.privkey,
          passphrase: opts.passphrase,
          gitUser: opts.gitUser,
          gitPat: opts.gitPat
        });

        this.result[name] = await observer.result;
      }
    }
  }
}
