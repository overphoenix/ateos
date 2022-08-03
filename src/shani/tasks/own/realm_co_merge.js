const {
    cli: { style },
    error,
    is,
    fast,
    fs,
    path,
    realm
} = adone;

@adone.task.task("realmCoMerge")
export default class extends realm.BaseTask {
    async main({ superRealm } = {}) {
        await superRealm.runAndWait("registerCliCommand", {
            cmd: {
                name: "shani",
                description: "Test framework",
                subsystem: this.manager.getPath("lib")
            }
        });
    }
}
