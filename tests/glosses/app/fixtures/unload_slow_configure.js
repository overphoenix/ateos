const {
    app,
    promise
} = ateos;

class Hello extends app.Subsystem {
    async onConfigure() {
        await promise.delay(500);
        console.log("hello configure");
    }

    onInitialize() {
        console.log("hello init");
    }

    onUninitialize() {
        console.log("hello uninit");
    }
}

class TestApp extends app.Application {
    async run() {
        console.log("main");
        await Promise.all([
            this.loadSubsystem(new Hello(), { name: "hello" }),
            ateos.promise.delay(100).then(() => this.unloadSubsystem("hello"))
        ]);
        console.log("has", this.hasSubsystem("hello"));
        return 0;
    }
}

app.run(TestApp);
