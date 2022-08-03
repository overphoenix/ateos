class TestApp extends ateos.app.Application {
    run() {
        console.log(this.name);
        return 0;
    }
}

ateos.app.run(TestApp);
