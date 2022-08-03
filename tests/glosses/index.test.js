describe("Ateos common", () => {
    describe("identity", () => {
        it("should return the first argument", () => {
            expect(ateos.identity(1, 2, 3)).to.be.equal(1);
        });
    });

    describe("noop", () => {
        it("should return nothing", () => {
            expect(ateos.noop(1, 2, 3)).to.be.undefined();
        });
    });
});

