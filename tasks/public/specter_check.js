@ateos.task.Task("specterCheck")
export default class extends ateos.task.AdvancedTask {
  async main(opts/*: { spec?: string[] }*/) {
    const result/*: any*/ = {};
    const specterInfo = await this.runAnotherTask("specterInfo");

    for (const [name, spec] of Object.entries(specterInfo.specs)) {
      if (!opts.spec || opts.spec.length === 0 || opts.spec.includes(name)) {
        const observer = await ateos.task.runParallel(this.manager, spec.nodes.map((node) => ({
          task: "sshCheck",
          args: node
        })), {
          privateKeyPath: opts.privkey,
          passphrase: opts.passphrase
        });

        result[name] = await observer.result;
      }
    }

    return result;
  }
}
