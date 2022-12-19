import { SSHConfig, HappySSH } from "../ssh";

const {
  is,
  fast,
  task: { AdvancedTask }
} = ateos;

export default class SSHTask extends AdvancedTask {
  protected ssh = new HappySSH();

  initialize(sshConfig: SSHConfig) {
    return this.ssh.connect(sshConfig);
  }

  main() {
  }

  uninitialize() {
  }

  error(err: any): void {
    console.error(err);   
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
