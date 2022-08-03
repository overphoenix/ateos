const {
    module: { resolve }
} = ateos;

it("nonstring", () => {
    assert.throws(() => resolve(555));
});
