describe("datetime", "is valid", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("array bad month", () => {
        assert.equal(ateos.datetime([2010, -1]).isValid(), false, "month -1 invalid");
        assert.equal(ateos.datetime([2100, 12]).isValid(), false, "month 12 invalid");
    });

    it("array good month", () => {
        for (let i = 0; i < 12; i++) {
            assert.equal(ateos.datetime([2010, i]).isValid(), true, `month ${i}`);
            assert.equal(ateos.datetime.utc([2010, i]).isValid(), true, `month ${i}`);
        }
    });

    it("Feb 29 0000 is valid", () => {
        // https://github.com/moment/moment/issues/3358
        assert.ok(ateos.datetime({ year: 0, month: 1, date: 29 }).isValid(), "Feb 29 0000 must be valid");
        assert.ok(ateos.datetime({ year: 0, month: 1, date: 28 }).add(1, "d").isValid(), "Feb 28 0000 + 1 day must be valid");
    });

    it("array bad date", () => {
        const tests = [
            ateos.datetime([2010, 0, 0]),
            ateos.datetime([2100, 0, 32]),
            ateos.datetime.utc([2010, 0, 0]),
            ateos.datetime.utc([2100, 0, 32])
        ];

        for (const i in tests) {
            const m = tests[i];
            assert.equal(m.isValid(), false);
        }
    });

    it("h/hh with hour > 12", () => {
        assert.ok(ateos.datetime("06/20/2014 11:51 PM", "MM/DD/YYYY hh:mm A", true).isValid(), "11 for hh");
        assert.ok(ateos.datetime("06/20/2014 11:51 AM", "MM/DD/YYYY hh:mm A", true).isValid(), "11 for hh");
        assert.ok(ateos.datetime("06/20/2014 23:51 PM", "MM/DD/YYYY hh:mm A").isValid(), "non-strict validity 23 for hh");
        assert.ok(ateos.datetime("06/20/2014 23:51 PM", "MM/DD/YYYY hh:mm A").parsingFlags().bigHour, "non-strict bigHour 23 for hh");
        assert.ok(!ateos.datetime("06/20/2014 23:51 PM", "MM/DD/YYYY hh:mm A", true).isValid(), "validity 23 for hh");
        assert.ok(ateos.datetime("06/20/2014 23:51 PM", "MM/DD/YYYY hh:mm A", true).parsingFlags().bigHour, "bigHour 23 for hh");
    });

    it("array bad date leap year", () => {
        assert.equal(ateos.datetime([2010, 1, 29]).isValid(), false, "2010 feb 29");
        assert.equal(ateos.datetime([2100, 1, 29]).isValid(), false, "2100 feb 29");
        assert.equal(ateos.datetime([2008, 1, 30]).isValid(), false, "2008 feb 30");
        assert.equal(ateos.datetime([2000, 1, 30]).isValid(), false, "2000 feb 30");

        assert.equal(ateos.datetime.utc([2010, 1, 29]).isValid(), false, "utc 2010 feb 29");
        assert.equal(ateos.datetime.utc([2100, 1, 29]).isValid(), false, "utc 2100 feb 29");
        assert.equal(ateos.datetime.utc([2008, 1, 30]).isValid(), false, "utc 2008 feb 30");
        assert.equal(ateos.datetime.utc([2000, 1, 30]).isValid(), false, "utc 2000 feb 30");
    });

    it("string + formats bad date", () => {
        assert.equal(ateos.datetime("2020-00-00", []).isValid(), false, "invalid on empty array");
        assert.equal(ateos.datetime("2020-00-00", ["YYYY-MM-DD", "DD-MM-YYYY"]).isValid(), false, "invalid on all in array");
        assert.equal(ateos.datetime("2020-00-00", ["DD-MM-YYYY", "YYYY-MM-DD"]).isValid(), false, "invalid on all in array");
        assert.equal(ateos.datetime("2020-01-01", ["YYYY-MM-DD", "DD-MM-YYYY"]).isValid(), true, "valid on first");
        assert.equal(ateos.datetime("2020-01-01", ["DD-MM-YYYY", "YYYY-MM-DD"]).isValid(), true, "valid on last");
        assert.equal(ateos.datetime("2020-01-01", ["YYYY-MM-DD", "YYYY-DD-MM"]).isValid(), true, "valid on both");
        assert.equal(ateos.datetime("2020-13-01", ["YYYY-MM-DD", "YYYY-DD-MM"]).isValid(), true, "valid on last");

        assert.equal(ateos.datetime("12-13-2012", ["DD-MM-YYYY", "YYYY-MM-DD"]).isValid(), false, "month rollover");
        assert.equal(ateos.datetime("12-13-2012", ["DD-MM-YYYY", "DD-MM-YYYY"]).isValid(), false, "month rollover");
        assert.equal(ateos.datetime("38-12-2012", ["DD-MM-YYYY"]).isValid(), false, "day rollover");
    });

    it("string nonsensical with format", () => {
        assert.equal(ateos.datetime("fail", "MM-DD-YYYY").isValid(), false, "string 'fail' with format 'MM-DD-YYYY'");
        assert.equal(ateos.datetime("xx-xx-2001", "DD-MM-YYY").isValid(), true, "string 'xx-xx-2001' with format 'MM-DD-YYYY'");
    });

    it("string with bad month name", () => {
        assert.equal(ateos.datetime("01-Nam-2012", "DD-MMM-YYYY").isValid(), false, "'Nam' is an invalid month");
        assert.equal(ateos.datetime("01-Aug-2012", "DD-MMM-YYYY").isValid(), true, "'Aug' is a valid month");
    });

    it("string with spaceless format", () => {
        assert.equal(ateos.datetime("10Sep2001", "DDMMMYYYY").isValid(), true, "Parsing 10Sep2001 should result in a valid date");
    });

    it("invalid string iso 8601", () => {
        const tests = [
            "2010-00-00",
            "2010-01-00",
            "2010-01-40",
            "2010-01-01T24:01", // 24:00:00 is actually valid
            "2010-01-01T23:60",
            "2010-01-01T23:59:60"
        ];

        for (let i = 0; i < tests.length; i++) {
            assert.equal(ateos.datetime(tests[i], ateos.datetime.ISO_8601).isValid(), false, `${tests[i]} should be invalid`);
            assert.equal(ateos.datetime.utc(tests[i], ateos.datetime.ISO_8601).isValid(), false, `${tests[i]} should be invalid`);
        }
    });

    it("invalid string iso 8601 + timezone", () => {
        const tests = [
            "2010-00-00T+00:00",
            "2010-01-00T+00:00",
            "2010-01-40T+00:00",
            "2010-01-40T24:01+00:00",
            "2010-01-40T23:60+00:00",
            "2010-01-40T23:59:60+00:00",
            "2010-01-40T23:59:59.9999+00:00",
            "2010-01-40T23:59:59,9999+00:00"
        ];

        for (let i = 0; i < tests.length; i++) {
            assert.equal(ateos.datetime(tests[i], ateos.datetime.ISO_8601).isValid(), false, `${tests[i]} should be invalid`);
            assert.equal(ateos.datetime.utc(tests[i], ateos.datetime.ISO_8601).isValid(), false, `${tests[i]} should be invalid`);
        }
    });

    it("valid string iso 8601 - not strict", () => {
        const tests = [
            "2010-01-30 00:00:00,000Z",
            "20100101",
            "20100130",
            "20100130T23+00:00",
            "20100130T2359+0000",
            "20100130T235959+0000",
            "20100130T235959,999+0000",
            "20100130T235959,999-0700",
            "20100130T000000,000+0700",
            "20100130 000000,000Z"
        ];

        for (let i = 0; i < tests.length; i++) {
            assert.equal(ateos.datetime(tests[i]).isValid(), true, `${tests[i]} should be valid in normal`);
            assert.equal(ateos.datetime.utc(tests[i]).isValid(), true, `${tests[i]} should be valid in normal`);
        }
    });

    it("valid string iso 8601 + timezone", () => {
        const tests = [
            "2010-01-01",
            "2010-01-30",
            "2010-01-30T23+00:00",
            "2010-01-30T23:59+00:00",
            "2010-01-30T23:59:59+00:00",
            "2010-01-30T23:59:59.999+00:00",
            "2010-01-30T23:59:59.999-07:00",
            "2010-01-30T00:00:00.000+07:00",
            "2010-01-30T23:59:59.999-07",
            "2010-01-30T00:00:00.000+07",
            "2010-01-30 00:00:00.000Z"
        ];

        for (let i = 0; i < tests.length; i++) {
            assert.equal(ateos.datetime(tests[i]).isValid(), true, `${tests[i]} should be valid in normal`);
            assert.equal(ateos.datetime.utc(tests[i]).isValid(), true, `${tests[i]} should be valid in normal`);
            assert.equal(ateos.datetime(tests[i], ateos.datetime.ISO_8601, true).isValid(), true, `${tests[i]} should be valid in strict`);
            assert.equal(ateos.datetime.utc(tests[i], ateos.datetime.ISO_8601, true).isValid(), true, `${tests[i]} should be valid in strict`);
        }
    });

    it("invalidAt", () => {
        assert.equal(ateos.datetime([2000, 12]).invalidAt(), 1, "month 12 is invalid: 0-11");
        assert.equal(ateos.datetime([2000, 1, 30]).invalidAt(), 2, "30 is not a valid february day");
        assert.equal(ateos.datetime([2000, 1, 29, 25]).invalidAt(), 3, "25 is invalid hour");
        assert.equal(ateos.datetime([2000, 1, 29, 24, 1]).invalidAt(), 3, "24:01 is invalid hour");
        assert.equal(ateos.datetime([2000, 1, 29, 23, 60]).invalidAt(), 4, "60 is invalid minute");
        assert.equal(ateos.datetime([2000, 1, 29, 23, 59, 60]).invalidAt(), 5, "60 is invalid second");
        assert.equal(ateos.datetime([2000, 1, 29, 23, 59, 59, 1000]).invalidAt(), 6, "1000 is invalid millisecond");
        assert.equal(ateos.datetime([2000, 1, 29, 23, 59, 59, 999]).invalidAt(), -1, "-1 if everything is fine");
    });

    it("valid Unix timestamp", () => {
        assert.equal(ateos.datetime(1371065286, "X").isValid(), true, "number integer");
        assert.equal(ateos.datetime(1379066897.0, "X").isValid(), true, "number whole 1dp");
        assert.equal(ateos.datetime(1379066897.7, "X").isValid(), true, "number 1dp");
        assert.equal(ateos.datetime(1379066897.00, "X").isValid(), true, "number whole 2dp");
        assert.equal(ateos.datetime(1379066897.07, "X").isValid(), true, "number 2dp");
        assert.equal(ateos.datetime(1379066897.17, "X").isValid(), true, "number 2dp");
        assert.equal(ateos.datetime(1379066897.000, "X").isValid(), true, "number whole 3dp");
        assert.equal(ateos.datetime(1379066897.007, "X").isValid(), true, "number 3dp");
        assert.equal(ateos.datetime(1379066897.017, "X").isValid(), true, "number 3dp");
        assert.equal(ateos.datetime(1379066897.157, "X").isValid(), true, "number 3dp");
        assert.equal(ateos.datetime("1371065286", "X").isValid(), true, "string integer");
        assert.equal(ateos.datetime("1379066897.", "X").isValid(), true, "string trailing .");
        assert.equal(ateos.datetime("1379066897.0", "X").isValid(), true, "string whole 1dp");
        assert.equal(ateos.datetime("1379066897.7", "X").isValid(), true, "string 1dp");
        assert.equal(ateos.datetime("1379066897.00", "X").isValid(), true, "string whole 2dp");
        assert.equal(ateos.datetime("1379066897.07", "X").isValid(), true, "string 2dp");
        assert.equal(ateos.datetime("1379066897.17", "X").isValid(), true, "string 2dp");
        assert.equal(ateos.datetime("1379066897.000", "X").isValid(), true, "string whole 3dp");
        assert.equal(ateos.datetime("1379066897.007", "X").isValid(), true, "string 3dp");
        assert.equal(ateos.datetime("1379066897.017", "X").isValid(), true, "string 3dp");
        assert.equal(ateos.datetime("1379066897.157", "X").isValid(), true, "string 3dp");
    });

    it("invalid Unix timestamp", () => {
        assert.equal(ateos.datetime(undefined, "X").isValid(), false, "undefined");
        assert.equal(ateos.datetime("undefined", "X").isValid(), false, "string undefined");
        try {
            assert.equal(ateos.datetime(null, "X").isValid(), false, "null");
        } catch (e) {
            assert.ok(true, "null");
        }

        assert.equal(ateos.datetime("null", "X").isValid(), false, "string null");
        assert.equal(ateos.datetime([], "X").isValid(), false, "array");
        assert.equal(ateos.datetime("{}", "X").isValid(), false, "object");
        try {
            assert.equal(ateos.datetime("", "X").isValid(), false, "string empty");
        } catch (e) {
            assert.ok(true, "string empty");
        }

        assert.equal(ateos.datetime(" ", "X").isValid(), false, "string space");
    });

    it("valid Unix offset milliseconds", () => {
        assert.equal(ateos.datetime(1234567890123, "x").isValid(), true, "number integer");
        assert.equal(ateos.datetime("1234567890123", "x").isValid(), true, "string integer");
    });

    it("invalid Unix offset milliseconds", () => {
        assert.equal(ateos.datetime(undefined, "x").isValid(), false, "undefined");
        assert.equal(ateos.datetime("undefined", "x").isValid(), false, "string undefined");
        try {
            assert.equal(ateos.datetime(null, "x").isValid(), false, "null");
        } catch (e) {
            assert.ok(true, "null");
        }

        assert.equal(ateos.datetime("null", "x").isValid(), false, "string null");
        assert.equal(ateos.datetime([], "x").isValid(), false, "array");
        assert.equal(ateos.datetime("{}", "x").isValid(), false, "object");
        try {
            assert.equal(ateos.datetime("", "x").isValid(), false, "string empty");
        } catch (e) {
            assert.ok(true, "string empty");
        }

        assert.equal(ateos.datetime(" ", "x").isValid(), false, "string space");
    });

    it("empty", () => {
        assert.equal(ateos.datetime(null).isValid(), false, "null");
        assert.equal(ateos.datetime("").isValid(), false, "empty string");
        assert.equal(ateos.datetime(null, "YYYY").isValid(), false, "format + null");
        assert.equal(ateos.datetime("", "YYYY").isValid(), false, "format + empty string");
        assert.equal(ateos.datetime(" ", "YYYY").isValid(), false, "format + empty when trimmed");
    });

    it("days of the year", () => {
        assert.equal(ateos.datetime("2010 300", "YYYY DDDD").isValid(), true, "day 300 of year valid");
        assert.equal(ateos.datetime("2010 365", "YYYY DDDD").isValid(), true, "day 365 of year valid");
        assert.equal(ateos.datetime("2010 366", "YYYY DDDD").isValid(), false, "day 366 of year invalid");
        assert.equal(ateos.datetime("2012 365", "YYYY DDDD").isValid(), true, "day 365 of leap year valid");
        assert.equal(ateos.datetime("2012 366", "YYYY DDDD").isValid(), true, "day 366 of leap year valid");
        assert.equal(ateos.datetime("2012 367", "YYYY DDDD").isValid(), false, "day 367 of leap year invalid");
    });

    it("24:00:00.000 is valid", () => {
        assert.equal(ateos.datetime("2014-01-01 24", "YYYY-MM-DD HH").isValid(), true, "24 is valid");
        assert.equal(ateos.datetime("2014-01-01 24:00", "YYYY-MM-DD HH:mm").isValid(), true, "24:00 is valid");
        assert.equal(ateos.datetime("2014-01-01 24:01", "YYYY-MM-DD HH:mm").isValid(), false, "24:01 is not valid");
    });

    it("oddball permissiveness", () => {
        assert.ok(ateos.datetime("2010-10-3199", ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]).isValid());

        assert.ok(ateos.datetime("3:25", ["h:mma", "hh:mma", "H:mm", "HH:mm"]).isValid());
    });

    it("0 hour is invalid in strict", () => {
        assert.equal(ateos.datetime("00:01", "hh:mm", true).isValid(), false, "00 hour is invalid in strict");
        assert.equal(ateos.datetime("00:01", "hh:mm").isValid(), true, "00 hour is valid in normal");
        assert.equal(ateos.datetime("0:01", "h:mm", true).isValid(), false, "0 hour is invalid in strict");
        assert.equal(ateos.datetime("0:01", "h:mm").isValid(), true, "0 hour is valid in normal");
    });
});
