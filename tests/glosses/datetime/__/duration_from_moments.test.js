describe("datetime", "duration from moments", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("pure year diff", () => {
        const m1 = ateos.datetime("2012-01-01T00:00:00.000Z");
        const m2 = ateos.datetime("2013-01-01T00:00:00.000Z");

        assert.equal(ateos.datetime.duration({ from: m1, to: m2 }).as("years"), 1, "year ateos.datetime difference");
        assert.equal(ateos.datetime.duration({ from: m2, to: m1 }).as("years"), -1, "negative year ateos.datetime difference");
    });

    it("month and day diff", () => {
        const m1 = ateos.datetime("2012-01-15T00:00:00.000Z");
        const m2 = ateos.datetime("2012-02-17T00:00:00.000Z");
        const d = ateos.datetime.duration({ from: m1, to: m2 });

        assert.equal(d.get("days"), 2);
        assert.equal(d.get("months"), 1);
    });

    it("day diff, separate months", () => {
        const m1 = ateos.datetime("2012-01-15T00:00:00.000Z");
        const m2 = ateos.datetime("2012-02-13T00:00:00.000Z");
        const d = ateos.datetime.duration({ from: m1, to: m2 });

        assert.equal(d.as("days"), 29);
    });

    it("hour diff", () => {
        const m1 = ateos.datetime("2012-01-15T17:00:00.000Z");
        const m2 = ateos.datetime("2012-01-16T03:00:00.000Z");
        const d = ateos.datetime.duration({ from: m1, to: m2 });

        assert.equal(d.as("hours"), 10);
    });

    it("minute diff", () => {
        const m1 = ateos.datetime("2012-01-15T17:45:00.000Z");
        const m2 = ateos.datetime("2012-01-16T03:15:00.000Z");
        const d = ateos.datetime.duration({ from: m1, to: m2 });

        assert.equal(d.as("hours"), 9.5);
    });
});
