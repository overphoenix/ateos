const {
  app: { Subsystem, CliMainCommand },
  is
} = ateos;

export default class extends Subsystem {
  @CliMainCommand()
  async main(args, opts) {
    let ateosRealm = null;
    try {
      ateosRealm = await this.parent.connectRealm();
      await ateosRealm.observerNotifications("progress");
      ateosRealm.notify(this, "progress", {
        text: "initializing"
      });
      await ateosRealm.runAndWait("realmInit");
      ateosRealm.notify(this, "progress", {
        text: `realm initialization complete`,
        status: "succeed"
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
