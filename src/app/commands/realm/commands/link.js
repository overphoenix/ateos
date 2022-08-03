const {
  app: { Subsystem, CliMainCommand }
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    options: [
      {
        name: ["--unlink", "-U"],
        help: "Unlink realm"
      },
      {
        name: "--no-bin",
        help: "Skip creation of bin link(s)"
      },
      {
        name: "--bin-name",
        type: String,
        holder: "NAME",
        help: "Name of bin link"
      },
      {
        name: "--no-lib",
        help: "Skip creation of lib link"
      },
      {
        name: "--lib-name",
        type: String,
        holder: "NAME",
        help: "Name of lib link"
      }
    ]
  })
  async main(args, opts) {
    try {
      const realm = new ateos.realm.RealmManager({
        cwd: process.cwd()
      });
      await realm.connect({
        transpile: true
      });

      await realm.runAndWait("realmLink", {
        ...opts.getAll(),
        realm
      });

      return 0;
    } catch (err) {
      ateos.log.bright.red.error.noLocate(err);
      return 1;
    }
  }
}
