const {
  app: { Subsystem, CliMainCommand },
  is
} = ateos;

export default class extends Subsystem {
  @CliMainCommand()
  async main(args, opts) {
    let rootRealm = null;
    try {
      rootRealm = await this.parent.connectRealm();
      await rootRealm.observerNotifications("progress");
      rootRealm.notify(this, "progress", {
        text: "initializing"
      });
      await rootRealm.runAndWait("realmInit");
      rootRealm.notify(this, "progress", {
        text: `realm initialization complete`,
        status: "succeed"
      });
      return 0;
    } catch (err) {
      if (!ateos.isNull(rootRealm)) {
        rootRealm.stopNotifications(err);
      } else {
        console.error(ateos.pretty.error(err));
      }
      return 1;
    }
  }
}
