const {
  app: { Subsystem, CliMainCommand }
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "group",
        type: String,
        help: "Nodes group"
      }
    ],
    options: [
      {
        name: "--privkey",
        type: String,
        help: "Private key path"
      },
      {
        name: "--passphrase",
        type: String,
        help: "Private key passphrase"
      }
    ]
  })
  async info(args: any, opts: any) {
    let r: ateos.realm.RealmManager | null = null;
    try {
      r = await this.parent.connectRealm({
        cwd: process.cwd()
      });
      await r.observeNotifications("progress");
      r.notify(this, "progress", {
        text: "checking ssh connection"
      });
      const result = await r.runAndWait("specterCheck", { group: args.get('group'), ...opts.getAll() });

      r.notify(this, "progress", {
        text: "complete",
        status: "stop"
      });

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
