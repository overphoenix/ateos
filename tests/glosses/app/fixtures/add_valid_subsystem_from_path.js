const {
    app,
    std
} = ateos;

class TestApp extends ateos.app.Application {
    async onConfigure() {
        this.addSubsystem({
            subsystem: std.path.join(__dirname, "valid_subsystem.js")
        });
    }

    run() {
        return 0;
    }
}

app.run(TestApp);
