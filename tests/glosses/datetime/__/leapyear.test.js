describe("datetime", "leap year", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("leap year", () => {
        assert.equal(ateos.datetime([2010, 0, 1]).isLeapYear(), false, "2010");
        assert.equal(ateos.datetime([2100, 0, 1]).isLeapYear(), false, "2100");
        assert.equal(ateos.datetime([2008, 0, 1]).isLeapYear(), true, "2008");
        assert.equal(ateos.datetime([2000, 0, 1]).isLeapYear(), true, "2000");
    });
});
