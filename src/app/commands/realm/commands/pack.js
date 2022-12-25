const {
  app: { Subsystem, CliMainCommand },
  is
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    options: [
      {
        name: ["--name", "-N"],
        type: String,
        help: "Archive name"
      },
      {
        name: ["--type"],
        type: String,
        default: ateos.nodejs.DEFAULT_EXT,
        help: "Archive type"
      },
      {
        name: ["--path", "-P"],
        type: String,
        default: ateos.env.tmpdir(),
        help: "Destination path"
      },
      {
        name: ["--tags", "-T"],
        nargs: "*",
        description: "Tags of realm artifact ('file', 'dir', 'common', ...)"
      },
      {
        name: ["--filter", "-F"],
        nargs: "*",
        help: "Filter(s)"
      }
    ]
  })
  async main(args, opts) {
    let ateosRealm = null;
    try {
      ateosRealm = await this.parent.connectRealm();

      await ateosRealm.observeNotifications("progress")
      await ateosRealm.runAndWait("realmPack", {
        realm: process.cwd(),
        name: opts.has("name")
          ? opts.get("name")
          : undefined,
        type: opts.get("type"),
        path: opts.get("path"),
        tags: opts.tags,
        filter: opts.get("filter").length > 0
          ? opts.get("filter")
          : undefined
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
