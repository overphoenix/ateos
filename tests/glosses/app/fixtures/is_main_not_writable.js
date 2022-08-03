class TestApp extends ateos.app.Application {
    run() {
        try {
            this.isMain = false;
            console.log("bad");
        } catch (err) {
            console.log("ok");
        }
        return 0;
    }
}

ateos.app.run(TestApp);
