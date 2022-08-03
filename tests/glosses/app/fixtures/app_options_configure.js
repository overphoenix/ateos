const {
    app
} = ateos;

const opts = {
    a: 1,
    b: "opt",
    c: {
        d: new Date()
    }
};

class App extends app.Application {
    configure(options) {
        console.log(ateos.is.deepEqual(options, opts));
    }
}

app.run(App, {
    useArgs: process.env.WITH_ARGS === "yes",
    version: "1.0.0",
    ...opts
});
