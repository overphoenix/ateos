describe("datetime", "utc", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("utc and local", () => {
        const m = ateos.datetime(Date.UTC(2011, 1, 2, 3, 4, 5, 6));
        m.utc();
        // utc
        assert.equal(m.date(), 2, "the day should be correct for utc");
        assert.equal(m.day(), 3, "the date should be correct for utc");
        assert.equal(m.hours(), 3, "the hours should be correct for utc");

        // local
        m.local();
        if (m.utcOffset() < -180) {
            assert.equal(m.date(), 1, "the date should be correct for local");
            assert.equal(m.day(), 2, "the day should be correct for local");
        } else {
            assert.equal(m.date(), 2, "the date should be correct for local");
            assert.equal(m.day(), 3, "the day should be correct for local");
        }
        const offset = Math.floor(m.utcOffset() / 60);
        const expected = (24 + 3 + offset) % 24;
        assert.equal(m.hours(), expected, `the hours (${m.hours()}) should be correct for local`);
        assert.equal(ateos.datetime().utc().utcOffset(), 0, "timezone in utc should always be zero");
    });

    it("creating with utc and no arguments", () => {
        const startOfTest = new Date().valueOf();
        const momentDefaultUtcTime = ateos.datetime.utc().valueOf();
        const afterMomentCreationTime = new Date().valueOf();

        assert.ok(startOfTest <= momentDefaultUtcTime, "ateos.datetime UTC default time should be now, not in the past");
        assert.ok(momentDefaultUtcTime <= afterMomentCreationTime, "ateos.datetime UTC default time should be now, not in the future");
    });

    it("creating with utc and a date parameter array", () => {
        let m = ateos.datetime.utc([2011, 1, 2, 3, 4, 5, 6]);
        assert.equal(m.date(), 2, "the day should be correct for utc array");
        assert.equal(m.hours(), 3, "the hours should be correct for utc array");

        m = ateos.datetime.utc("2011-02-02 3:04:05", "YYYY-MM-DD HH:mm:ss");
        assert.equal(m.date(), 2, "the day should be correct for utc parsing format");
        assert.equal(m.hours(), 3, "the hours should be correct for utc parsing format");

        m = ateos.datetime.utc("2011-02-02T03:04:05+00:00");
        assert.equal(m.date(), 2, "the day should be correct for utc parsing iso");
        assert.equal(m.hours(), 3, "the hours should be correct for utc parsing iso");
    });

    it("creating with utc without timezone", () => {
        let m = ateos.datetime.utc("2012-01-02T08:20:00");
        assert.equal(m.date(), 2, "the day should be correct for utc parse without timezone");
        assert.equal(m.hours(), 8, "the hours should be correct for utc parse without timezone");

        m = ateos.datetime.utc("2012-01-02T08:20:00+09:00");
        assert.equal(m.date(), 1, "the day should be correct for utc parse with timezone");
        assert.equal(m.hours(), 23, "the hours should be correct for utc parse with timezone");
    });

    it("cloning with utc offset", () => {
        const m = ateos.datetime.utc("2012-01-02T08:20:00");
        assert.equal(ateos.datetime.utc(m)._isUTC, true, "the local offset should be converted to UTC");
        assert.equal(ateos.datetime.utc(m.clone().utc())._isUTC, true, "the local offset should stay in UTC");

        m.utcOffset(120);
        assert.equal(ateos.datetime.utc(m)._isUTC, true, "the explicit utc offset should stay in UTC");
        assert.equal(ateos.datetime.utc(m).utcOffset(), 0, "the explicit utc offset should have an offset of 0");
    });

    it("weekday with utc", () => {
        assert.equal(
            ateos.datetime("2013-09-15T00:00:00Z").utc().weekday(), // first minute of the day
            ateos.datetime("2013-09-15T23:59:00Z").utc().weekday(), // last minute of the day
            "a UTC-ateos.datetime's .weekday() should not be affected by the local timezone"
        );
    });
});
