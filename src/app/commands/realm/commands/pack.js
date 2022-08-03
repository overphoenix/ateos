const {
  app: { Subsystem, mainCommand },
  is
} = ateos;

export default class extends Subsystem {
  @mainCommand({
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
        default: ateos.system.env.tmpdir(),
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
    let rootRealm = null;
    try {
      rootRealm = await this.parent.connectRealm();

      await rootRealm.observerNotifications("progress")
      await rootRealm.runAndWait("realmPack", {
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
      if (!is.null(rootRealm)) {
        rootRealm.stopNotifications(err);
      } else {
        console.error(ateos.pretty.error(err));
      }
      return 1;
    }
  }
}
