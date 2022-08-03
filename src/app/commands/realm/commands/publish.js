const {
  app: { Subsystem, mainCommand },
  is
} = ateos;
export default class extends Subsystem {
  onConfigure() {
    this.log = this.root.log;
  }

  @mainCommand({
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
    let rootRealm = null;
    try {
      rootRealm = await this.parent.connectRealm();

      await rootRealm.observerNotifications("progress")
      await rootRealm.runAndWait("realmPublish", {
        realm: process.cwd(),
        ...opts.getAll(true)
      });

      return 0;
    } catch (err) {
      if (!is.null(rootRealm)) {
        rootRealm.stopNotifications(err);
      } else {
        console.error(ateos.pretty.error(err));
      }
      return 1;
    }
  }
}
