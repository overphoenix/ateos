module.exports = class Sub1 extends ateos.app.Subsystem {
    onConfigure() {
        console.log("sub1 configure");
    }

    onInitialize() {
        console.log("sub1 init");
    }

    onUninitialize() {
        console.log("sub1 uninit");
    }
};
