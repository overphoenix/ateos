const {
    is
} = ateos;

class TestApp extends ateos.app.Application {
    run() {
        const getters = ["name", "parent", "root", "owned"];
        let counter = 0;
        for (const getter of getters) {
            try {
                this[getter] = null;
            } catch (err) {
                if (err instanceof ateos.error.ImmutableException) {
                    counter++;
                } else {
                    console.log(err);
                }
            }
        }

        const expected = ["helper", "_events", "_eventsCount", "_maxListeners"];
        let isOk = true;
        for (const [name, value] of ateos.util.entries(this, { followProto: true })) {
            if (is.function(value)) {
                continue;
            }
            if (!expected.includes(name)) {
                isOk = false;
                break;
            }
        }

        console.log(counter === getters.length && isOk);

        return 0;
    }
}

ateos.app.run(TestApp, {
    useArgs: true
});
