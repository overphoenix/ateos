const {
    app
} = ateos;

class TestApp extends app.Application {
    async run() {
        console.log("main");
        await this.unloadSubsystem("hello");
        return 0;
    }
}

app.run(TestApp);
