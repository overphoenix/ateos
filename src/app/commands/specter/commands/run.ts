import YAML from "yaml";

const {
  app: { Subsystem, CliMainCommand }
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "command",
        type: String,
        help: "Specter's specification command name"
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
  async run(args: any, opts: any) {
    let r: ateos.realm.RealmManager | null = null;
    try {
      r = await this.parent.connectRealm({
        cwd: process.cwd(),
        progress: false
      });
      await r.observerNotifications("progress");
      const result = await r.runAndWait("specterRun", { command: args.get('command'), ...opts.getAll() });
      console.log(ateos.std.util.inspect(result, { depth: 5 }));
      // console.info(ateos.data.yaml.encode(result));

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
