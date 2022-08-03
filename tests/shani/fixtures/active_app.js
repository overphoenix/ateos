class TestApp extends ateos.app.Application {
    configure() {
        console.log("0");
    }

    initialize() {
        console.log("1");
    }

    main() {
        console.log("2");
        return 0;
    }

    uninitialize() {
        console.log("3");
    }
}

ateos.app.run(TestApp);
