describe("datetime", "create", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("array", () => {
        assert.ok(ateos.datetime([2010]).toDate() instanceof Date, "[2010]");
        assert.ok(ateos.datetime([2010, 1]).toDate() instanceof Date, "[2010, 1]");
        assert.ok(ateos.datetime([2010, 1, 12]).toDate() instanceof Date, "[2010, 1, 12]");
        assert.ok(ateos.datetime([2010, 1, 12, 1]).toDate() instanceof Date, "[2010, 1, 12, 1]");
        assert.ok(ateos.datetime([2010, 1, 12, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1]");
        assert.ok(ateos.datetime([2010, 1, 12, 1, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1, 1]");
        assert.ok(ateos.datetime([2010, 1, 12, 1, 1, 1, 1]).toDate() instanceof Date, "[2010, 1, 12, 1, 1, 1, 1]");
        assert.equal(Number(ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125))), Number(ateos.datetime([2010, 1, 14, 15, 25, 50, 125])), "constructing with array === constructing with new Date()");
    });

    it("array with invalid arguments", () => {
        assert.ok(!ateos.datetime([2010, null, null]).isValid(), "[2010, null, null]");
        assert.ok(!ateos.datetime([1945, null, null]).isValid(), "[1945, null, null] (pre-1970)");
    });

    it("array copying", () => {
        const importantArray = [2009, 11];
        ateos.datetime(importantArray);
        assert.deepEqual(importantArray, [2009, 11], "initializer should not mutate the original array");
    });

    it("from ms-dos", () => {
        const d = ateos.datetime.dos({
            date: 19256,
            time: 40970
        });
        expect(d.format("DD.MM.YYYY HH:mm:ss")).to.be.equal("24.09.2017 20:00:20");
    });

    it("object", () => {
        const fmt = "YYYY-MM-DD HH:mm:ss.SSS";
        const tests = [
            [{ year: 2010 }, "2010-01-01 00:00:00.000"],
            [{ year: 2010, month: 1 }, "2010-02-01 00:00:00.000"],
            [{ year: 2010, month: 1, day: 12 }, "2010-02-12 00:00:00.000"],
            [{ year: 2010, month: 1, date: 12 }, "2010-02-12 00:00:00.000"],
            [{ year: 2010, month: 1, day: 12, hours: 1 }, "2010-02-12 01:00:00.000"],
            [{ year: 2010, month: 1, date: 12, hours: 1 }, "2010-02-12 01:00:00.000"],
            [{ year: 2010, month: 1, day: 12, hours: 1, minutes: 1 }, "2010-02-12 01:01:00.000"],
            [{ year: 2010, month: 1, date: 12, hours: 1, minutes: 1 }, "2010-02-12 01:01:00.000"],
            [{ year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1 }, "2010-02-12 01:01:01.000"],
            [{ year: 2010, month: 1, day: 12, hours: 1, minutes: 1, seconds: 1, milliseconds: 1 }, "2010-02-12 01:01:01.001"],
            [{ years: 2010, months: 1, days: 14, hours: 15, minutes: 25, seconds: 50, milliseconds: 125 }, "2010-02-14 15:25:50.125"],
            [{ year: 2010, month: 1, day: 14, hour: 15, minute: 25, second: 50, millisecond: 125 }, "2010-02-14 15:25:50.125"],
            [{ y: 2010, M: 1, d: 14, h: 15, m: 25, s: 50, ms: 125 }, "2010-02-14 15:25:50.125"]
        ];
        for (let i = 0; i < tests.length; ++i) {
            assert.equal(ateos.datetime(tests[i][0]).format(fmt), tests[i][1]);
        }
    });

    it("multi format array copying", () => {
        const importantArray = ["MM/DD/YYYY", "YYYY-MM-DD", "MM-DD-YYYY"];
        ateos.datetime("1999-02-13", importantArray);
        assert.deepEqual(importantArray, ["MM/DD/YYYY", "YYYY-MM-DD", "MM-DD-YYYY"], "initializer should not mutate the original array");
    });

    it("number", () => {
        assert.ok(ateos.datetime(1000).toDate() instanceof Date, "1000");
        assert.equal(ateos.datetime(1000).valueOf(), 1000, "asserting valueOf");
        assert.equal(ateos.datetime.utc(1000).valueOf(), 1000, "asserting valueOf");
    });

    it("unix", () => {
        assert.equal(ateos.datetime.unix(1).valueOf(), 1000, "1 unix timestamp == 1000 Date.valueOf");
        assert.equal(ateos.datetime(1000).unix(), 1, "1000 Date.valueOf == 1 unix timestamp");
        assert.equal(ateos.datetime.unix(1000).valueOf(), 1000000, "1000 unix timestamp == 1000000 Date.valueOf");
        assert.equal(ateos.datetime(1500).unix(), 1, "1500 Date.valueOf == 1 unix timestamp");
        assert.equal(ateos.datetime(1900).unix(), 1, "1900 Date.valueOf == 1 unix timestamp");
        assert.equal(ateos.datetime(2100).unix(), 2, "2100 Date.valueOf == 2 unix timestamp");
        assert.equal(ateos.datetime(1333129333524).unix(), 1333129333, "1333129333524 Date.valueOf == 1333129333 unix timestamp");
        assert.equal(ateos.datetime(1333129333524000).unix(), 1333129333524, "1333129333524000 Date.valueOf == 1333129333524 unix timestamp");
    });

    it("date", () => {
        assert.ok(ateos.datetime(new Date()).toDate() instanceof Date, "new Date()");
        assert.equal(ateos.datetime(new Date(2016, 0, 1), "YYYY-MM-DD").format("YYYY-MM-DD"), "2016-01-01", "If date is provided, format string is ignored");
    });

    it("date with a format as an array", () => {
        const tests = [
            new Date(2016, 9, 27),
            new Date(2016, 9, 28),
            new Date(2016, 9, 29),
            new Date(2016, 9, 30),
            new Date(2016, 9, 31)
        ];

        for (let i = 0; i < tests.length; i++) {
            assert.equal(ateos.datetime(tests[i]).format(), ateos.datetime(tests[i], ["MM/DD/YYYY"], false).format(), "Passing date with a format array should still return the correct date");
        }
    });

    it("date mutation", () => {
        const a = new Date();
        assert.ok(ateos.datetime(a).toDate() !== a, "the date ateos.datetime uses should not be the date passed in");
    });

    it("ateos.datetime", () => {
        assert.ok(ateos.datetime(ateos.datetime()).toDate() instanceof Date, "ateos.datetime(ateos.datetime())");
        assert.ok(ateos.datetime(ateos.datetime(ateos.datetime())).toDate() instanceof Date, "ateos.datetime(ateos.datetime(ateos.datetime()))");
    });

    it("cloning ateos.datetime should only copy own properties", () => {
        assert.ok(!ateos.datetime().clone().hasOwnProperty("month"), "Should not clone prototype methods");
    });

    it("cloning respects ateos.datetime.customProperties", () => {
        const m = ateos.datetime();

        assert.equal(m.clone()._special, undefined, "cloning ignores extra properties");
        m._special = "bacon";
        ateos.datetime.customProperties.push("_special");
        assert.equal(m.clone()._special, "bacon", "cloning respects customProperties");
        ateos.datetime.customProperties.pop();
    });

    it("undefined", () => {
        assert.ok(ateos.datetime().toDate() instanceof Date, "undefined");
    });

    it("iso with bad input", () => {
        assert.ok(!ateos.datetime("a", ateos.datetime.ISO_8601).isValid(), "iso parsing with invalid string");
        assert.ok(!ateos.datetime("a", ateos.datetime.ISO_8601, true).isValid(), "iso parsing with invalid string, strict");
    });

    it("iso format 24hrs", () => {
        assert.equal(ateos.datetime("2014-01-01T24:00:00.000").format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
            "2014-01-02T00:00:00.000", "iso format with 24:00 localtime");
        assert.equal(ateos.datetime.utc("2014-01-01T24:00:00.000").format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
            "2014-01-02T00:00:00.000", "iso format with 24:00 utc");
    });

    it("string without format - json", () => {
        assert.equal(ateos.datetime("Date(1325132654000)").valueOf(), 1325132654000, "Date(1325132654000)");
        assert.equal(ateos.datetime("Date(-1325132654000)").valueOf(), -1325132654000, "Date(-1325132654000)");
        assert.equal(ateos.datetime("/Date(1325132654000)/").valueOf(), 1325132654000, "/Date(1325132654000)/");
        assert.equal(ateos.datetime("/Date(1325132654000+0700)/").valueOf(), 1325132654000, "/Date(1325132654000+0700)/");
        assert.equal(ateos.datetime("/Date(1325132654000-0700)/").valueOf(), 1325132654000, "/Date(1325132654000-0700)/");
    });

    it("string with format dropped am/pm bug", () => {
        ateos.datetime.locale("en");

        assert.equal(ateos.datetime("05/1/2012 12:25:00", "MM/DD/YYYY h:m:s a").format("MM/DD/YYYY"), "05/01/2012", "should not break if am/pm is left off from the parsing tokens");
        assert.equal(ateos.datetime("05/1/2012 12:25:00 am", "MM/DD/YYYY h:m:s a").format("MM/DD/YYYY"), "05/01/2012", "should not break if am/pm is left off from the parsing tokens");
        assert.equal(ateos.datetime("05/1/2012 12:25:00 pm", "MM/DD/YYYY h:m:s a").format("MM/DD/YYYY"), "05/01/2012", "should not break if am/pm is left off from the parsing tokens");

        assert.ok(ateos.datetime("05/1/2012 12:25:00", "MM/DD/YYYY h:m:s a").isValid());
        assert.ok(ateos.datetime("05/1/2012 12:25:00 am", "MM/DD/YYYY h:m:s a").isValid());
        assert.ok(ateos.datetime("05/1/2012 12:25:00 pm", "MM/DD/YYYY h:m:s a").isValid());
    });

    it("empty string with formats", () => {
        assert.equal(ateos.datetime("", "MM").format("YYYY-MM-DD HH:mm:ss"), "Invalid date");
        assert.equal(ateos.datetime(" ", "MM").format("YYYY-MM-DD HH:mm:ss"), "Invalid date");
        assert.equal(ateos.datetime(" ", "DD").format("YYYY-MM-DD HH:mm:ss"), "Invalid date");
        assert.equal(ateos.datetime(" ", ["MM", "DD"]).format("YYYY-MM-DD HH:mm:ss"), "Invalid date");

        assert.ok(!ateos.datetime("", "MM").isValid());
        assert.ok(!ateos.datetime(" ", "MM").isValid());
        assert.ok(!ateos.datetime(" ", "DD").isValid());
        assert.ok(!ateos.datetime(" ", ["MM", "DD"]).isValid());
    });

    it("undefined argument with formats", () => {
        assert.equal(ateos.datetime(undefined, "MM").format("YYYY-MM-DD HH:mm:ss"), "Invalid date");
        assert.equal(ateos.datetime(undefined, "DD").format("YYYY-MM-DD HH:mm:ss"), "Invalid date");
        assert.equal(ateos.datetime(undefined, ["MM", "DD"]).format("YYYY-MM-DD HH:mm:ss"), "Invalid date");

        assert.ok(!ateos.datetime(undefined, "MM").isValid());
        assert.ok(!ateos.datetime(undefined, "MM").isValid());
        assert.ok(!ateos.datetime(undefined, "DD").isValid());
        assert.ok(!ateos.datetime(undefined, ["MM", "DD"]).isValid());
    });

    it("defaulting to current date", () => {
        const now = ateos.datetime();
        assert.equal(ateos.datetime("12:13:14", "hh:mm:ss").format("YYYY-MM-DD hh:mm:ss"),
            now.clone().hour(12).minute(13).second(14).format("YYYY-MM-DD hh:mm:ss"),
            "given only time default to current date");
        assert.equal(ateos.datetime("05", "DD").format("YYYY-MM-DD"),
            now.clone().date(5).format("YYYY-MM-DD"),
            "given day of month default to current month, year");
        assert.equal(ateos.datetime("05", "MM").format("YYYY-MM-DD"),
            now.clone().month(4).date(1).format("YYYY-MM-DD"),
            "given month default to current year");
        assert.equal(ateos.datetime("1996", "YYYY").format("YYYY-MM-DD"),
            now.clone().year(1996).month(0).date(1).format("YYYY-MM-DD"),
            "given year do not default");
    });

    it("matching am/pm", () => {
        assert.equal(ateos.datetime("2012-09-03T03:00PM", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00PM", "am/pm should parse correctly for PM");
        assert.equal(ateos.datetime("2012-09-03T03:00P.M.", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00PM", "am/pm should parse correctly for P.M.");
        assert.equal(ateos.datetime("2012-09-03T03:00P", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00PM", "am/pm should parse correctly for P");
        assert.equal(ateos.datetime("2012-09-03T03:00pm", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00PM", "am/pm should parse correctly for pm");
        assert.equal(ateos.datetime("2012-09-03T03:00p.m.", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00PM", "am/pm should parse correctly for p.m.");
        assert.equal(ateos.datetime("2012-09-03T03:00p", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00PM", "am/pm should parse correctly for p");

        assert.equal(ateos.datetime("2012-09-03T03:00AM", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00AM", "am/pm should parse correctly for AM");
        assert.equal(ateos.datetime("2012-09-03T03:00A.M.", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00AM", "am/pm should parse correctly for A.M.");
        assert.equal(ateos.datetime("2012-09-03T03:00A", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00AM", "am/pm should parse correctly for A");
        assert.equal(ateos.datetime("2012-09-03T03:00am", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00AM", "am/pm should parse correctly for am");
        assert.equal(ateos.datetime("2012-09-03T03:00a.m.", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00AM", "am/pm should parse correctly for a.m.");
        assert.equal(ateos.datetime("2012-09-03T03:00a", "YYYY-MM-DDThh:mmA").format("YYYY-MM-DDThh:mmA"), "2012-09-03T03:00AM", "am/pm should parse correctly for a");

        assert.equal(ateos.datetime("5:00p.m.March 4 2012", "h:mmAMMMM D YYYY").format("YYYY-MM-DDThh:mmA"), "2012-03-04T05:00PM", "am/pm should parse correctly before month names");
    });

    it("string with format", () => {
        ateos.datetime.locale("en");
        const a = [
            ["YYYY-Q", "2014-4"],
            ["MM-DD-YYYY", "12-02-1999"],
            ["DD-MM-YYYY", "12-02-1999"],
            ["DD/MM/YYYY", "12/02/1999"],
            ["DD_MM_YYYY", "12_02_1999"],
            ["DD:MM:YYYY", "12:02:1999"],
            ["D-M-YY", "2-2-99"],
            ["YY", "99"],
            ["DDD-YYYY", "300-1999"],
            ["DD-MM-YYYY h:m:s", "12-02-1999 2:45:10"],
            ["DD-MM-YYYY h:m:s a", "12-02-1999 2:45:10 am"],
            ["DD-MM-YYYY h:m:s a", "12-02-1999 2:45:10 pm"],
            ["h:mm a", "12:00 pm"],
            ["h:mm a", "12:30 pm"],
            ["h:mm a", "12:00 am"],
            ["h:mm a", "12:30 am"],
            ["HH:mm", "12:00"],
            ["kk:mm", "12:00"],
            ["YYYY-MM-DDTHH:mm:ss", "2011-11-11T11:11:11"],
            ["MM-DD-YYYY [M]", "12-02-1999 M"],
            ["ddd MMM DD HH:mm:ss YYYY", "Tue Apr 07 22:52:51 2009"],
            ["HH:mm:ss", "12:00:00"],
            ["HH:mm:ss", "12:30:00"],
            ["HH:mm:ss", "00:00:00"],
            ["HH:mm:ss S", "00:30:00 1"],
            ["HH:mm:ss SS", "00:30:00 12"],
            ["HH:mm:ss SSS", "00:30:00 123"],
            ["HH:mm:ss S", "00:30:00 7"],
            ["HH:mm:ss SS", "00:30:00 78"],
            ["HH:mm:ss SSS", "00:30:00 789"],
            ["kk:mm:ss", "12:00:00"],
            ["kk:mm:ss", "12:30:00"],
            ["kk:mm:ss", "24:00:00"],
            ["kk:mm:ss S", "24:30:00 1"],
            ["kk:mm:ss SS", "24:30:00 12"],
            ["kk:mm:ss SSS", "24:30:00 123"],
            ["kk:mm:ss S", "24:30:00 7"],
            ["kk:mm:ss SS", "24:30:00 78"],
            ["kk:mm:ss SSS", "24:30:00 789"],
            ["X", "1234567890"],
            ["x", "1234567890123"],
            ["LT", "12:30 AM"],
            ["LTS", "12:30:29 AM"],
            ["L", "09/02/1999"],
            ["l", "9/2/1999"],
            ["LL", "September 2, 1999"],
            ["ll", "Sep 2, 1999"],
            ["LLL", "September 2, 1999 12:30 AM"],
            ["lll", "Sep 2, 1999 12:30 AM"],
            ["LLLL", "Thursday, September 2, 1999 12:30 AM"],
            ["llll", "Thu, Sep 2, 1999 12:30 AM"]
        ];

        for (let i = 0; i < a.length; i++) {
            const m = ateos.datetime(a[i][1], a[i][0]);
            assert.ok(m.isValid());
            assert.equal(m.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("2 digit year with YYYY format", () => {
        assert.equal(ateos.datetime("9/2/99", "D/M/YYYY").format("DD/MM/YYYY"), "09/02/1999", "D/M/YYYY ---> 9/2/99");
        assert.equal(ateos.datetime("9/2/1999", "D/M/YYYY").format("DD/MM/YYYY"), "09/02/1999", "D/M/YYYY ---> 9/2/1999");
        assert.equal(ateos.datetime("9/2/68", "D/M/YYYY").format("DD/MM/YYYY"), "09/02/2068", "D/M/YYYY ---> 9/2/68");
        assert.equal(ateos.datetime("9/2/69", "D/M/YYYY").format("DD/MM/YYYY"), "09/02/1969", "D/M/YYYY ---> 9/2/69");
    });

    it("unix timestamp format", () => {
        const formats = ["X", "X.S", "X.SS", "X.SSS"];

        for (let i = 0; i < formats.length; i++) {
            const format = formats[i];
            assert.equal(ateos.datetime("1234567890", format).valueOf(), 1234567890 * 1000, `${format} matches timestamp without milliseconds`);
            assert.equal(ateos.datetime("1234567890.1", format).valueOf(), 1234567890 * 1000 + 100, `${format} matches timestamp with deciseconds`);
            assert.equal(ateos.datetime("1234567890.12", format).valueOf(), 1234567890 * 1000 + 120, `${format} matches timestamp with centiseconds`);
            assert.equal(ateos.datetime("1234567890.123", format).valueOf(), 1234567890 * 1000 + 123, `${format} matches timestamp with milliseconds`);
        }
    });

    it("unix offset milliseconds", () => {
        assert.equal(ateos.datetime("1234567890123", "x").valueOf(), 1234567890123, "x matches unix offset in milliseconds");
    });

    it("milliseconds format", () => {
        assert.equal(ateos.datetime("1", "S").get("ms"), 100, "deciseconds");
        // assert.equal(ateos.datetime('10', 'S', true).isValid(), false, 'deciseconds with two digits');
        // assert.equal(ateos.datetime('1', 'SS', true).isValid(), false, 'centiseconds with one digits');
        assert.equal(ateos.datetime("12", "SS").get("ms"), 120, "centiseconds");
        // assert.equal(ateos.datetime('123', 'SS', true).isValid(), false, 'centiseconds with three digits');
        assert.equal(ateos.datetime("123", "SSS").get("ms"), 123, "milliseconds");
        assert.equal(ateos.datetime("1234", "SSSS").get("ms"), 123, "milliseconds with SSSS");
        assert.equal(ateos.datetime("123456789101112", "SSSS").get("ms"), 123, "milliseconds with SSSS");
    });

    it("string with format no separators", () => {
        ateos.datetime.locale("en");
        const a = [
            ["MMDDYYYY", "12021999"],
            ["DDMMYYYY", "12021999"],
            ["YYYYMMDD", "19991202"],
            ["DDMMMYYYY", "10Sep2001"]
        ];

        for (let i = 0; i < a.length; i++) {
            assert.equal(ateos.datetime(a[i][1], a[i][0]).format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("string with format (timezone)", () => {
        assert.equal(ateos.datetime("5 -0700", "H ZZ").toDate().getUTCHours(), 12, "parse hours '5 -0700' ---> 'H ZZ'");
        assert.equal(ateos.datetime("5 -07:00", "H Z").toDate().getUTCHours(), 12, "parse hours '5 -07:00' ---> 'H Z'");
        assert.equal(ateos.datetime("5 -0730", "H ZZ").toDate().getUTCMinutes(), 30, "parse hours '5 -0730' ---> 'H ZZ'");
        assert.equal(ateos.datetime("5 -07:30", "H Z").toDate().getUTCMinutes(), 30, "parse hours '5 -07:0' ---> 'H Z'");
        assert.equal(ateos.datetime("5 +0100", "H ZZ").toDate().getUTCHours(), 4, "parse hours '5 +0100' ---> 'H ZZ'");
        assert.equal(ateos.datetime("5 +01:00", "H Z").toDate().getUTCHours(), 4, "parse hours '5 +01:00' ---> 'H Z'");
        assert.equal(ateos.datetime("5 +0130", "H ZZ").toDate().getUTCMinutes(), 30, "parse hours '5 +0130' ---> 'H ZZ'");
        assert.equal(ateos.datetime("5 +01:30", "H Z").toDate().getUTCMinutes(), 30, "parse hours '5 +01:30' ---> 'H Z'");
    });

    it("string with format (timezone offset)", () => {
        const a = new Date(Date.UTC(2011, 0, 1, 1));
        const b = ateos.datetime("2011 1 1 0 -01:00", "YYYY MM DD HH Z");
        assert.equal(a.getHours(), b.hours(), "date created with utc == parsed string with timezone offset");
        assert.equal(Number(a), Number(b), "date created with utc == parsed string with timezone offset");
        const c = ateos.datetime("2011 2 1 10 -05:00", "YYYY MM DD HH Z");
        const d = ateos.datetime("2011 2 1 8 -07:00", "YYYY MM DD HH Z");
        assert.equal(c.hours(), d.hours(), "10 am central time == 8 am pacific time");
        const e = ateos.datetime.utc("20 07 2012 17:15:00", "DD MM YYYY HH:mm:ss");
        const f = ateos.datetime.utc("20 07 2012 10:15:00 -0700", "DD MM YYYY HH:mm:ss ZZ");
        assert.equal(e.hours(), f.hours(), "parse timezone offset in utc");
    });

    it("string with timezone around start of year", () => {
        assert.equal(ateos.datetime("2000-01-01T00:00:00.000+01:00").toISOString(), "1999-12-31T23:00:00.000Z", "+1:00 around 2000");
        assert.equal(ateos.datetime("2000-01-01T00:00:00.000-01:00").toISOString(), "2000-01-01T01:00:00.000Z", "-1:00 around 2000");
        assert.equal(ateos.datetime("1970-01-01T00:00:00.000+01:00").toISOString(), "1969-12-31T23:00:00.000Z", "+1:00 around 1970");
        assert.equal(ateos.datetime("1970-01-01T00:00:00.000-01:00").toISOString(), "1970-01-01T01:00:00.000Z", "-1:00 around 1970");
        assert.equal(ateos.datetime("1200-01-01T00:00:00.000+01:00").toISOString(), "1199-12-31T23:00:00.000Z", "+1:00 around 1200");
        assert.equal(ateos.datetime("1200-01-01T00:00:00.000-01:00").toISOString(), "1200-01-01T01:00:00.000Z", "-1:00 around 1200");
    });

    it("string with array of formats", () => {
        const thursdayForCurrentWeek = ateos.datetime()
            .day(4)
            .format("YYYY MM DD");

        assert.equal(ateos.datetime("11-02-1999", ["MM-DD-YYYY", "DD-MM-YYYY"]).format("MM DD YYYY"), "11 02 1999", "switching month and day");
        assert.equal(ateos.datetime("02-11-1999", ["MM/DD/YYYY", "YYYY MM DD", "MM-DD-YYYY"]).format("MM DD YYYY"), "02 11 1999", "year last");
        assert.equal(ateos.datetime("1999-02-11", ["MM/DD/YYYY", "YYYY MM DD", "MM-DD-YYYY"]).format("MM DD YYYY"), "02 11 1999", "year first");

        assert.equal(ateos.datetime("02-11-1999", ["MM/DD/YYYY", "YYYY MM DD"]).format("MM DD YYYY"), "02 11 1999", "year last");
        assert.equal(ateos.datetime("1999-02-11", ["MM/DD/YYYY", "YYYY MM DD"]).format("MM DD YYYY"), "02 11 1999", "year first");
        assert.equal(ateos.datetime("02-11-1999", ["YYYY MM DD", "MM/DD/YYYY"]).format("MM DD YYYY"), "02 11 1999", "year last");
        assert.equal(ateos.datetime("1999-02-11", ["YYYY MM DD", "MM/DD/YYYY"]).format("MM DD YYYY"), "02 11 1999", "year first");

        assert.equal(ateos.datetime("13-11-1999", ["MM/DD/YYYY", "DD/MM/YYYY"]).format("MM DD YYYY"), "11 13 1999", "second must be month");
        assert.equal(ateos.datetime("11-13-1999", ["MM/DD/YYYY", "DD/MM/YYYY"]).format("MM DD YYYY"), "11 13 1999", "first must be month");
        assert.equal(ateos.datetime("01-02-2000", ["MM/DD/YYYY", "DD/MM/YYYY"]).format("MM DD YYYY"), "01 02 2000", "either can be a month, month first format");
        assert.equal(ateos.datetime("02-01-2000", ["DD/MM/YYYY", "MM/DD/YYYY"]).format("MM DD YYYY"), "01 02 2000", "either can be a month, day first format");

        assert.equal(ateos.datetime("11-02-10", ["MM/DD/YY", "YY MM DD", "DD-MM-YY"]).format("MM DD YYYY"), "02 11 2010", "all unparsed substrings have influence on format penalty");
        assert.equal(ateos.datetime("11-02-10", ["MM-DD-YY HH:mm", "YY MM DD"]).format("MM DD YYYY"), "02 10 2011", "prefer formats without extra tokens");
        assert.equal(ateos.datetime("11-02-10 junk", ["MM-DD-YY", "YY.MM.DD [junk]"]).format("MM DD YYYY"), "02 10 2011", "prefer formats that dont result in extra characters");
        assert.equal(ateos.datetime("11-22-10", ["YY-MM-DD", "YY-DD-MM"]).format("MM DD YYYY"), "10 22 2011", "prefer valid results");

        assert.equal(ateos.datetime("gibberish", ["YY-MM-DD", "YY-DD-MM"]).format("MM DD YYYY"), "Invalid date", "doest throw for invalid strings");
        assert.equal(ateos.datetime("gibberish", []).format("MM DD YYYY"), "Invalid date", "doest throw for an empty array");

        assert.equal(ateos.datetime(
            "System Administrator and Database Assistant (7/1/2011), System Administrator and Database Assistant (7/1/2011), Database Coordinator (7/1/2011), Vice President (7/1/2011), System Administrator and Database Assistant (5/31/2012), Database Coordinator (7/1/2012), System Administrator and Database Assistant (7/1/2013)",
            ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ"])
            .format("YYYY-MM-DD"), "2011-07-01", "Works for long strings");

        assert.equal(ateos.datetime("11-02-10", ["MM.DD.YY", "DD-MM-YY"]).format("MM DD YYYY"), "02 11 2010", "escape RegExp special characters on comparing");

        assert.equal(ateos.datetime("13-10-98", ["DD MM YY", "DD MM YYYY"])._f, "DD MM YY", "use two digit year");
        assert.equal(ateos.datetime("13-10-1998", ["DD MM YY", "DD MM YYYY"])._f, "DD MM YYYY", "use four digit year");

        assert.equal(ateos.datetime("01", ["MM", "DD"])._f, "MM", "Should use first valid format");

        assert.equal(ateos.datetime("Thursday 8:30pm", ["dddd h:mma"]).format("YYYY MM DD dddd h:mma"), `${thursdayForCurrentWeek} Thursday 8:30pm`, "Default to current week");
    });

    it("string with array of formats + ISO", () => {
        assert.equal(ateos.datetime("1994", [ateos.datetime.ISO_8601, "MM", "HH:mm", "YYYY"]).year(), 1994, "iso: assert parse YYYY");
        assert.equal(ateos.datetime("17:15", [ateos.datetime.ISO_8601, "MM", "HH:mm", "YYYY"]).hour(), 17, "iso: assert parse HH:mm (1)");
        assert.equal(ateos.datetime("24:15", [ateos.datetime.ISO_8601, "MM", "kk:mm", "YYYY"]).hour(), 0, "iso: assert parse kk:mm");
        assert.equal(ateos.datetime("17:15", [ateos.datetime.ISO_8601, "MM", "HH:mm", "YYYY"]).minutes(), 15, "iso: assert parse HH:mm (2)");
        assert.equal(ateos.datetime("06", [ateos.datetime.ISO_8601, "MM", "HH:mm", "YYYY"]).month(), 6 - 1, "iso: assert parse MM");
        assert.equal(ateos.datetime("2012-06-01", [ateos.datetime.ISO_8601, "MM", "HH:mm", "YYYY"]).parsingFlags().iso, true, "iso: assert parse iso");
        assert.equal(ateos.datetime("2014-05-05", [ateos.datetime.ISO_8601, "YYYY-MM-DD"]).parsingFlags().iso, true, "iso: edge case array precedence iso");
        assert.equal(ateos.datetime("2014-05-05", ["YYYY-MM-DD", ateos.datetime.ISO_8601]).parsingFlags().iso, false, "iso: edge case array precedence not iso");
    });

    it("string with format - years", () => {
        assert.equal(ateos.datetime("67", "YY").format("YYYY"), "2067", "67 > 2067");
        assert.equal(ateos.datetime("68", "YY").format("YYYY"), "2068", "68 > 2068");
        assert.equal(ateos.datetime("69", "YY").format("YYYY"), "1969", "69 > 1969");
        assert.equal(ateos.datetime("70", "YY").format("YYYY"), "1970", "70 > 1970");
    });

    it("implicit cloning", () => {
        const momentA = ateos.datetime([2011, 10, 10]);
        const momentB = ateos.datetime(momentA);
        momentA.month(5);
        assert.notEqual(momentA.month(), momentB.month(), "Calling moment() on a moment will create a clone");
    });

    it("explicit cloning", () => {
        const momentA = ateos.datetime([2011, 10, 10]);
        const momentB = momentA.clone();
        momentA.month(5);
        assert.equal(momentB.month(), 10, "Calling ateos.datetime() on a ateos.datetime will create a clone");
        assert.equal(momentA.month(), 5, "Calling ateos.datetime() on a ateos.datetime will create a clone");
    });

    it("cloning carrying over utc mode", () => {
        assert.equal(ateos.datetime().local().clone()._isUTC, false, "An explicit cloned local ateos.datetime should have _isUTC == false");
        assert.equal(ateos.datetime().utc().clone()._isUTC, true, "An cloned utc ateos.datetime should have _isUTC == true");
        assert.equal(ateos.datetime().clone()._isUTC, false, "An explicit cloned local ateos.datetime should have _isUTC == false");
        assert.equal(ateos.datetime.utc().clone()._isUTC, true, "An explicit cloned utc ateos.datetime should have _isUTC == true");
        assert.equal(ateos.datetime(ateos.datetime().local())._isUTC, false, "An implicit cloned local ateos.datetime should have _isUTC == false");
        assert.equal(ateos.datetime(ateos.datetime().utc())._isUTC, true, "An implicit cloned utc ateos.datetime should have _isUTC == true");
        assert.equal(ateos.datetime(ateos.datetime())._isUTC, false, "An implicit cloned local ateos.datetime should have _isUTC == false");
        assert.equal(ateos.datetime(ateos.datetime.utc())._isUTC, true, "An implicit cloned utc ateos.datetime should have _isUTC == true");
    });

    it("parsing RFC 2822", () => {
        const testCases = {
            "Tue, 01 Nov 2016 01:23:45 UT": [2016, 10, 1, 1, 23, 45, 0],
            "Sun, 12 Apr 2015 05:06:07 GMT": [2015, 3, 12, 5, 6, 7, 0],
            "Tue, 01 Nov 2016 01:23:45 +0000": [2016, 10, 1, 1, 23, 45, 0],
            "Tue, 01 Nov 16 04:23:45 Z": [2016, 10, 1, 4, 23, 45, 0],
            "01 Nov 2016 05:23:45 z": [2016, 10, 1, 5, 23, 45, 0],
            "(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)": [2016, 10, 1, 7, 23, 45, 0],
            "Mon, 02 Jan 2017 06:00:00 -0800": [2017, 0, 2, 6, 0, 0, -8 * 60],
            "Mon, 02 Jan 2017 06:00:00 +0800": [2017, 0, 2, 6, 0, 0, +8 * 60],
            "Mon, 02 Jan 2017 06:00:00 +0330": [2017, 0, 2, 6, 0, 0, Number(3 * 60 + 30)],
            "Mon, 02 Jan 2017 06:00:00 -0330": [2017, 0, 2, 6, 0, 0, -(3 * 60 + 30)],
            "Mon, 02 Jan 2017 06:00:00 PST": [2017, 0, 2, 6, 0, 0, -8 * 60],
            "Mon, 02 Jan 2017 06:00:00 PDT": [2017, 0, 2, 6, 0, 0, -7 * 60],
            "Mon, 02 Jan 2017 06:00:00 MST": [2017, 0, 2, 6, 0, 0, -7 * 60],
            "Mon, 02 Jan 2017 06:00:00 MDT": [2017, 0, 2, 6, 0, 0, -6 * 60],
            "Mon, 02 Jan 2017 06:00:00 CST": [2017, 0, 2, 6, 0, 0, -6 * 60],
            "Mon, 02 Jan 2017 06:00:00 CDT": [2017, 0, 2, 6, 0, 0, -5 * 60],
            "Mon, 02 Jan 2017 06:00:00 EST": [2017, 0, 2, 6, 0, 0, -5 * 60],
            "Mon, 02 Jan 2017 06:00:00 EDT": [2017, 0, 2, 6, 0, 0, -4 * 60]
        };

        let inp;
        let tokens;
        let parseResult;
        let expResult;

        for (inp in testCases) {
            tokens = testCases[inp];
            parseResult = ateos.datetime(inp, ateos.datetime.RFC_2822, true).parseZone();
            expResult = ateos.datetime.utc(tokens.slice(0, 6)).utcOffset(tokens[6], true);
            assert.ok(parseResult.isValid(), inp);
            assert.ok(parseResult.parsingFlags().rfc2822, `${inp} - rfc2822 parsingFlag`);
            assert.equal(parseResult.utcOffset(), expResult.utcOffset(), `${inp} - zone`);
            assert.equal(parseResult.valueOf(), expResult.valueOf(), `${inp} - correctness`);
        }
    });

    it("non RFC 2822 strings", () => {
        const testCases = {
            "RFC2822 datetime with all options but invalid day delimiter": "Tue. 01 Nov 2016 01:23:45 GMT",
            "RFC2822 datetime with mismatching Day (weekday v date)": "Mon, 01 Nov 2016 01:23:45 GMT"
        };
        let testCase;

        for (testCase in testCases) {
            const testResult = ateos.datetime(testCases[testCase], ateos.datetime.RFC_2822, true);
            assert.ok(!testResult.isValid(), `${testCase}: ${testResult} - is invalid rfc2822`);
            assert.ok(!testResult.parsingFlags().rfc2822, `${testCase}: ${testResult} - rfc2822 parsingFlag`);
        }
    });

    it("parsing RFC 2822 in a different locale", () => {
        const testCases = {
            "clean RFC2822 datetime with all options": "Tue, 01 Nov 2016 01:23:45 UT",
            "clean RFC2822 datetime without comma": "Tue 01 Nov 2016 02:23:45 GMT",
            "clean RFC2822 datetime without seconds": "Tue, 01 Nov 2016 03:23 +0000",
            "clean RFC2822 datetime without century": "Tue, 01 Nov 16 04:23:45 Z",
            "clean RFC2822 datetime without day": "01 Nov 2016 05:23:45 z",
            "clean RFC2822 datetime with single-digit day-of-month": "Tue, 1 Nov 2016 06:23:45 GMT",
            "RFC2822 datetime with CFWSs": "(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)"
        };
        let testCase;

        try {
            ateos.datetime.locale("ru");
            for (testCase in testCases) {
                const testResult = ateos.datetime(testCases[testCase], ateos.datetime.RFC_2822, true);
                assert.ok(testResult.isValid(), testResult);
                assert.ok(testResult.parsingFlags().rfc2822, `${testResult} - rfc2822 parsingFlag`);
            }
        } finally {
            ateos.datetime.locale("en");
        }
    });

    it("non RFC 2822 strings in a different locale", () => {
        const testCases = {
            "RFC2822 datetime with all options but invalid day delimiter": "Tue. 01 Nov 2016 01:23:45 GMT",
            "RFC2822 datetime with mismatching Day (week v date)": "Mon, 01 Nov 2016 01:23:45 GMT"
        };
        let testCase;

        try {
            ateos.datetime.locale("ru");
            for (testCase in testCases) {
                const testResult = ateos.datetime(testCases[testCase], ateos.datetime.RFC_2822, true);
                assert.ok(!testResult.isValid(), testResult);
                assert.ok(!testResult.parsingFlags().rfc2822, `${testResult} - rfc2822 parsingFlag`);
            }
        } finally {
            ateos.datetime.locale("en");
        }
    });

    it("parsing iso", () => {
        const offset = ateos.datetime([2011, 9, 8]).utcOffset();
        const pad = function (input) {
            if (input < 10) {
                return `0${input}`;
            }
            return String(input);
        };
        const hourOffset = offset > 0 ? Math.floor(offset / 60) : Math.ceil(offset / 60);
        const minOffset = offset - (hourOffset * 60);
        const tz = offset >= 0 ?
            `+${pad(hourOffset)}:${pad(minOffset)}` :
            `-${pad(-hourOffset)}:${pad(-minOffset)}`;
        const tz2 = tz.replace(":", "");
        const tz3 = tz2.slice(0, 3);
        //Tz3 removes minutes digit so will break the tests when parsed if they all use the same minutes digit
        const minutesForTz3 = pad((4 + minOffset) % 60);

        const formats = [
            ["2011-10-08", `2011-10-08T00:00:00.000${tz}`],
            ["2011-10-08T18", `2011-10-08T18:00:00.000${tz}`],
            ["2011-10-08T18:04", `2011-10-08T18:04:00.000${tz}`],
            ["2011-10-08T18:04:20", `2011-10-08T18:04:20.000${tz}`],
            [`2011-10-08T18:04${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-10-08T18:04:20${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-10-08T18:04${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-10-08T18:04:20${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-10-08T18:04${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011-10-08T18:04:20${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011-10-08T18:04:20.1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011-10-08T18:04:20.11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011-10-08T18:04:20.111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011-10-08 18", `2011-10-08T18:00:00.000${tz}`],
            ["2011-10-08 18:04", `2011-10-08T18:04:00.000${tz}`],
            ["2011-10-08 18:04:20", `2011-10-08T18:04:20.000${tz}`],
            [`2011-10-08 18:04${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-10-08 18:04:20${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-10-08 18:04${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-10-08 18:04:20${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-10-08 18:04${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011-10-08 18:04:20${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011-10-08 18:04:20.1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011-10-08 18:04:20.11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011-10-08 18:04:20.111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011-W40", `2011-10-03T00:00:00.000${tz}`],
            ["2011-W40-6", `2011-10-08T00:00:00.000${tz}`],
            ["2011-W40-6T18", `2011-10-08T18:00:00.000${tz}`],
            ["2011-W40-6T18:04", `2011-10-08T18:04:00.000${tz}`],
            ["2011-W40-6T18:04:20", `2011-10-08T18:04:20.000${tz}`],
            [`2011-W40-6T18:04${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-W40-6T18:04:20${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-W40-6T18:04${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-W40-6T18:04:20${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-W40-6T18:04${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011-W40-6T18:04:20${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011-W40-6T18:04:20.1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011-W40-6T18:04:20.11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011-W40-6T18:04:20.111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011-W40-6 18", `2011-10-08T18:00:00.000${tz}`],
            ["2011-W40-6 18:04", `2011-10-08T18:04:00.000${tz}`],
            ["2011-W40-6 18:04:20", `2011-10-08T18:04:20.000${tz}`],
            [`2011-W40-6 18:04${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-W40-6 18:04:20${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-W40-6 18:04${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-W40-6 18:04:20${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-W40-6 18:04${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011-W40-6 18:04:20${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011-W40-6 18:04:20.1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011-W40-6 18:04:20.11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011-W40-6 18:04:20.111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011-281", `2011-10-08T00:00:00.000${tz}`],
            ["2011-281T18", `2011-10-08T18:00:00.000${tz}`],
            ["2011-281T18:04", `2011-10-08T18:04:00.000${tz}`],
            ["2011-281T18:04:20", `2011-10-08T18:04:20.000${tz}`],
            [`2011-281T18:04${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-281T18:04:20${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-281T18:04${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-281T18:04:20${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-281T18:04${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011-281T18:04:20${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011-281T18:04:20.1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011-281T18:04:20.11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011-281T18:04:20.111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011-281 18", `2011-10-08T18:00:00.000${tz}`],
            ["2011-281 18:04", `2011-10-08T18:04:00.000${tz}`],
            ["2011-281 18:04:20", `2011-10-08T18:04:20.000${tz}`],
            [`2011-281 18:04${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-281 18:04:20${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-281 18:04${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011-281 18:04:20${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011-281 18:04${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011-281 18:04:20${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011-281 18:04:20.1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011-281 18:04:20.11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011-281 18:04:20.111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["20111008T18", `2011-10-08T18:00:00.000${tz}`],
            ["20111008T1804", `2011-10-08T18:04:00.000${tz}`],
            ["20111008T180420", `2011-10-08T18:04:20.000${tz}`],
            [`20111008T1804${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`20111008T180420${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`20111008T1804${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`20111008T180420${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`20111008T1804${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`20111008T180420${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`20111008T180420,1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`20111008T180420,11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`20111008T180420,111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["20111008 18", `2011-10-08T18:00:00.000${tz}`],
            ["20111008 1804", `2011-10-08T18:04:00.000${tz}`],
            ["20111008 180420", `2011-10-08T18:04:20.000${tz}`],
            [`20111008 1804${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`20111008 180420${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`20111008 1804${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`20111008 180420${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`20111008 1804${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`20111008 180420${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`20111008 180420,1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`20111008 180420,11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`20111008 180420,111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011W40", `2011-10-03T00:00:00.000${tz}`],
            ["2011W406", `2011-10-08T00:00:00.000${tz}`],
            ["2011W406T18", `2011-10-08T18:00:00.000${tz}`],
            ["2011W406T1804", `2011-10-08T18:04:00.000${tz}`],
            ["2011W406T180420", `2011-10-08T18:04:20.000${tz}`],
            [`2011W406 1804${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011W406T1804${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011W406T180420${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011W406T1804${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011W406T180420${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011W406T1804${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011W406T180420${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011W406T180420,1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011W406T180420,11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011W406T180420,111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011W406 18", `2011-10-08T18:00:00.000${tz}`],
            ["2011W406 1804", `2011-10-08T18:04:00.000${tz}`],
            ["2011W406 180420", `2011-10-08T18:04:20.000${tz}`],
            [`2011W406 1804${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011W406 180420${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011W406 180420${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011W406 1804${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011W406 180420${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011W406 180420,1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011W406 180420,11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011W406 180420,111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011281", `2011-10-08T00:00:00.000${tz}`],
            ["2011281T18", `2011-10-08T18:00:00.000${tz}`],
            ["2011281T1804", `2011-10-08T18:04:00.000${tz}`],
            ["2011281T180420", `2011-10-08T18:04:20.000${tz}`],
            [`2011281T1804${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011281T180420${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011281T1804${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011281T180420${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011281T1804${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011281T180420${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011281T180420,1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011281T180420,11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011281T180420,111${tz2}`, `2011-10-08T18:04:20.111${tz}`],
            ["2011281 18", `2011-10-08T18:00:00.000${tz}`],
            ["2011281 1804", `2011-10-08T18:04:00.000${tz}`],
            ["2011281 180420", `2011-10-08T18:04:20.000${tz}`],
            [`2011281 1804${tz}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011281 180420${tz}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011281 1804${tz2}`, `2011-10-08T18:04:00.000${tz}`],
            [`2011281 180420${tz2}`, `2011-10-08T18:04:20.000${tz}`],
            [`2011281 1804${tz3}`, `2011-10-08T18:${minutesForTz3}:00.000${tz}`],
            [`2011281 180420${tz3}`, `2011-10-08T18:${minutesForTz3}:20.000${tz}`],
            [`2011281 180420,1${tz2}`, `2011-10-08T18:04:20.100${tz}`],
            [`2011281 180420,11${tz2}`, `2011-10-08T18:04:20.110${tz}`],
            [`2011281 180420,111${tz2}`, `2011-10-08T18:04:20.111${tz}`]
        ];
        for (let i = 0; i < formats.length; i++) {
            assert.equal(ateos.datetime(formats[i][0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                formats[i][1], `ateos.datetime should be able to parse ISO ${formats[i][0]}`);
            assert.equal(ateos.datetime(formats[i][0], ateos.datetime.ISO_8601).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                formats[i][1], `ateos.datetime should be able to parse specified ISO ${formats[i][0]}`);
            assert.equal(ateos.datetime(formats[i][0], ateos.datetime.ISO_8601, true).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                formats[i][1], `ateos.datetime should be able to parse specified strict ISO ${formats[i][0]}`);
        }
    });

    it("non iso 8601 strings", () => {
        assert.ok(!ateos.datetime("2015-10T10:15", ateos.datetime.ISO_8601, true).isValid(), "incomplete date with time");
        assert.ok(!ateos.datetime("2015-W10T10:15", ateos.datetime.ISO_8601, true).isValid(), "incomplete week date with time");
        assert.ok(!ateos.datetime("201510", ateos.datetime.ISO_8601, true).isValid(), "basic YYYYMM is not allowed");
        assert.ok(!ateos.datetime("2015W10T1015", ateos.datetime.ISO_8601, true).isValid(), "incomplete week date with time (basic)");
        assert.ok(!ateos.datetime("2015-10-08T1015", ateos.datetime.ISO_8601, true).isValid(), "mixing extended and basic format");
        assert.ok(!ateos.datetime("20151008T10:15", ateos.datetime.ISO_8601, true).isValid(), "mixing basic and extended format");
        assert.ok(!ateos.datetime("2015-10-1", ateos.datetime.ISO_8601, true).isValid(), "missing zero padding for day");
    });

    it("parsing iso week year/week/weekday", () => {
        assert.equal(ateos.datetime.utc("2007-W01").format(), "2007-01-01T00:00:00Z", "2008 week 1 (1st Jan Mon)");
        assert.equal(ateos.datetime.utc("2008-W01").format(), "2007-12-31T00:00:00Z", "2008 week 1 (1st Jan Tue)");
        assert.equal(ateos.datetime.utc("2003-W01").format(), "2002-12-30T00:00:00Z", "2008 week 1 (1st Jan Wed)");
        assert.equal(ateos.datetime.utc("2009-W01").format(), "2008-12-29T00:00:00Z", "2009 week 1 (1st Jan Thu)");
        assert.equal(ateos.datetime.utc("2010-W01").format(), "2010-01-04T00:00:00Z", "2010 week 1 (1st Jan Fri)");
        assert.equal(ateos.datetime.utc("2011-W01").format(), "2011-01-03T00:00:00Z", "2011 week 1 (1st Jan Sat)");
        assert.equal(ateos.datetime.utc("2012-W01").format(), "2012-01-02T00:00:00Z", "2012 week 1 (1st Jan Sun)");
    });

    it("parsing weekdays verifies the day", () => {
        // string with format
        assert.ok(!ateos.datetime("Wed 08-10-2017", "ddd MM-DD-YYYY").isValid(), "because day of week is incorrect for the date");
        assert.ok(ateos.datetime("Thu 08-10-2017", "ddd MM-DD-YYYY").isValid(), "because day of week is correct for the date");
    });

    it("parsing weekday on utc dates verifies day acccording to utc time", () => {
        assert.ok(ateos.datetime.utc("Mon 03:59", "ddd HH:mm").isValid(), "Monday 03:59");
    });

    it("parsing weekday on local dates verifies day acccording to local time", () => {
        // this doesn't do much useful if you're not in the US or at least close to it
        assert.ok(ateos.datetime("Mon 03:59", "ddd HH:mm").isValid(), "Monday 03:59");
    });

    it("parsing weekday on utc dates with specified offsets verifies day acccording to that offset", () => {
        assert.ok(ateos.datetime.utc("Mon 03:59 +12:00", "ddd HH:mm Z", true).isValid(), "Monday 03:59");
    });

    it("parsing weekday on local dates with specified offsets verifies day acccording to that offset", () => {
        // if you're in the US, these times will all be sometime Sunday, but they shoud parse as Monday
        assert.ok(ateos.datetime("Mon 03:59 +12:00", "ddd HH:mm Z", true).isValid(), "Monday 03:59");
    });

    it("parsing week year/week/weekday (dow 1, doy 4)", () => {
        ateos.datetime.locale("dow:1,doy:4", { week: { dow: 1, doy: 4 } });

        assert.equal(ateos.datetime.utc("2007-01", "gggg-ww").format(), "2007-01-01T00:00:00Z", "2007 week 1 (1st Jan Mon)");
        assert.equal(ateos.datetime.utc("2008-01", "gggg-ww").format(), "2007-12-31T00:00:00Z", "2008 week 1 (1st Jan Tue)");
        assert.equal(ateos.datetime.utc("2003-01", "gggg-ww").format(), "2002-12-30T00:00:00Z", "2003 week 1 (1st Jan Wed)");
        assert.equal(ateos.datetime.utc("2009-01", "gggg-ww").format(), "2008-12-29T00:00:00Z", "2009 week 1 (1st Jan Thu)");
        assert.equal(ateos.datetime.utc("2010-01", "gggg-ww").format(), "2010-01-04T00:00:00Z", "2010 week 1 (1st Jan Fri)");
        assert.equal(ateos.datetime.utc("2011-01", "gggg-ww").format(), "2011-01-03T00:00:00Z", "2011 week 1 (1st Jan Sat)");
        assert.equal(ateos.datetime.utc("2012-01", "gggg-ww").format(), "2012-01-02T00:00:00Z", "2012 week 1 (1st Jan Sun)");

        ateos.datetime.defineLocale("dow:1,doy:4", null);
    });

    it("parsing week year/week/weekday (dow 1, doy 7)", () => {
        ateos.datetime.locale("dow:1,doy:7", { week: { dow: 1, doy: 7 } });

        assert.equal(ateos.datetime.utc("2007-01", "gggg-ww").format(), "2007-01-01T00:00:00Z", "2007 week 1 (1st Jan Mon)");
        assert.equal(ateos.datetime.utc("2008-01", "gggg-ww").format(), "2007-12-31T00:00:00Z", "2008 week 1 (1st Jan Tue)");
        assert.equal(ateos.datetime.utc("2003-01", "gggg-ww").format(), "2002-12-30T00:00:00Z", "2003 week 1 (1st Jan Wed)");
        assert.equal(ateos.datetime.utc("2009-01", "gggg-ww").format(), "2008-12-29T00:00:00Z", "2009 week 1 (1st Jan Thu)");
        assert.equal(ateos.datetime.utc("2010-01", "gggg-ww").format(), "2009-12-28T00:00:00Z", "2010 week 1 (1st Jan Fri)");
        assert.equal(ateos.datetime.utc("2011-01", "gggg-ww").format(), "2010-12-27T00:00:00Z", "2011 week 1 (1st Jan Sat)");
        assert.equal(ateos.datetime.utc("2012-01", "gggg-ww").format(), "2011-12-26T00:00:00Z", "2012 week 1 (1st Jan Sun)");
        ateos.datetime.defineLocale("dow:1,doy:7", null);
    });

    it("parsing week year/week/weekday (dow 0, doy 6)", () => {
        ateos.datetime.locale("dow:0,doy:6", { week: { dow: 0, doy: 6 } });

        assert.equal(ateos.datetime.utc("2007-01", "gggg-ww").format(), "2006-12-31T00:00:00Z", "2007 week 1 (1st Jan Mon)");
        assert.equal(ateos.datetime.utc("2008-01", "gggg-ww").format(), "2007-12-30T00:00:00Z", "2008 week 1 (1st Jan Tue)");
        assert.equal(ateos.datetime.utc("2003-01", "gggg-ww").format(), "2002-12-29T00:00:00Z", "2003 week 1 (1st Jan Wed)");
        assert.equal(ateos.datetime.utc("2009-01", "gggg-ww").format(), "2008-12-28T00:00:00Z", "2009 week 1 (1st Jan Thu)");
        assert.equal(ateos.datetime.utc("2010-01", "gggg-ww").format(), "2009-12-27T00:00:00Z", "2010 week 1 (1st Jan Fri)");
        assert.equal(ateos.datetime.utc("2011-01", "gggg-ww").format(), "2010-12-26T00:00:00Z", "2011 week 1 (1st Jan Sat)");
        assert.equal(ateos.datetime.utc("2012-01", "gggg-ww").format(), "2012-01-01T00:00:00Z", "2012 week 1 (1st Jan Sun)");
        ateos.datetime.defineLocale("dow:0,doy:6", null);
    });

    it("parsing week year/week/weekday (dow 6, doy 12)", () => {
        ateos.datetime.locale("dow:6,doy:12", { week: { dow: 6, doy: 12 } });

        assert.equal(ateos.datetime.utc("2007-01", "gggg-ww").format(), "2006-12-30T00:00:00Z", "2007 week 1 (1st Jan Mon)");
        assert.equal(ateos.datetime.utc("2008-01", "gggg-ww").format(), "2007-12-29T00:00:00Z", "2008 week 1 (1st Jan Tue)");
        assert.equal(ateos.datetime.utc("2003-01", "gggg-ww").format(), "2002-12-28T00:00:00Z", "2003 week 1 (1st Jan Wed)");
        assert.equal(ateos.datetime.utc("2009-01", "gggg-ww").format(), "2008-12-27T00:00:00Z", "2009 week 1 (1st Jan Thu)");
        assert.equal(ateos.datetime.utc("2010-01", "gggg-ww").format(), "2009-12-26T00:00:00Z", "2010 week 1 (1st Jan Fri)");
        assert.equal(ateos.datetime.utc("2011-01", "gggg-ww").format(), "2011-01-01T00:00:00Z", "2011 week 1 (1st Jan Sat)");
        assert.equal(ateos.datetime.utc("2012-01", "gggg-ww").format(), "2011-12-31T00:00:00Z", "2012 week 1 (1st Jan Sun)");
        ateos.datetime.defineLocale("dow:6,doy:12", null);
    });

    it("parsing ISO with Z", () => {
        const formats = [
            ["2011-10-08T18:04", "2011-10-08T18:04:00.000"],
            ["2011-10-08T18:04:20", "2011-10-08T18:04:20.000"],
            ["2011-10-08T18:04:20.1", "2011-10-08T18:04:20.100"],
            ["2011-10-08T18:04:20.11", "2011-10-08T18:04:20.110"],
            ["2011-10-08T18:04:20.111", "2011-10-08T18:04:20.111"],
            ["2011-W40-6T18", "2011-10-08T18:00:00.000"],
            ["2011-W40-6T18:04", "2011-10-08T18:04:00.000"],
            ["2011-W40-6T18:04:20", "2011-10-08T18:04:20.000"],
            ["2011-W40-6T18:04:20.1", "2011-10-08T18:04:20.100"],
            ["2011-W40-6T18:04:20.11", "2011-10-08T18:04:20.110"],
            ["2011-W40-6T18:04:20.111", "2011-10-08T18:04:20.111"],
            ["2011-281T18", "2011-10-08T18:00:00.000"],
            ["2011-281T18:04", "2011-10-08T18:04:00.000"],
            ["2011-281T18:04:20", "2011-10-08T18:04:20.000"],
            ["2011-281T18:04:20", "2011-10-08T18:04:20.000"],
            ["2011-281T18:04:20.1", "2011-10-08T18:04:20.100"],
            ["2011-281T18:04:20.11", "2011-10-08T18:04:20.110"],
            ["2011-281T18:04:20.111", "2011-10-08T18:04:20.111"]
        ];

        for (let i = 0; i < formats.length; i++) {
            let mom = ateos.datetime(`${formats[i][0]}Z`).utc();
            assert.equal(mom.format("YYYY-MM-DDTHH:mm:ss.SSS"), formats[i][1], `ateos.datetime should be able to parse ISO in UTC ${formats[i][0]}Z`);

            mom = ateos.datetime(`${formats[i][0]} Z`).utc();
            assert.equal(mom.format("YYYY-MM-DDTHH:mm:ss.SSS"), formats[i][1], `ateos.datetime should be able to parse ISO in UTC ${formats[i][0]} Z`);
        }
    });

    it("parsing iso with T", () => {
        assert.equal(ateos.datetime("2011-10-08T18")._f, "YYYY-MM-DDTHH", "should include 'T' in the format");
        assert.equal(ateos.datetime("2011-10-08T18:20")._f, "YYYY-MM-DDTHH:mm", "should include 'T' in the format");
        assert.equal(ateos.datetime("2011-10-08T18:20:13")._f, "YYYY-MM-DDTHH:mm:ss", "should include 'T' in the format");
        assert.equal(ateos.datetime("2011-10-08T18:20:13.321")._f, "YYYY-MM-DDTHH:mm:ss.SSSS", "should include 'T' in the format");

        assert.equal(ateos.datetime("2011-10-08 18")._f, "YYYY-MM-DD HH", "should not include 'T' in the format");
        assert.equal(ateos.datetime("2011-10-08 18:20")._f, "YYYY-MM-DD HH:mm", "should not include 'T' in the format");
        assert.equal(ateos.datetime("2011-10-08 18:20:13")._f, "YYYY-MM-DD HH:mm:ss", "should not include 'T' in the format");
        assert.equal(ateos.datetime("2011-10-08 18:20:13.321")._f, "YYYY-MM-DD HH:mm:ss.SSSS", "should not include 'T' in the format");
    });

    it("parsing iso Z timezone", () => {
        const formats = [
            ["2011-10-08T18:04Z", "2011-10-08T18:04:00.000+00:00"],
            ["2011-10-08T18:04:20Z", "2011-10-08T18:04:20.000+00:00"],
            ["2011-10-08T18:04:20.111Z", "2011-10-08T18:04:20.111+00:00"]
        ];
        for (let i = 0; i < formats.length; i++) {
            assert.equal(ateos.datetime.utc(formats[i][0]).format("YYYY-MM-DDTHH:mm:ss.SSSZ"), formats[i][1], `ateos.datetime should be able to parse ISO ${formats[i][0]}`);
        }
    });

    it("parsing iso Z timezone into local", () => {
        const m = ateos.datetime("2011-10-08T18:04:20.111Z");

        assert.equal(m.utc().format("YYYY-MM-DDTHH:mm:ss.SSS"), "2011-10-08T18:04:20.111", "ateos.datetime should be able to parse ISO 2011-10-08T18:04:20.111Z");
    });

    it("parsing iso with more subsecond precision digits", () => {
        assert.equal(ateos.datetime.utc("2013-07-31T22:00:00.0000000Z").format(), "2013-07-31T22:00:00Z", "more than 3 subsecond digits");
    });

    it("null or empty", () => {
        assert.equal(ateos.datetime("").isValid(), false, "ateos.datetime('') is not valid");
        assert.equal(ateos.datetime(null).isValid(), false, "ateos.datetime(null) is not valid");
        assert.equal(ateos.datetime(null, "YYYY-MM-DD").isValid(), false, "ateos.datetime('', 'format') is not valid");
        assert.equal(ateos.datetime("", "YYYY-MM-DD").isValid(), false, "ateos.datetime('', 'format') is not valid");
        assert.equal(ateos.datetime.utc("").isValid(), false, "ateos.datetime.utc('') is not valid");
        assert.equal(ateos.datetime.utc(null).isValid(), false, "ateos.datetime.utc(null) is not valid");
        assert.equal(ateos.datetime.utc(null, "YYYY-MM-DD").isValid(), false, "ateos.datetime.utc(null) is not valid");
        assert.equal(ateos.datetime.utc("", "YYYY-MM-DD").isValid(), false, "ateos.datetime.utc('', 'YYYY-MM-DD') is not valid");
    });

    it("first century", () => {
        assert.equal(ateos.datetime([0, 0, 1]).format("YYYY-MM-DD"), "0000-01-01", "Year AD 0");
        assert.equal(ateos.datetime([99, 0, 1]).format("YYYY-MM-DD"), "0099-01-01", "Year AD 99");
        assert.equal(ateos.datetime([999, 0, 1]).format("YYYY-MM-DD"), "0999-01-01", "Year AD 999");
        assert.equal(ateos.datetime("0 1 1", "YYYY MM DD").format("YYYY-MM-DD"), "0000-01-01", "Year AD 0");
        assert.equal(ateos.datetime("999 1 1", "YYYY MM DD").format("YYYY-MM-DD"), "0999-01-01", "Year AD 999");
        assert.equal(ateos.datetime("0 1 1", "YYYYY MM DD").format("YYYYY-MM-DD"), "00000-01-01", "Year AD 0");
        assert.equal(ateos.datetime("99 1 1", "YYYYY MM DD").format("YYYYY-MM-DD"), "00099-01-01", "Year AD 99");
        assert.equal(ateos.datetime("999 1 1", "YYYYY MM DD").format("YYYYY-MM-DD"), "00999-01-01", "Year AD 999");
    });

    it("six digit years", () => {
        assert.equal(ateos.datetime([-270000, 0, 1]).format("YYYYY-MM-DD"), "-270000-01-01", "format BC 270,001");
        assert.equal(ateos.datetime([270000, 0, 1]).format("YYYYY-MM-DD"), "270000-01-01", "format AD 270,000");
        assert.equal(ateos.datetime("-270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), -270000, "parse BC 270,001");
        assert.equal(ateos.datetime("270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), 270000, "parse AD 270,000");
        assert.equal(ateos.datetime("+270000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), 270000, "parse AD +270,000");
        assert.equal(ateos.datetime.utc("-270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), -270000, "parse utc BC 270,001");
        assert.equal(ateos.datetime.utc("270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), 270000, "parse utc AD 270,000");
        assert.equal(ateos.datetime.utc("+270000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), 270000, "parse utc AD +270,000");
    });

    it("negative four digit years", () => {
        assert.equal(ateos.datetime("-1000-01-01", "YYYYY-MM-DD").toDate().getFullYear(), -1000, "parse BC 1,001");
        assert.equal(ateos.datetime.utc("-1000-01-01", "YYYYY-MM-DD").toDate().getUTCFullYear(), -1000, "parse utc BC 1,001");
    });

    it("strict parsing", () => {
        assert.equal(ateos.datetime("2014-", "YYYY-Q", true).isValid(), false, "fail missing quarter");

        assert.equal(ateos.datetime("2012-05", "YYYY-MM", true).format("YYYY-MM"), "2012-05", "parse correct string");
        assert.equal(ateos.datetime(" 2012-05", "YYYY-MM", true).isValid(), false, "fail on extra whitespace");
        assert.equal(ateos.datetime("foo 2012-05", "[foo] YYYY-MM", true).format("YYYY-MM"), "2012-05", "handle fixed text");
        assert.equal(ateos.datetime("2012 05", "YYYY-MM", true).isValid(), false, "fail on different separator");
        assert.equal(ateos.datetime("2012 05", "YYYY MM DD", true).isValid(), false, "fail on too many tokens");

        assert.equal(ateos.datetime("05 30 2010", ["DD MM YYYY", "MM DD YYYY"], true).format("MM DD YYYY"), "05 30 2010", "array with bad date");
        assert.equal(ateos.datetime("05 30 2010", ["", "MM DD YYYY"], true).format("MM DD YYYY"), "05 30 2010", "array with invalid format");
        assert.equal(ateos.datetime("05 30 2010", [" DD MM YYYY", "MM DD YYYY"], true).format("MM DD YYYY"), "05 30 2010", "array with non-matching format");

        assert.equal(ateos.datetime("2010.*...", "YYYY.*", true).isValid(), false, "invalid format with regex chars");
        assert.equal(ateos.datetime("2010.*", "YYYY.*", true).year(), 2010, "valid format with regex chars");
        assert.equal(ateos.datetime(".*2010.*", ".*YYYY.*", true).year(), 2010, "valid format with regex chars on both sides");

        //strict tokens
        assert.equal(ateos.datetime("-5-05-25", "YYYY-MM-DD", true).isValid(), false, "invalid negative year");
        assert.equal(ateos.datetime("2-05-25", "YYYY-MM-DD", true).isValid(), false, "invalid one-digit year");
        assert.equal(ateos.datetime("20-05-25", "YYYY-MM-DD", true).isValid(), false, "invalid two-digit year");
        assert.equal(ateos.datetime("201-05-25", "YYYY-MM-DD", true).isValid(), false, "invalid three-digit year");
        assert.equal(ateos.datetime("2010-05-25", "YYYY-MM-DD", true).isValid(), true, "valid four-digit year");
        assert.equal(ateos.datetime("22010-05-25", "YYYY-MM-DD", true).isValid(), false, "invalid five-digit year");

        assert.equal(ateos.datetime("12-05-25", "YY-MM-DD", true).isValid(), true, "valid two-digit year");
        assert.equal(ateos.datetime("2012-05-25", "YY-MM-DD", true).isValid(), false, "invalid four-digit year");

        assert.equal(ateos.datetime("-5-05-25", "Y-MM-DD", true).isValid(), true, "valid negative year");
        assert.equal(ateos.datetime("2-05-25", "Y-MM-DD", true).isValid(), true, "valid one-digit year");
        assert.equal(ateos.datetime("20-05-25", "Y-MM-DD", true).isValid(), true, "valid two-digit year");
        assert.equal(ateos.datetime("201-05-25", "Y-MM-DD", true).isValid(), true, "valid three-digit year");

        assert.equal(ateos.datetime("2012-5-25", "YYYY-M-DD", true).isValid(), true, "valid one-digit month");
        assert.equal(ateos.datetime("2012-5-25", "YYYY-MM-DD", true).isValid(), false, "invalid one-digit month");
        assert.equal(ateos.datetime("2012-05-25", "YYYY-M-DD", true).isValid(), true, "valid one-digit month");
        assert.equal(ateos.datetime("2012-05-25", "YYYY-MM-DD", true).isValid(), true, "valid one-digit month");

        assert.equal(ateos.datetime("2012-05-2", "YYYY-MM-D", true).isValid(), true, "valid one-digit day");
        assert.equal(ateos.datetime("2012-05-2", "YYYY-MM-DD", true).isValid(), false, "invalid one-digit day");
        assert.equal(ateos.datetime("2012-05-02", "YYYY-MM-D", true).isValid(), true, "valid two-digit day");
        assert.equal(ateos.datetime("2012-05-02", "YYYY-MM-DD", true).isValid(), true, "valid two-digit day");

        assert.equal(ateos.datetime("+002012-05-25", "YYYYY-MM-DD", true).isValid(), true, "valid six-digit year");
        assert.equal(ateos.datetime("+2012-05-25", "YYYYY-MM-DD", true).isValid(), false, "invalid four-digit year");

        //thse are kinda pointless, but they should work as expected
        assert.equal(ateos.datetime("1", "S", true).isValid(), true, "valid one-digit milisecond");
        assert.equal(ateos.datetime("12", "S", true).isValid(), false, "invalid two-digit milisecond");
        assert.equal(ateos.datetime("123", "S", true).isValid(), false, "invalid three-digit milisecond");

        assert.equal(ateos.datetime("1", "SS", true).isValid(), false, "invalid one-digit milisecond");
        assert.equal(ateos.datetime("12", "SS", true).isValid(), true, "valid two-digit milisecond");
        assert.equal(ateos.datetime("123", "SS", true).isValid(), false, "invalid three-digit milisecond");

        assert.equal(ateos.datetime("1", "SSS", true).isValid(), false, "invalid one-digit milisecond");
        assert.equal(ateos.datetime("12", "SSS", true).isValid(), false, "invalid two-digit milisecond");
        assert.equal(ateos.datetime("123", "SSS", true).isValid(), true, "valid three-digit milisecond");

        // strict parsing respects month length
        assert.ok(ateos.datetime("1 January 2000", "D MMMM YYYY", true).isValid(), "capital long-month + MMMM");
        assert.ok(!ateos.datetime("1 January 2000", "D MMM YYYY", true).isValid(), "capital long-month + MMM");
        assert.ok(!ateos.datetime("1 Jan 2000", "D MMMM YYYY", true).isValid(), "capital short-month + MMMM");
        assert.ok(ateos.datetime("1 Jan 2000", "D MMM YYYY", true).isValid(), "capital short-month + MMM");
        assert.ok(ateos.datetime("1 january 2000", "D MMMM YYYY", true).isValid(), "lower long-month + MMMM");
        assert.ok(!ateos.datetime("1 january 2000", "D MMM YYYY", true).isValid(), "lower long-month + MMM");
        assert.ok(!ateos.datetime("1 jan 2000", "D MMMM YYYY", true).isValid(), "lower short-month + MMMM");
        assert.ok(ateos.datetime("1 jan 2000", "D MMM YYYY", true).isValid(), "lower short-month + MMM");
    });

    it("parsing into a locale", () => {
        ateos.datetime.defineLocale("parselocale", {
            months: "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_"),
            monthsShort: "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_")
        });

        ateos.datetime.locale("en");

        assert.equal(ateos.datetime("2012 seven", "YYYY MMM", "parselocale").month(), 6, "should be able to parse in a specific locale");

        ateos.datetime.locale("parselocale");

        assert.equal(ateos.datetime("2012 july", "YYYY MMM", "en").month(), 6, "should be able to parse in a specific locale");

        ateos.datetime.defineLocale("parselocale", null);
    });

    function getVerifier(test) {
        return function (input, format, expected, description, asymetrical) {
            const m = ateos.datetime(input, format);
            test.equal(m.format("YYYY MM DD"), expected, `compare: ${description}`);

            //test round trip
            if (!asymetrical) {
                test.equal(m.format(format), input, `round trip: ${description}`);
            }
        };
    }

    it("parsing week and weekday information", () => {
        const ver = getVerifier(assert);
        const currentWeekOfYear = ateos.datetime().weeks();
        const expectedDate2012 = ateos.datetime([2012, 0, 1])
            .day(0)
            .add(currentWeekOfYear - 1, "weeks")
            .format("YYYY MM DD");
        const expectedDate1999 = ateos.datetime([1999, 0, 1])
            .day(0)
            .add(currentWeekOfYear - 1, "weeks")
            .format("YYYY MM DD");

        // year
        ver("12", "gg", expectedDate2012, "week-year two digits");
        ver("2012", "gggg", expectedDate2012, "week-year four digits");
        ver("99", "gg", expectedDate1999, "week-year two digits previous year");
        ver("1999", "gggg", expectedDate1999, "week-year four digits previous year");

        ver("99", "GG", "1999 01 04", "iso week-year two digits");
        ver("1999", "GGGG", "1999 01 04", "iso week-year four digits");

        ver("13", "GG", "2012 12 31", "iso week-year two digits previous year");
        ver("2013", "GGGG", "2012 12 31", "iso week-year four digits previous year");

        // year + week
        ver("1999 37", "gggg w", "1999 09 05", "week");
        ver("1999 37", "gggg ww", "1999 09 05", "week double");
        ver("1999 37", "GGGG W", "1999 09 13", "iso week");
        ver("1999 37", "GGGG WW", "1999 09 13", "iso week double");

        ver("1999 37 4", "GGGG WW E", "1999 09 16", "iso day");
        ver("1999 37 04", "GGGG WW E", "1999 09 16", "iso day wide", true);

        ver("1999 37 4", "gggg ww e", "1999 09 09", "day");
        ver("1999 37 04", "gggg ww e", "1999 09 09", "day wide", true);

        // year + week + day
        ver("1999 37 4", "gggg ww d", "1999 09 09", "d");
        ver("1999 37 Th", "gggg ww dd", "1999 09 09", "dd");
        ver("1999 37 Thu", "gggg ww ddd", "1999 09 09", "ddd");
        ver("1999 37 Thursday", "gggg ww dddd", "1999 09 09", "dddd");

        // lower-order only
        assert.equal(ateos.datetime("22", "ww").week(), 22, "week sets the week by itself");
        assert.equal(ateos.datetime("22", "ww").weekYear(), ateos.datetime().weekYear(), "week keeps this year");
        assert.equal(ateos.datetime("2012 22", "YYYY ww").weekYear(), 2012, "week keeps parsed year");

        assert.equal(ateos.datetime("22", "WW").isoWeek(), 22, "iso week sets the week by itself");
        assert.equal(ateos.datetime("2012 22", "YYYY WW").weekYear(), 2012, "iso week keeps parsed year");
        assert.equal(ateos.datetime("22", "WW").isoWeekYear(), ateos.datetime().isoWeekYear(), "iso week keeps this year");

        // order
        ver("6 2013 2", "e gggg w", "2013 01 12", "order doesn't matter");
        ver("6 2013 2", "E GGGG W", "2013 01 12", "iso order doesn't matter");

        //can parse other stuff too
        assert.equal(ateos.datetime("1999-W37-4 3:30", "GGGG-[W]WW-E HH:mm").format("YYYY MM DD HH:mm"), "1999 09 16 03:30", "parsing weeks and hours");

        // In safari, all years before 1300 are shifted back with one day.
        // http://stackoverflow.com/questions/20768975/safari-subtracts-1-day-from-dates-before-1300
        if (new Date("1300-01-01").getUTCFullYear() === 1300) {
            // Years less than 100
            ver("0098-06", "GGGG-WW", "0098 02 03", "small years work", true);
        }
    });

    it("parsing localized weekdays", () => {
        const ver = getVerifier(assert);
        try {
            ateos.datetime.locale("dow:1,doy:4", {
                weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
                weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
                weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
                week: { dow: 1, doy: 4 }
            });
            ver("1999 37 4", "GGGG WW E", "1999 09 16", "iso ignores locale");
            ver("1999 37 7", "GGGG WW E", "1999 09 19", "iso ignores locale");

            ver("1999 37 0", "gggg ww e", "1999 09 13", "localized e uses local doy and dow: 0 = monday");
            ver("1999 37 4", "gggg ww e", "1999 09 17", "localized e uses local doy and dow: 4 = friday");

            ver("1999 37 1", "gggg ww d", "1999 09 13", "localized d uses 0-indexed days: 1 = monday");
            ver("1999 37 Lu", "gggg ww dd", "1999 09 13", "localized d uses 0-indexed days: Mo");
            ver("1999 37 lun.", "gggg ww ddd", "1999 09 13", "localized d uses 0-indexed days: Mon");
            ver("1999 37 lundi", "gggg ww dddd", "1999 09 13", "localized d uses 0-indexed days: Monday");
            ver("1999 37 4", "gggg ww d", "1999 09 16", "localized d uses 0-indexed days: 4");

            //sunday goes at the end of the week
            ver("1999 37 0", "gggg ww d", "1999 09 19", "localized d uses 0-indexed days: 0 = sund");
            ver("1999 37 Di", "gggg ww dd", "1999 09 19", "localized d uses 0-indexed days: 0 = sund");
        } finally {
            ateos.datetime.defineLocale("dow:1,doy:4", null);
            ateos.datetime.locale("en");
        }
    });

    it("parsing with customized two-digit year", () => {
        const original = ateos.datetime.parseTwoDigitYear;
        try {
            assert.equal(ateos.datetime("68", "YY").year(), 2068);
            assert.equal(ateos.datetime("69", "YY").year(), 1969);
            ateos.datetime.parseTwoDigitYear = function (input) {
                return Number(input) + (Number(input) > 30 ? 1900 : 2000);
            };
            assert.equal(ateos.datetime("68", "YY").year(), 1968);
            assert.equal(ateos.datetime("67", "YY").year(), 1967);
            assert.equal(ateos.datetime("31", "YY").year(), 1931);
            assert.equal(ateos.datetime("30", "YY").year(), 2030);
        } finally {
            ateos.datetime.parseTwoDigitYear = original;
        }
    });

    it("array with strings", () => {
        assert.equal(ateos.datetime(["2014", "7", "31"]).isValid(), true, "string array + isValid");
    });

    it("object with strings", () => {
        assert.equal(ateos.datetime({ year: "2014", month: "7", day: "31" }).isValid(), true, "string object + isValid");
    });

    it("utc with array of formats", () => {
        assert.equal(ateos.datetime.utc("2014-01-01", ["YYYY-MM-DD", "YYYY-MM"]).format(), "2014-01-01T00:00:00Z", "ateos.datetime.utc works with array of formats");
    });

    it("parsing invalid string weekdays", () => {
        assert.equal(false, ateos.datetime("a", "dd").isValid(),
            "dd with invalid weekday, non-strict");
        assert.equal(false, ateos.datetime("a", "dd", true).isValid(),
            "dd with invalid weekday, strict");
        assert.equal(false, ateos.datetime("a", "ddd").isValid(),
            "ddd with invalid weekday, non-strict");
        assert.equal(false, ateos.datetime("a", "ddd", true).isValid(),
            "ddd with invalid weekday, strict");
        assert.equal(false, ateos.datetime("a", "dddd").isValid(),
            "dddd with invalid weekday, non-strict");
        assert.equal(false, ateos.datetime("a", "dddd", true).isValid(),
            "dddd with invalid weekday, strict");
    });

    it("milliseconds", () => {
        assert.equal(ateos.datetime("1", "S").millisecond(), 100);
        assert.equal(ateos.datetime("12", "SS").millisecond(), 120);
        assert.equal(ateos.datetime("123", "SSS").millisecond(), 123);
        assert.equal(ateos.datetime("1234", "SSSS").millisecond(), 123);
        assert.equal(ateos.datetime("12345", "SSSSS").millisecond(), 123);
        assert.equal(ateos.datetime("123456", "SSSSSS").millisecond(), 123);
        assert.equal(ateos.datetime("1234567", "SSSSSSS").millisecond(), 123);
        assert.equal(ateos.datetime("12345678", "SSSSSSSS").millisecond(), 123);
        assert.equal(ateos.datetime("123456789", "SSSSSSSSS").millisecond(), 123);
    });

    it("hmm", () => {
        assert.equal(ateos.datetime("123", "hmm", true).format("HH:mm:ss"), "01:23:00", "123 with hmm");
        assert.equal(ateos.datetime("123a", "hmmA", true).format("HH:mm:ss"), "01:23:00", "123a with hmmA");
        assert.equal(ateos.datetime("123p", "hmmA", true).format("HH:mm:ss"), "13:23:00", "123p with hmmA");

        assert.equal(ateos.datetime("1234", "hmm", true).format("HH:mm:ss"), "12:34:00", "1234 with hmm");
        assert.equal(ateos.datetime("1234a", "hmmA", true).format("HH:mm:ss"), "00:34:00", "1234a with hmmA");
        assert.equal(ateos.datetime("1234p", "hmmA", true).format("HH:mm:ss"), "12:34:00", "1234p with hmmA");

        assert.equal(ateos.datetime("12345", "hmmss", true).format("HH:mm:ss"), "01:23:45", "12345 with hmmss");
        assert.equal(ateos.datetime("12345a", "hmmssA", true).format("HH:mm:ss"), "01:23:45", "12345a with hmmssA");
        assert.equal(ateos.datetime("12345p", "hmmssA", true).format("HH:mm:ss"), "13:23:45", "12345p with hmmssA");
        assert.equal(ateos.datetime("112345", "hmmss", true).format("HH:mm:ss"), "11:23:45", "112345 with hmmss");
        assert.equal(ateos.datetime("112345a", "hmmssA", true).format("HH:mm:ss"), "11:23:45", "112345a with hmmssA");
        assert.equal(ateos.datetime("112345p", "hmmssA", true).format("HH:mm:ss"), "23:23:45", "112345p with hmmssA");

        assert.equal(ateos.datetime("023", "Hmm", true).format("HH:mm:ss"), "00:23:00", "023 with Hmm");
        assert.equal(ateos.datetime("123", "Hmm", true).format("HH:mm:ss"), "01:23:00", "123 with Hmm");
        assert.equal(ateos.datetime("1234", "Hmm", true).format("HH:mm:ss"), "12:34:00", "1234 with Hmm");
        assert.equal(ateos.datetime("1534", "Hmm", true).format("HH:mm:ss"), "15:34:00", "1234 with Hmm");
        assert.equal(ateos.datetime("12345", "Hmmss", true).format("HH:mm:ss"), "01:23:45", "12345 with Hmmss");
        assert.equal(ateos.datetime("112345", "Hmmss", true).format("HH:mm:ss"), "11:23:45", "112345 with Hmmss");
        assert.equal(ateos.datetime("172345", "Hmmss", true).format("HH:mm:ss"), "17:23:45", "112345 with Hmmss");
    });

    it("Y token", () => {
        assert.equal(ateos.datetime("1-1-2010", "M-D-Y", true).year(), 2010, "parsing Y");
    });

    it("parsing flags retain parsed date parts", () => {
        const a = ateos.datetime("10 p", "hh:mm a");
        assert.equal(a.parsingFlags().parsedDateParts[3], 10, "parsed 10 as the hour");
        assert.equal(a.parsingFlags().parsedDateParts[0], undefined, "year was not parsed");
        assert.equal(a.parsingFlags().meridiem, "p", "meridiem flag was added");
        const b = ateos.datetime("10:30", ["MMDDYY", "HH:mm"]);
        assert.equal(b.parsingFlags().parsedDateParts[3], 10, "multiple format parshing matched hour");
        assert.equal(b.parsingFlags().parsedDateParts[0], undefined, "array is properly copied, no residual data from first token parse");
    });

    it("parsing only meridiem results in invalid date", () => {
        assert.ok(!ateos.datetime("alkj", "hh:mm a").isValid(), "because an a token is used, a meridiem will be parsed but nothing else was so invalid");
        assert.ok(ateos.datetime("02:30 p more extra stuff", "hh:mm a").isValid(), "because other tokens were parsed, date is valid");
        assert.ok(ateos.datetime("1/1/2016 extra data", ["a", "M/D/YYYY"]).isValid(), "took second format, does not pick up on meridiem parsed from first format (good copy)");
    });

    it("invalid dates return invalid for methods that access the _d prop", () => {
        const momentAsDate = ateos.datetime(["2015", "12", "1"]).toDate();
        assert.ok(momentAsDate instanceof Date, "toDate returns a Date object");
        assert.ok(isNaN(momentAsDate.getTime()), "toDate returns an invalid Date invalid");
    });

    it("k, kk", () => {
        for (let i = -1; i <= 24; i++) {
            const kVal = `${i}:15:59`;
            const kkVal = `${(i < 10 ? "0" : "") + i}:15:59`;
            if (i !== 24) {
                assert.ok(ateos.datetime(kVal, "k:mm:ss").isSame(ateos.datetime(kVal, "H:mm:ss")), `${kVal} k parsing`);
                assert.ok(ateos.datetime(kkVal, "kk:mm:ss").isSame(ateos.datetime(kkVal, "HH:mm:ss")), `${kkVal} kk parsing`);
            } else {
                assert.equal(ateos.datetime(kVal, "k:mm:ss").format("k:mm:ss"), kVal, `${kVal} k parsing`);
                assert.equal(ateos.datetime(kkVal, "kk:mm:ss").format("kk:mm:ss"), kkVal, `${kkVal} skk parsing`);
            }
        }
    });
});
