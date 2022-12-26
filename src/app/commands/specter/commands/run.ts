const {
  app: { Subsystem, CliMainCommand }
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "task",
        type: String,
        help: "Specter task name"
      }
    ],
    options: [
      {
        name: "--group",
        type: String,
        required: true,
        help: "Nodes group name"
      },
      {
        name: "--privkey",
        type: String,
        help: "Private key path"
      },
      {
        name: "--passphrase",
        type: String,
        help: "Private key passphrase"
      },
      {
        name: "--git-user",
        type: String,
        help: "Git user"
      },
      {
        name: "--git-token",
        type: String,
        help: "Git personal access token"
      }
    ]
  })
  async run(args: any, opts: any, { rest }) {
    let r: ateos.realm.RealmManager | null = null;
    try {
      r = await this.parent.connectRealm({
        cwd: process.cwd(),
        progress: false
      });
      await r.observeNotifications("progress");
      const argv = ateos.minimist(rest);
      const result = await r.runAndWait("specterRun", { task: args.get('task'), ...opts.getAll(), argv });
      r.notify(this, "progress", {
        text: "complete",
        status: "stop"
      });
      console.info(ateos.data.yaml.encode(result));

      return 0;
    } catch (err) {
      if (!ateos.isNull(r)) {
        r.stopNotifications(err);
      } else {
        console.error(err);
      }
      return 1;
    }
  }
}
