const {
    app
} = ateos;

class AppSubsystem extends app.Subsystem {
    onConfigure() {
        console.log("configure");
    }

    onInitialize() {
        console.log("initialize");
    }

    onUninitialize() {
        console.log("uninitialize");
    }
}

class TestApp extends ateos.app.Application {
    async onConfigure() {
        this.addSubsystem({
            subsystem: new AppSubsystem(),
            name: "hello"
        });
        this.addSubsystem({
            subsystem: new AppSubsystem(),
            name: "hello"
        });
    }

    run() {
        return 0;
    }
}

app.run(TestApp);
