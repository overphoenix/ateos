const {
    is
} = ateos;

describe("process", "list processes", () => {
    const {
        process: { list }
    } = ateos;

    it("list()", async () => {
        const binName = ateos.isWindows ? "node.exe" : "node";
        const result = await list();

        assert.isTrue(result.some((x) => x.name.includes(binName)));
        assert.isTrue(result.every((x) => ateos.isNumber(x.pid) && ateos.isString(x.name) && ateos.isString(x.cmd)));

        (!ateos.isWindows) && assert.isTrue(result.every((x) => ateos.isString(x.cpu)));
    });
});
