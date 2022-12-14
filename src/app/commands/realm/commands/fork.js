const {
  app: { Subsystem, CliMainCommand }
} = ateos;


export default class extends Subsystem {
  @CliMainCommand({
    options: [
      {
        name: ["--name", "-N"],
        type: String,
        help: "Realm name (directory name)"
      },
      {
        name: ["--path", "-P"],
        type: String,
        default: ateos.path.join(ateos.env.home(), ".node_modules"),
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
      },
      {
        name: ["--skip-npm"],
        help: "Skip installation of npm packages"

      }
    ]
  })
  async main(args, opts) {
    try {
      const ateosRealm = await this.parent.connectRealm();
      await ateosRealm.runAndWait("realmFork", {
        ...opts.getAll(),
        realm: process.cwd()
      });

      return 0;
    } catch (err) {
      console.error(ateos.pretty.error(err));
      return 1;
    }
  }
}
