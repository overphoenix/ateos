const {
    app
} = ateos;

class Hello extends app.Subsystem {
    onConfigure() {
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
        await this.loadSubsystem(new Hello());
        return 0;
    }
}

app.run(TestApp);
