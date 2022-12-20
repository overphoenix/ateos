@ateos.task.Task("sshSoftware")
export default class extends ateos.realm.SSHTask {
  async main(sshOpts) {
    if (ateos.isArray(sshOpts.software)) {
      for (let si of sshOpts.software) {
        if (si.type === 'apt-upgrade') {
          try {
            let result = await this.ssh.exec('apt-get', ['--yes', '-q', 'update'], { options: { pty: true } });
            this.manager.notify(this, "progress", {
              text: `${this.hostkey(sshOpts)} [${si.type}] [ok] 'apt update'`,
              status: "succeed"
            });

            result = await this.ssh.exec('apt-get', ['--yes', '-q', '--allow-downgrades', '--allow-remove-essential', '--allow-unauthenticated', 'upgrade'], { options: { pty: true } });
            this.manager.notify(this, "progress", {
              text: `${this.hostkey(sshOpts)} [${si.type}] [ok] 'apt upgrade'`,
              status: "succeed"
            });
          } catch (err) {
            this.manager.notify(this, "progress", {
              text: `${this.hostkey(sshOpts)} [${si.type}] [fail]\n${err}`,
              status: "fail"
            });
          }
        }
      }
    }
  }
}
