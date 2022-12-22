@ateos.task.Task("specterSoftware")
export default class extends ateos.task.AdvancedTask {
  async main(opts/*: { cwd?: string, spec: string }*/) {
    const result/*: any*/ = {};
    const specterInfo = await this.runAnotherTask("specterInfo");

    for (const [name, spec] of Object.entries(specterInfo.specs)) {
      if (!opts.spec || opts.spec.length === 0 || opts.spec.includes(name)) {
        const observer = await ateos.task.runParallel(this.manager, spec.nodes.map((node) => {
          return {
            task: "sshSoftware",
            args: {
              ...node,
              specName: name,
              software: spec.software,
              specEnv: spec.env
            }
          };
        }), {
          privateKeyPath: opts.privkey,
          passphrase: opts.passphrase
        });

        result[name] = await observer.result;
      }
    }

    return result;
  }

  async undo(err/*: any*/) {
    this.manager.notify(this, "progress", {
      message: err.message,
      status: false
    });
  }
}
