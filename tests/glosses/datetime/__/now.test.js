describe("datetime", "now", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("now", () => {
        const startOfTest = new Date().valueOf();
        const momentNowTime = ateos.datetime.now();
        const afterMomentCreationTime = new Date().valueOf();

        assert.ok(startOfTest <= momentNowTime, "ateos.datetime now() time should be now, not in the past");
        assert.ok(momentNowTime <= afterMomentCreationTime, "ateos.datetime now() time should be now, not in the future");
    });

    it("now - Date mocked", () => {
        // We need to test mocking the global Date object, so disable 'Read Only' jshint check
        /* jshint -W020 */
        const RealDate = Date;
        const customTimeMs = ateos.datetime("2015-01-01T01:30:00.000Z").valueOf();

        function MockDate() {
            return new RealDate(customTimeMs);
        }

        MockDate.now = function () {
            return new MockDate().valueOf();
        };

        MockDate.prototype = RealDate.prototype;

        global.Date = MockDate;

        try {
            assert.equal(ateos.datetime().valueOf(), customTimeMs, "ateos.datetime now() time should use the global Date object");
        } finally {
            global.Date = RealDate;
        }
    });

    it("now - custom value", () => {
        const customTimeStr = "2015-01-01T01:30:00.000Z";
        const customTime = ateos.datetime(customTimeStr, ateos.datetime.ISO_8601).valueOf();
        const oldFn = ateos.datetime.now;

        ateos.datetime.now = function () {
            return customTime;
        };

        try {
            assert.equal(ateos.datetime().toISOString(), customTimeStr, "ateos.datetime() constructor should use the function defined by ateos.datetime.now, but it did not");
            assert.equal(ateos.datetime.utc().toISOString(), customTimeStr, "ateos.datetime() constructor should use the function defined by ateos.datetime.now, but it did not");
        } finally {
            ateos.datetime.now = oldFn;
        }
    });

    it("empty object, empty array", () => {
        function assertIsNow(gen, msg) {
            const before = Number(new Date());
            const mid = gen();
            const after = Number(new Date());
            assert.ok(before <= Number(mid) && Number(mid) <= after, `should be now : ${msg}`);
        }
        assertIsNow(() => {
            return ateos.datetime();
        }, "ateos.datetime()");
        assertIsNow(() => {
            return ateos.datetime([]);
        }, "ateos.datetime([])");
        assertIsNow(() => {
            return ateos.datetime({});
        }, "ateos.datetime({})");
        assertIsNow(() => {
            return ateos.datetime.utc();
        }, "ateos.datetime.utc()");
        assertIsNow(() => {
            return ateos.datetime.utc([]);
        }, "ateos.datetime.utc([])");
        assertIsNow(() => {
            return ateos.datetime.utc({});
        }, "ateos.datetime.utc({})");
    });
});
