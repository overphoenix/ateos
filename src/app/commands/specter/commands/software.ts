const {
  app: { Subsystem, CliMainCommand }
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "spec",
        nargs: "*",
        help: "Specter's specification name(s)"
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
      },
      {
        name: "--git-user",
        type: String,
        help: "Git user"
      },
      {
        name: "--git-pat",
        type: String,
        help: "Git personal access token"
      }
    ]
  })
  async installSoftware(args: any, opts: any) {
    let r: ateos.realm.RealmManager | null = null;
    try {
      r = await this.parent.connectRealm({
        cwd: process.cwd(),
        progress: false
      });
      await r.observeNotifications("progress");
      r.notify(this, "progress", {
        text: "installing software"
      });
      const result = await r.runAndWait("specterSoftware", { spec: args.get('spec'), ...opts.getAll() });

      r.notify(this, "progress", {
        text: "complete",
        status: "stop"
      });

      // console.info(result);
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
