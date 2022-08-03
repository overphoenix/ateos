describe("datetime", "min max", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("min", () => {
        const now = ateos.datetime();
        const future = now.clone().add(1, "month");
        const past = now.clone().subtract(1, "month");
        const invalid = ateos.datetime.invalid();

        assert.equal(ateos.datetime.min(now, future, past), past, "min(now, future, past)");
        assert.equal(ateos.datetime.min(future, now, past), past, "min(future, now, past)");
        assert.equal(ateos.datetime.min(future, past, now), past, "min(future, past, now)");
        assert.equal(ateos.datetime.min(past, future, now), past, "min(past, future, now)");
        assert.equal(ateos.datetime.min(now, past), past, "min(now, past)");
        assert.equal(ateos.datetime.min(past, now), past, "min(past, now)");
        assert.equal(ateos.datetime.min(now), now, "min(now, past)");

        assert.equal(ateos.datetime.min([now, future, past]), past, "min([now, future, past])");
        assert.equal(ateos.datetime.min([now, past]), past, "min(now, past)");
        assert.equal(ateos.datetime.min([now]), now, "min(now)");

        assert.equal(ateos.datetime.min([now, invalid]), invalid, "min(now, invalid)");
        assert.equal(ateos.datetime.min([invalid, now]), invalid, "min(invalid, now)");
    });

    it("max", () => {
        const now = ateos.datetime();
        const future = now.clone().add(1, "month");
        const past = now.clone().subtract(1, "month");
        const invalid = ateos.datetime.invalid();

        assert.equal(ateos.datetime.max(now, future, past), future, "max(now, future, past)");
        assert.equal(ateos.datetime.max(future, now, past), future, "max(future, now, past)");
        assert.equal(ateos.datetime.max(future, past, now), future, "max(future, past, now)");
        assert.equal(ateos.datetime.max(past, future, now), future, "max(past, future, now)");
        assert.equal(ateos.datetime.max(now, past), now, "max(now, past)");
        assert.equal(ateos.datetime.max(past, now), now, "max(past, now)");
        assert.equal(ateos.datetime.max(now), now, "max(now, past)");

        assert.equal(ateos.datetime.max([now, future, past]), future, "max([now, future, past])");
        assert.equal(ateos.datetime.max([now, past]), now, "max(now, past)");
        assert.equal(ateos.datetime.max([now]), now, "max(now)");

        assert.equal(ateos.datetime.max([now, invalid]), invalid, "max(now, invalid)");
        assert.equal(ateos.datetime.max([invalid, now]), invalid, "max(invalid, now)");
    });
});
