import YAML from "yaml";

const {
  app: { Subsystem, CliMainCommand }
} = ateos;

export default class extends Subsystem {
  @CliMainCommand({
    // arguments: [
    //   {
    //     name: "path",
    //     nargs: "?",
    //     help: "Project entry path"
    //   }
    // ],
    // options: [
    //   {
    //     name: ["-re", "--re"],
    //     help: "Interpret 'path' as regular expression"
    //   }
    // ]
  })
  async info(args: any, opts: any) {
    let r: ateos.realm.RealmManager | null = null;
    try {
      r = await this.parent.connectRealm({
        cwd: process.cwd(),
        progress: false
      });
      await r.observerNotifications("progress");
      r.notify(this, "progress", {
        text: "loading information"
      });
      const result = await r.runAndWait("specterInfo");

      r.notify(this, "progress", {
        text: "complete",
        status: "stop"
      });

      console.info('Specter project:\n---');
      console.info(`name: ${r.package.name}`);
      console.info(`version: ${r.package.version}`);
      console.info(`description: ${r.package.description}`);
      console.info();
      if (result.nodes && result.nodes.length > 0) {
        console.info('\Nodes:\n---');
        console.info(YAML.stringify(result.nodes));
      }

      if (Object.keys(result.pubkeys).length > 0) {
        console.info('\nPublic ssh keys:\n---');
        console.info(YAML.stringify(result.pubkeys));
      }
      if (Object.keys(result.specs).length > 0) {
        console.info('\nSpecifications:\n---');
        console.info(YAML.stringify(result.specs));
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
