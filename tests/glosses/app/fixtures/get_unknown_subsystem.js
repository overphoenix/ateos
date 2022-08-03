const {
    app
} = ateos;

class AppSubsystem extends app.Subsystem {
}

class TestApp extends ateos.app.Application {
    async onConfigure() {
        this.addSubsystem({
            description: "test subsystem",
            subsystem: new AppSubsystem()
        });
    }

    run() {
        const sysInfo = this.getSubsystemInfo("sys");
        console.log("sdfsdf");
        return 0;
    }
}

app.run(TestApp);
