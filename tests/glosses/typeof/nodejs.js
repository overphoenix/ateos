const {
    typeOf,
    is
} = ateos;

const isNode = !ateos.isUndefined(process) && typeof process.release === "object" && process.release.name;

const describeIf = (condition) => condition ? describe : describe.skip;

describeIf(isNode)("Node Specific", () => {

    it("global", () => {
        assert(typeOf(global) === "global");
    });

    it("process", () => {
        assert(typeOf(process) === "process");
    });

});
