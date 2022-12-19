import YAML from "yaml";

const {
  app: { Subsystem, CliMainCommand }
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
  async info(args: any, opts: any) {
    let r: ateos.realm.RealmManager | null = null;
    try {
      const path = this.parent.resolvePath(args, opts);
      r = await this.parent.connectRealm({
        cwd: process.cwd(),
        progress: false
      });
      await r.observerNotifications("progress");
      r.notify(this, "progress", {
        text: "loading"
      });
      const result = await r.runAndWait("specterInfo");

      r.notify(this, "progress", {
        text: "building complete",
        status: "succeed"
      });

      if (result.specs.length > 0) {
        console.info('Specter specifications:\n---');
        console.info(YAML.stringify(result.specs.map((spec: any) => {
          const result: {
            name: string;
            version: string;
            description: string;
            type: string;
            nodes?: any[];
          } = {
            name: r.package.name,
            version: r.package.version,
            description: r.package.description,
            type: spec.type
          };

          if (spec.nodes) {
            result.nodes = spec.nodes.map((n: any) => `${n.ip4} (${n.hostname})`);
          }

          return result;
        })));
      }

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
