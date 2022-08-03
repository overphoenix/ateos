describe("datetime", "days in year", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("YYYYDDD should not parse DDD=000", () => {
        assert.equal(ateos.datetime(7000000, ateos.datetime.ISO_8601, true).isValid(), false);
        assert.equal(ateos.datetime("7000000", ateos.datetime.ISO_8601, true).isValid(), false);
        assert.equal(ateos.datetime(7000000, ateos.datetime.ISO_8601, false).isValid(), false);
    });
});
