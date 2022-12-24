@ateos.task.Task("sshCheck")
export default class extends ateos.realm.SSHTask {
  async initialize(sshOpts) {
    this.result = {};
    this.ssh = await this.connectSSH(sshOpts);
  }
}
