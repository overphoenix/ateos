const {
    app
} = ateos;

class AppSubsystem extends app.Subsystem {
}

class TestApp extends ateos.app.Application {
    async onConfigure() {
        this.addSubsystem({
            name: "sys1",
            description: "test subsystem",
            subsystem: new AppSubsystem()
        });
    }

    run() {
        const sysInfo = this.getSubsystemInfo("sys1");
        console.log(sysInfo.description);
        return 0;
    }
}

app.run(TestApp);
