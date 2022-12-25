const {
  app: { Subsystem, CliMainCommand },
  is
} = ateos;
export default class extends Subsystem {
  onConfigure() {
    this.log = this.root.log;
  }

  @CliMainCommand({
    options: [
      {
        name: "--auth",
        type: String,
        required: false,
        description: "Auth value like `username:password`, `token`, etc."
    },
    {
        name: ["--tag", "-T"],
        type: String,
        required: false,
        description: "The name of the release tag"
      },
    ]
  })
  async main(args, opts) {
    let ateosRealm = null;
    try {
      ateosRealm = await this.parent.connectRealm();

      await ateosRealm.observeNotifications("progress")
      await ateosRealm.runAndWait("realmPublish", {
        realm: process.cwd(),
        ...opts.getAll(true)
      });

      return 0;
    } catch (err) {
      if (!ateos.isNull(ateosRealm)) {
        ateosRealm.stopNotifications(err);
      } else {
        console.error(ateos.pretty.error(err));
      }
      return 1;
    }
  }
}
