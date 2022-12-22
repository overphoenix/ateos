import { arrify, isArray, isObject, isPropertyDefined, isPropertyOwned, isString } from "@recalibratedsystems/common-cjs";

@ateos.task.Task("sshSoftware")
export default class extends ateos.realm.SSHTask {
  async main(sshOpts) {
    if (ateos.isArray(sshOpts.software)) {
      for (let si of sshOpts.software) {
        if (si.type === 'apt-upgrade') {
          try {
            await this.sequenceOfExecCommands(sshOpts, si, [
              'apt-get update',
              'apt-get -y -qq --no-install-recommends --allow-downgrades --allow-remove-essential --allow-unauthenticated upgrade'
            ]);
            
          } catch (err) {
            this.manager.notify(this, "progress", {
              text: `${this.hostkey(sshOpts)} [${si.type}] [fail]\n${err}`,
              status: "fail"
            });
          }
        } else if (si.type === 'exec') {
          await this.sequenceOfExecCommands(sshOpts, si, si.execCommand)
        } else if (si.type === 'apt') {
          try {
            if (isArray(si.aptBefore)) {
              await this.sequenceOfExecCommands(sshOpts, si, si.aptBefore);
            }
            const appList = [];
            if (isArray(si.name)) {
              for (const name of si.name) {
                appList.push(this.formatAppName(si, name));
              }
            } else if (isString(si.name)) {
              appList.push(this.formatAppName(si, si.name));
            }

            const aptAfter = si.aptAfter ? arrify(si.aptAfter) : [];
            await this.sequenceOfExecCommands(sshOpts, si, [
              `apt-get -y -qq --no-install-recommends --allow-downgrades --allow-remove-essential --allow-unauthenticated install ${appList.join(" ")}`,
              ...aptAfter
            ]);
          } catch (err) {
            this.manager.notify(this, "progress", {
              text: `${this.hostkey(sshOpts)} [${si.type}] [${si.name}] [fail]\n${err}`,
              status: "fail"
            });
          }
        }
      }
    }
  }

  formatAppName(si, name) {
    if (isString(name)) {
      if (isString(si.aptVersion) && si.aptVersion.length > 0) {
        return `${name}=${si.aptVersion}`;
      } else {
        if (isObject(si.aptVersion) && isPropertyDefined(si.aptVersion, name)) {
          return `${name}=${si.aptVersion[name]}`
        }
        return name;
      }
    }
  }

  async sequenceOfExecCommands(sshOpts, si, commands) {
    const listOfCommands = arrify(commands);
    for (const cmd_ of listOfCommands) {
      try {
        const tmpl = ateos.templating.dot.compile(cmd_);
        const cmd = tmpl({ ...sshOpts.specEnv });
        let result = await this.ssh.execCommand(cmd, { cwd: '/root', execOptions: { tty: true } });
        if (result.stderr) {
          this.manager.notify(this, "progress", {
            text: `${this.hostkey(sshOpts)} [${si.type}] [${si.name}] [ok] '${cmd}'\n${result.stderr}`,
            status: "fail"
          });
        } else {
          this.manager.notify(this, "progress", {
            text: `${this.hostkey(sshOpts)} [${si.type}] [${si.name}] [ok] '${cmd}'`,
            status: "succeed"
          });
        }
      } catch (ex) {
        this.manager.notify(this, "progress", {
          text: `${this.hostkey(sshOpts)} [${si.type}] [${si.name}] [fail] ${cmd}\n${ex}`,
          status: "fail"
        });
      }
    }
  }
}
