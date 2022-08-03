const {
    app: { Subsystem, mainCommand }
} = ateos;

export default class extends Subsystem {
    @mainCommand()
    async main(args, opts) {
        try {
            const superRealm = await this.parent.connectRealm();
            const subRealm = new ateos.realm.RealmManager({
                cwd: process.cwd()
            });

            await superRealm.runAndWait("realmMerge", {
                superRealm,
                subRealm,
                symlink: true
            });

            return 0;
        } catch (err) {
            console.log(ateos.pretty.error(err));
            return 1;
        }
    }
}
