const {
  app: { Subsystem, CliMainCommand },
  is
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "path",
        nargs: "?",
        help: "Project entry path"
      }
    ],
    options: [
      {
        name: ["-re", "--re"],
        help: "Interpret 'path' as regular expression"
      }
    ]
  })
  async build(args, opts) {
    let r = null;
    try {
      const path = this.parent.resolvePath(args, opts);
      r = await this.parent.connectRealm({
        cwd: process.cwd(),
        progress: false
      });
      await r.observerNotifications("progress")
      r.notify(this, "progress", {
        text: "building"
      });
      await r.runAndWait("build", {
        path
      });

      r.notify(this, "progress", {
        text: `building complete`,
        status: "succeed"
      });

      return 0;
    } catch (err) {
      if (!is.null(r)) {
        r.stopNotifications(err);
      } else {
        console.error(ateos.pretty.error(err));
      }
      return 1;
    }
  }
}
