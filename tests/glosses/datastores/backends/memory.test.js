const {
    datastore: { backend: { MemoryDatastore } }
} = ateos;

describe("datastore", "backend", "MemoryDatastore", () => {
    describe("interface", () => {
        require("./interface")({
            setup() {
                return new MemoryDatastore();
            },
            teardown() {
            }
        });
    });
});
