const {
    app
} = ateos;

class App extends app.Application {
    main() {
        console.log("app running");
    }
}

app.run(App);
