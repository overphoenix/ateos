const {
    is,
    error
} = ateos;

class TestApp extends ateos.app.Application {
    run() {
        const getters = ["name", "parent", "root", "owned"];
        let counter = 0;
        for (const getter of getters) {
            try {
                this[getter] = null;
            } catch (err) {
                if (err instanceof error.ImmutableException) {
                    counter++;
                } else {
                    console.log(err);
                }
            }
        }

        const props = [];
        for (const [name, value] of ateos.util.entries(this, { followProto: true })) {
            if (is.function(value)) {
                continue;
            }
            props.push(name);
        }

        console.log(counter === getters.length && props.length === 3); // _events, _eventsCount, _maxListeners

        return 0;
    }
}

ateos.app.run(TestApp);
