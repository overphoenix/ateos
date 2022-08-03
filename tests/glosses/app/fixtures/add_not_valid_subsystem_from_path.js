const {
    app,
    std
} = ateos;

class TestApp extends ateos.app.Application {
    async onConfigure() {
        try {
            this.addSubsystem({
                subsystem: std.path.join(__dirname, "not_valid_subsystem.js")
            });
        } catch (err) {
            console.log("incorrect subsystem");
        }
    }

    run() {
        return 0;
    }
}

app.run(TestApp);
