const {
    app
} = ateos;

class TestApp extends ateos.app.Application {
    run() {
        return 0;
    }

    async onUninitialize() {
        throw new ateos.error.RuntimeException("Something bad happend during uninitialization");
    }
}

app.run(TestApp);
