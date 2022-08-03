export default class Sub3 extends ateos.app.Subsystem {
    onConfigure() {
        console.log("sub3 configure");
    }

    @ateos.noop
    onInitialize() {
        console.log("sub3 init");
    }

    onUninitialize() {
        console.log("sub3 uninit");
    }
}
