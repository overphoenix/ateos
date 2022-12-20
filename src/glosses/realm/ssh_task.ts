import { omit } from "@recalibratedsystems/common-cjs";
import { inspect } from "node:util";
import { SSHConfig } from "../ssh/index";
const {
  task: { AdvancedTask },
  ssh: { HappySSH }
} = ateos;

export default class SSHTask extends AdvancedTask {
  protected ssh = new HappySSH();

  async initialize(sshConfig: any) {
    this.result = {};
    await this.ssh.connect(omit(sshConfig, ['hostname', 'auth']));
  }

  main(sshConfig: any) {
    this.manager.notify(this, "progress", {
      text: `[${this.hostkey(sshConfig)})] ok (${sshConfig.auth})`,
      status: "succeed"
    });
    this.result[this.hostkey(sshConfig)] = {
      status: 'ok'
    }
  }

  hostkey(sshConfig: any): string {
    return `[${sshConfig.specName}] [${sshConfig.host}] [${sshConfig.hostname}] [${this.observer.taskName}]`;
  }

  uninitialize() {
  }

  error(err: any, sshConfig: SSHConfig): void {
    this.manager.notify(this, "progress", {
      text: `${this.hostkey(sshConfig)}] [error] (${err.message})`,
      status: "fail"
    });
    this.result[this.hostkey(sshConfig)] = {
      status: 'error',
      error: err.stack
    };
  }

  // notify(stream, params) {
  //   // if (is.fastLocalStream(stream)) {
  //   //     stream.notify({
  //   //         gui: false,
  //   //         onLast: true,
  //   //         title: params.task,
  //   //         filter: null,
  //   //         message: `${this.manager.package.name}.${params.id}`
  //   //     });
  //   // }
  // }

  // notifyError(stream, params) {
  //   if (is.fastLocalStream(stream)) {
  //     const notify = fast.extension.notify.onError({
  //       title: `${this.manager.package.name}.${params.id}`,
  //       message: (error) => error.message
  //     });
  //     stream.on("error", (err) => {
  //       try {
  //         notify(err);
  //       } catch (notifyErr) {
  //         console.warn(`Could not notify about an error due to: ${notifyErr.message}`);
  //         console.error(err.stack || err.message);
  //       }
  //     });
  //   }
  // }
}
