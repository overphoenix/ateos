describe("datetime", "duration", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("object instantiation", () => {
        const d = ateos.datetime.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        assert.equal(d.years(), 2, "years");
        assert.equal(d.months(), 3, "months");
        assert.equal(d.weeks(), 2, "weeks");
        assert.equal(d.days(), 15, "days"); // two weeks + 1 day
        assert.equal(d.hours(), 8, "hours");
        assert.equal(d.minutes(), 9, "minutes");
        assert.equal(d.seconds(), 20, "seconds");
        assert.equal(d.milliseconds(), 12, "milliseconds");
    });

    it("object instantiation with strings", () => {
        const d = ateos.datetime.duration({
            years: "2",
            months: "3",
            weeks: "2",
            days: "1",
            hours: "8",
            minutes: "9",
            seconds: "20",
            milliseconds: "12"
        });

        assert.equal(d.years(), 2, "years");
        assert.equal(d.months(), 3, "months");
        assert.equal(d.weeks(), 2, "weeks");
        assert.equal(d.days(), 15, "days"); // two weeks + 1 day
        assert.equal(d.hours(), 8, "hours");
        assert.equal(d.minutes(), 9, "minutes");
        assert.equal(d.seconds(), 20, "seconds");
        assert.equal(d.milliseconds(), 12, "milliseconds");
    });

    it("milliseconds instantiation", () => {
        assert.equal(ateos.datetime.duration(72).milliseconds(), 72, "milliseconds");
        assert.equal(ateos.datetime.duration(72).humanize(), "a few seconds", "Duration should be valid");
    });

    it("undefined instantiation", () => {
        assert.equal(ateos.datetime.duration(undefined).milliseconds(), 0, "milliseconds");
        assert.equal(ateos.datetime.duration(undefined).isValid(), true, "_isValid");
        assert.equal(ateos.datetime.duration(undefined).humanize(), "a few seconds", "Duration should be valid");
    });

    it("null instantiation", () => {
        assert.equal(ateos.datetime.duration(null).milliseconds(), 0, "milliseconds");
        assert.equal(ateos.datetime.duration(null).isValid(), true, "_isValid");
        assert.equal(ateos.datetime.duration(null).humanize(), "a few seconds", "Duration should be valid");
    });

    it("NaN instantiation", () => {
        assert.ok(isNaN(ateos.datetime.duration(NaN).milliseconds()), "milliseconds should be NaN");
        assert.equal(ateos.datetime.duration(NaN).isValid(), false, "_isValid");
        assert.equal(ateos.datetime.duration(NaN).humanize(), "Invalid date", "Duration should be invalid");
    });


    it("instantiation by type", () => {
        assert.equal(ateos.datetime.duration(1, "years").years(), 1, "years");
        assert.equal(ateos.datetime.duration(1, "y").years(), 1, "y");
        assert.equal(ateos.datetime.duration(2, "months").months(), 2, "months");
        assert.equal(ateos.datetime.duration(2, "M").months(), 2, "M");
        assert.equal(ateos.datetime.duration(3, "weeks").weeks(), 3, "weeks");
        assert.equal(ateos.datetime.duration(3, "w").weeks(), 3, "weeks");
        assert.equal(ateos.datetime.duration(4, "days").days(), 4, "days");
        assert.equal(ateos.datetime.duration(4, "d").days(), 4, "d");
        assert.equal(ateos.datetime.duration(5, "hours").hours(), 5, "hours");
        assert.equal(ateos.datetime.duration(5, "h").hours(), 5, "h");
        assert.equal(ateos.datetime.duration(6, "minutes").minutes(), 6, "minutes");
        assert.equal(ateos.datetime.duration(6, "m").minutes(), 6, "m");
        assert.equal(ateos.datetime.duration(7, "seconds").seconds(), 7, "seconds");
        assert.equal(ateos.datetime.duration(7, "s").seconds(), 7, "s");
        assert.equal(ateos.datetime.duration(8, "milliseconds").milliseconds(), 8, "milliseconds");
        assert.equal(ateos.datetime.duration(8, "ms").milliseconds(), 8, "ms");
    });

    it("shortcuts", () => {
        assert.equal(ateos.datetime.duration({ y: 1 }).years(), 1, "years = y");
        assert.equal(ateos.datetime.duration({ M: 2 }).months(), 2, "months = M");
        assert.equal(ateos.datetime.duration({ w: 3 }).weeks(), 3, "weeks = w");
        assert.equal(ateos.datetime.duration({ d: 4 }).days(), 4, "days = d");
        assert.equal(ateos.datetime.duration({ h: 5 }).hours(), 5, "hours = h");
        assert.equal(ateos.datetime.duration({ m: 6 }).minutes(), 6, "minutes = m");
        assert.equal(ateos.datetime.duration({ s: 7 }).seconds(), 7, "seconds = s");
        assert.equal(ateos.datetime.duration({ ms: 8 }).milliseconds(), 8, "milliseconds = ms");
    });

    it("generic getter", () => {
        assert.equal(ateos.datetime.duration(1, "years").get("years"), 1, "years");
        assert.equal(ateos.datetime.duration(1, "years").get("year"), 1, "years = year");
        assert.equal(ateos.datetime.duration(1, "years").get("y"), 1, "years = y");
        assert.equal(ateos.datetime.duration(2, "months").get("months"), 2, "months");
        assert.equal(ateos.datetime.duration(2, "months").get("month"), 2, "months = month");
        assert.equal(ateos.datetime.duration(2, "months").get("M"), 2, "months = M");
        assert.equal(ateos.datetime.duration(3, "weeks").get("weeks"), 3, "weeks");
        assert.equal(ateos.datetime.duration(3, "weeks").get("week"), 3, "weeks = week");
        assert.equal(ateos.datetime.duration(3, "weeks").get("w"), 3, "weeks = w");
        assert.equal(ateos.datetime.duration(4, "days").get("days"), 4, "days");
        assert.equal(ateos.datetime.duration(4, "days").get("day"), 4, "days = day");
        assert.equal(ateos.datetime.duration(4, "days").get("d"), 4, "days = d");
        assert.equal(ateos.datetime.duration(5, "hours").get("hours"), 5, "hours");
        assert.equal(ateos.datetime.duration(5, "hours").get("hour"), 5, "hours = hour");
        assert.equal(ateos.datetime.duration(5, "hours").get("h"), 5, "hours = h");
        assert.equal(ateos.datetime.duration(6, "minutes").get("minutes"), 6, "minutes");
        assert.equal(ateos.datetime.duration(6, "minutes").get("minute"), 6, "minutes = minute");
        assert.equal(ateos.datetime.duration(6, "minutes").get("m"), 6, "minutes = m");
        assert.equal(ateos.datetime.duration(7, "seconds").get("seconds"), 7, "seconds");
        assert.equal(ateos.datetime.duration(7, "seconds").get("second"), 7, "seconds = second");
        assert.equal(ateos.datetime.duration(7, "seconds").get("s"), 7, "seconds = s");
        assert.equal(ateos.datetime.duration(8, "milliseconds").get("milliseconds"), 8, "milliseconds");
        assert.equal(ateos.datetime.duration(8, "milliseconds").get("millisecond"), 8, "milliseconds = millisecond");
        assert.equal(ateos.datetime.duration(8, "milliseconds").get("ms"), 8, "milliseconds = ms");
    });

    it("instantiation from another duration", () => {
        const simple = ateos.datetime.duration(1234);
        const lengthy = ateos.datetime.duration(60 * 60 * 24 * 360 * 1e3);
        const complicated = ateos.datetime.duration({
            years: 2,
            months: 3,
            weeks: 4,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });
        const modified = ateos.datetime.duration(1, "day").add(ateos.datetime.duration(1, "day"));

        assert.deepEqual(ateos.datetime.duration(simple), simple, "simple clones are equal");
        assert.deepEqual(ateos.datetime.duration(lengthy), lengthy, "lengthy clones are equal");
        assert.deepEqual(ateos.datetime.duration(complicated), complicated, "complicated clones are equal");
        assert.deepEqual(ateos.datetime.duration(modified), modified, "cloning modified duration works");
    });

    it("explicit cloning", () => {
        const durationA = ateos.datetime.duration(5, "milliseconds");
        const durationB = durationA.clone();
        durationA.add(5, "milliseconds");
        assert.notEqual(durationA.milliseconds(), durationB.milliseconds(), "Calling duration.clone() on a duration will create a clone");
    });

    it("instantiation from 24-hour time zero", () => {
        assert.equal(ateos.datetime.duration("00:00").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("00:00").days(), 0, "0 days");
        assert.equal(ateos.datetime.duration("00:00").hours(), 0, "0 hours");
        assert.equal(ateos.datetime.duration("00:00").minutes(), 0, "0 minutes");
        assert.equal(ateos.datetime.duration("00:00").seconds(), 0, "0 seconds");
        assert.equal(ateos.datetime.duration("00:00").milliseconds(), 0, "0 milliseconds");
    });

    it("instantiation from 24-hour time <24 hours", () => {
        assert.equal(ateos.datetime.duration("06:45").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("06:45").days(), 0, "0 days");
        assert.equal(ateos.datetime.duration("06:45").hours(), 6, "6 hours");
        assert.equal(ateos.datetime.duration("06:45").minutes(), 45, "45 minutes");
        assert.equal(ateos.datetime.duration("06:45").seconds(), 0, "0 seconds");
        assert.equal(ateos.datetime.duration("06:45").milliseconds(), 0, "0 milliseconds");
    });

    it("instantiation from 24-hour time >24 hours", () => {
        assert.equal(ateos.datetime.duration("26:45").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("26:45").days(), 1, "0 days");
        assert.equal(ateos.datetime.duration("26:45").hours(), 2, "2 hours");
        assert.equal(ateos.datetime.duration("26:45").minutes(), 45, "45 minutes");
        assert.equal(ateos.datetime.duration("26:45").seconds(), 0, "0 seconds");
        assert.equal(ateos.datetime.duration("26:45").milliseconds(), 0, "0 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan zero", () => {
        assert.equal(ateos.datetime.duration("00:00:00").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("00:00:00").days(), 0, "0 days");
        assert.equal(ateos.datetime.duration("00:00:00").hours(), 0, "0 hours");
        assert.equal(ateos.datetime.duration("00:00:00").minutes(), 0, "0 minutes");
        assert.equal(ateos.datetime.duration("00:00:00").seconds(), 0, "0 seconds");
        assert.equal(ateos.datetime.duration("00:00:00").milliseconds(), 0, "0 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan with days", () => {
        assert.equal(ateos.datetime.duration("1.02:03:04.9999999").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("1.02:03:04.9999999").days(), 1, "1 day");
        assert.equal(ateos.datetime.duration("1.02:03:04.9999999").hours(), 2, "2 hours");
        assert.equal(ateos.datetime.duration("1.02:03:04.9999999").minutes(), 3, "3 minutes");
        assert.equal(ateos.datetime.duration("1.02:03:04.9999999").seconds(), 5, "5 seconds");
        assert.equal(ateos.datetime.duration("1.02:03:04.9999999").milliseconds(), 0, "0 milliseconds");

        assert.equal(ateos.datetime.duration("1 02:03:04.9999999").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("1 02:03:04.9999999").days(), 1, "1 day");
        assert.equal(ateos.datetime.duration("1 02:03:04.9999999").hours(), 2, "2 hours");
        assert.equal(ateos.datetime.duration("1 02:03:04.9999999").minutes(), 3, "3 minutes");
        assert.equal(ateos.datetime.duration("1 02:03:04.9999999").seconds(), 5, "5 seconds");
        assert.equal(ateos.datetime.duration("1 02:03:04.9999999").milliseconds(), 0, "0 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan without days", () => {
        assert.equal(ateos.datetime.duration("01:02:03.9999999").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("01:02:03.9999999").days(), 0, "0 days");
        assert.equal(ateos.datetime.duration("01:02:03.9999999").hours(), 1, "1 hour");
        assert.equal(ateos.datetime.duration("01:02:03.9999999").minutes(), 2, "2 minutes");
        assert.equal(ateos.datetime.duration("01:02:03.9999999").seconds(), 4, "4 seconds");
        assert.equal(ateos.datetime.duration("01:02:03.9999999").milliseconds(), 0, "0 milliseconds");

        assert.equal(ateos.datetime.duration("23:59:59.9999999").days(), 1, "1 days");
        assert.equal(ateos.datetime.duration("23:59:59.9999999").hours(), 0, "0 hours");
        assert.equal(ateos.datetime.duration("23:59:59.9999999").minutes(), 0, "0 minutes");
        assert.equal(ateos.datetime.duration("23:59:59.9999999").seconds(), 0, "0 seconds");
        assert.equal(ateos.datetime.duration("23:59:59.9999999").milliseconds(), 0, "0 milliseconds");

        assert.equal(ateos.datetime.duration("500:59:59.8888888").days(), 20, "500 hours overflows to 20 days");
        assert.equal(ateos.datetime.duration("500:59:59.8888888").hours(), 20, "500 hours overflows to 20 hours");
    });

    it("instatiation from serialized C# TimeSpan without days or milliseconds", () => {
        assert.equal(ateos.datetime.duration("01:02:03").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("01:02:03").days(), 0, "0 days");
        assert.equal(ateos.datetime.duration("01:02:03").hours(), 1, "1 hour");
        assert.equal(ateos.datetime.duration("01:02:03").minutes(), 2, "2 minutes");
        assert.equal(ateos.datetime.duration("01:02:03").seconds(), 3, "3 seconds");
        assert.equal(ateos.datetime.duration("01:02:03").milliseconds(), 0, "0 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan without milliseconds", () => {
        assert.equal(ateos.datetime.duration("1.02:03:04").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("1.02:03:04").days(), 1, "1 day");
        assert.equal(ateos.datetime.duration("1.02:03:04").hours(), 2, "2 hours");
        assert.equal(ateos.datetime.duration("1.02:03:04").minutes(), 3, "3 minutes");
        assert.equal(ateos.datetime.duration("1.02:03:04").seconds(), 4, "4 seconds");
        assert.equal(ateos.datetime.duration("1.02:03:04").milliseconds(), 0, "0 milliseconds");
    });

    it("instantiation from serialized C# TimeSpan with low millisecond precision", () => {
        assert.equal(ateos.datetime.duration("00:00:15.72").years(), 0, "0 years");
        assert.equal(ateos.datetime.duration("00:00:15.72").days(), 0, "0 days");
        assert.equal(ateos.datetime.duration("00:00:15.72").hours(), 0, "0 hours");
        assert.equal(ateos.datetime.duration("00:00:15.72").minutes(), 0, "0 minutes");
        assert.equal(ateos.datetime.duration("00:00:15.72").seconds(), 15, "15 seconds");
        assert.equal(ateos.datetime.duration("00:00:15.72").milliseconds(), 720, "720 milliseconds");

        assert.equal(ateos.datetime.duration("00:00:15.7").milliseconds(), 700, "700 milliseconds");

        assert.equal(ateos.datetime.duration("00:00:15.").milliseconds(), 0, "0 milliseconds");
    });

    it("instantiation from serialized C# TimeSpan with high millisecond precision", () => {
        assert.equal(ateos.datetime.duration("00:00:15.7200000").seconds(), 15, "15 seconds");
        assert.equal(ateos.datetime.duration("00:00:15.7200000").milliseconds(), 720, "720 milliseconds");

        assert.equal(ateos.datetime.duration("00:00:15.7209999").seconds(), 15, "15 seconds");
        assert.equal(ateos.datetime.duration("00:00:15.7209999").milliseconds(), 721, "721 milliseconds");

        assert.equal(ateos.datetime.duration("00:00:15.7205000").seconds(), 15, "15 seconds");
        assert.equal(ateos.datetime.duration("00:00:15.7205000").milliseconds(), 721, "721 milliseconds");

        assert.equal(ateos.datetime.duration("-00:00:15.7205000").seconds(), -15, "15 seconds");
        assert.equal(ateos.datetime.duration("-00:00:15.7205000").milliseconds(), -721, "721 milliseconds");

        assert.equal(ateos.datetime.duration("+00:00:15.7205000").seconds(), 15, "15 seconds");
        assert.equal(ateos.datetime.duration("+00:00:15.7205000").milliseconds(), 721, "721 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan maxValue", () => {
        const d = ateos.datetime.duration("10675199.02:48:05.4775807");

        assert.equal(d.years(), 29227, "29227 years");
        assert.equal(d.months(), 8, "8 months");
        assert.equal(d.days(), 12, "12 day"); // if you have to change this value -- just do it

        assert.equal(d.hours(), 2, "2 hours");
        assert.equal(d.minutes(), 48, "48 minutes");
        assert.equal(d.seconds(), 5, "5 seconds");
        assert.equal(d.milliseconds(), 478, "478 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan minValue", () => {
        const d = ateos.datetime.duration("-10675199.02:48:05.4775808");

        assert.equal(d.years(), -29227, "29653 years");
        assert.equal(d.months(), -8, "8 day");
        assert.equal(d.days(), -12, "12 day"); // if you have to change this value -- just do it

        assert.equal(d.hours(), -2, "2 hours");
        assert.equal(d.minutes(), -48, "48 minutes");
        assert.equal(d.seconds(), -5, "5 seconds");
        assert.equal(d.milliseconds(), -478, "478 milliseconds");
    });

    it("instatiation from serialized C# TimeSpan maxValue with + sign", () => {
        const d = ateos.datetime.duration("+10675199.02:48:05.4775808");

        assert.equal(d.years(), 29227, "29653 years");
        assert.equal(d.months(), 8, "8 day");
        assert.equal(d.days(), 12, "12 day"); // if you have to change this value -- just do it

        assert.equal(d.hours(), 2, "2 hours");
        assert.equal(d.minutes(), 48, "48 minutes");
        assert.equal(d.seconds(), 5, "5 seconds");
        assert.equal(d.milliseconds(), 478, "478 milliseconds");
    });

    it("instantiation from ISO 8601 duration", () => {
        assert.equal(ateos.datetime.duration("P1Y2M3DT4H5M6S").asSeconds(), ateos.datetime.duration({ y: 1, M: 2, d: 3, h: 4, m: 5, s: 6 }).asSeconds(), "all fields");
        assert.equal(ateos.datetime.duration("P3W3D").asSeconds(), ateos.datetime.duration({ w: 3, d: 3 }).asSeconds(), "week and day fields");
        assert.equal(ateos.datetime.duration("P1M").asSeconds(), ateos.datetime.duration({ M: 1 }).asSeconds(), "single month field");
        assert.equal(ateos.datetime.duration("PT1M").asSeconds(), ateos.datetime.duration({ m: 1 }).asSeconds(), "single minute field");
        assert.equal(ateos.datetime.duration("P1MT2H").asSeconds(), ateos.datetime.duration({ M: 1, h: 2 }).asSeconds(), "random fields missing");
        assert.equal(ateos.datetime.duration("-P60D").asSeconds(), ateos.datetime.duration({ d: -60 }).asSeconds(), "negative days");
        assert.equal(ateos.datetime.duration("+P60D").asSeconds(), ateos.datetime.duration({ d: 60 }).asSeconds(), "positive days");
        assert.equal(ateos.datetime.duration("PT0.5S").asSeconds(), ateos.datetime.duration({ s: 0.5 }).asSeconds(), "fractional seconds");
        assert.equal(ateos.datetime.duration("PT0,5S").asSeconds(), ateos.datetime.duration({ s: 0.5 }).asSeconds(), "fractional seconds (comma)");
    });

    it("serialization to ISO 8601 duration strings", () => {
        assert.equal(ateos.datetime.duration({ y: 1, M: 2, d: 3, h: 4, m: 5, s: 6 }).toISOString(), "P1Y2M3DT4H5M6S", "all fields");
        assert.equal(ateos.datetime.duration({ M: -1 }).toISOString(), "-P1M", "one month ago");
        assert.equal(ateos.datetime.duration({ m: -1 }).toISOString(), "-PT1M", "one minute ago");
        assert.equal(ateos.datetime.duration({ s: -0.5 }).toISOString(), "-PT0.5S", "one half second ago");
        assert.equal(ateos.datetime.duration({ y: -1, M: 1 }).toISOString(), "-P11M", "a month after a year ago");
        assert.equal(ateos.datetime.duration({ y: -1, h: 1 }).toISOString(), "-P1YT-1H", "an hour after a year ago");
        assert.equal(ateos.datetime.duration({ y: -1, h: 1, m: -1 }).toISOString(), "-P1YT-59M", "59 minutes after a year ago");
        assert.equal(ateos.datetime.duration({ y: -1, h: 1, s: -1 }).toISOString(), "-P1YT-59M-59S", "59 minutes 59 seconds after a year ago");
        assert.equal(ateos.datetime.duration({ y: -1, h: -1, s: 1 }).toISOString(), "-P1YT59M59S", "59 minutes 59 seconds after a year ago");
        assert.equal(ateos.datetime.duration({ y: -1, d: 2 }).toISOString(), "-P1Y-2D", "1 year less 2 days ago");
        assert.equal(ateos.datetime.duration({ M: +1 }).toISOString(), "P1M", "one month ago");
        assert.equal(ateos.datetime.duration({ m: +1 }).toISOString(), "PT1M", "one minute ago");
        assert.equal(ateos.datetime.duration({ s: +0.5 }).toISOString(), "PT0.5S", "one half second ago");
        assert.equal(ateos.datetime.duration({ y: +1, M: 1 }).toISOString(), "P1Y1M", "a month after a year in future");
        assert.equal(ateos.datetime.duration({ y: -1, h: 1 }).toISOString(), "-P1YT-1H", "an hour after a year ago");
        assert.equal(ateos.datetime.duration({}).toISOString(), "P0D", "zero duration");
        assert.equal(ateos.datetime.duration({ M: 16, d: 40, s: 86465 }).toISOString(), "P1Y4M40DT24H1M5S", "all fields");
        assert.equal(ateos.datetime.duration({ ms: 123456789 }).toISOString(), "PT34H17M36.789S", "check floating-point errors");
        assert.equal(ateos.datetime.duration({ ms: 31952 }).toISOString(), "PT31.952S", "check floating-point errors");
    });

    it("toString acts as toISOString", () => {
        assert.equal(ateos.datetime.duration({ y: 1, M: 2, d: 3, h: 4, m: 5, s: 6 }).toString(), "P1Y2M3DT4H5M6S", "all fields");
        assert.equal(ateos.datetime.duration({ M: -1 }).toString(), "-P1M", "one month ago");
        assert.equal(ateos.datetime.duration({ m: -1 }).toString(), "-PT1M", "one minute ago");
        assert.equal(ateos.datetime.duration({ s: -0.5 }).toString(), "-PT0.5S", "one half second ago");
        assert.equal(ateos.datetime.duration({ y: -1, M: 1 }).toString(), "-P11M", "a month after a year ago");
        assert.equal(ateos.datetime.duration({ M: +1 }).toString(), "P1M", "one month ago");
        assert.equal(ateos.datetime.duration({ m: +1 }).toString(), "PT1M", "one minute ago");
        assert.equal(ateos.datetime.duration({ s: +0.5 }).toString(), "PT0.5S", "one half second ago");
        assert.equal(ateos.datetime.duration({ y: +1, M: 1 }).toString(), "P1Y1M", "a month after a year in future");
        assert.equal(ateos.datetime.duration({}).toString(), "P0D", "zero duration");
        assert.equal(ateos.datetime.duration({ M: 16, d: 40, s: 86465 }).toString(), "P1Y4M40DT24H1M5S", "all fields");
    });

    it("`isodate` (python) test cases", () => {
        assert.equal(ateos.datetime.duration("P18Y9M4DT11H9M8S").asSeconds(), ateos.datetime.duration({ y: 18, M: 9, d: 4, h: 11, m: 9, s: 8 }).asSeconds(), "python isodate 1");
        assert.equal(ateos.datetime.duration("P2W").asSeconds(), ateos.datetime.duration({ w: 2 }).asSeconds(), "python isodate 2");
        assert.equal(ateos.datetime.duration("P3Y6M4DT12H30M5S").asSeconds(), ateos.datetime.duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 }).asSeconds(), "python isodate 3");
        assert.equal(ateos.datetime.duration("P23DT23H").asSeconds(), ateos.datetime.duration({ d: 23, h: 23 }).asSeconds(), "python isodate 4");
        assert.equal(ateos.datetime.duration("P4Y").asSeconds(), ateos.datetime.duration({ y: 4 }).asSeconds(), "python isodate 5");
        assert.equal(ateos.datetime.duration("P1M").asSeconds(), ateos.datetime.duration({ M: 1 }).asSeconds(), "python isodate 6");
        assert.equal(ateos.datetime.duration("PT1M").asSeconds(), ateos.datetime.duration({ m: 1 }).asSeconds(), "python isodate 7");
        assert.equal(ateos.datetime.duration("P0.5Y").asSeconds(), ateos.datetime.duration({ y: 0.5 }).asSeconds(), "python isodate 8");
        assert.equal(ateos.datetime.duration("PT36H").asSeconds(), ateos.datetime.duration({ h: 36 }).asSeconds(), "python isodate 9");
        assert.equal(ateos.datetime.duration("P1DT12H").asSeconds(), ateos.datetime.duration({ d: 1, h: 12 }).asSeconds(), "python isodate 10");
        assert.equal(ateos.datetime.duration("-P2W").asSeconds(), ateos.datetime.duration({ w: -2 }).asSeconds(), "python isodate 11");
        assert.equal(ateos.datetime.duration("-P2.2W").asSeconds(), ateos.datetime.duration({ w: -2.2 }).asSeconds(), "python isodate 12");
        assert.equal(ateos.datetime.duration("+P2W").asSeconds(), ateos.datetime.duration({ w: 2 }).asSeconds(), "python isodate 11");
        assert.equal(ateos.datetime.duration("+P2.2W").asSeconds(), ateos.datetime.duration({ w: 2.2 }).asSeconds(), "python isodate 12");
        assert.equal(ateos.datetime.duration("P1DT2H3M4S").asSeconds(), ateos.datetime.duration({ d: 1, h: 2, m: 3, s: 4 }).asSeconds(), "python isodate 13");
        assert.equal(ateos.datetime.duration("P1DT2H3M").asSeconds(), ateos.datetime.duration({ d: 1, h: 2, m: 3 }).asSeconds(), "python isodate 14");
        assert.equal(ateos.datetime.duration("P1DT2H").asSeconds(), ateos.datetime.duration({ d: 1, h: 2 }).asSeconds(), "python isodate 15");
        assert.equal(ateos.datetime.duration("PT2H").asSeconds(), ateos.datetime.duration({ h: 2 }).asSeconds(), "python isodate 16");
        assert.equal(ateos.datetime.duration("PT2.3H").asSeconds(), ateos.datetime.duration({ h: 2.3 }).asSeconds(), "python isodate 17");
        assert.equal(ateos.datetime.duration("PT2H3M4S").asSeconds(), ateos.datetime.duration({ h: 2, m: 3, s: 4 }).asSeconds(), "python isodate 18");
        assert.equal(ateos.datetime.duration("PT3M4S").asSeconds(), ateos.datetime.duration({ m: 3, s: 4 }).asSeconds(), "python isodate 19");
        assert.equal(ateos.datetime.duration("PT22S").asSeconds(), ateos.datetime.duration({ s: 22 }).asSeconds(), "python isodate 20");
        assert.equal(ateos.datetime.duration("PT22.22S").asSeconds(), ateos.datetime.duration({ s: 22.22 }).asSeconds(), "python isodate 21");
        assert.equal(ateos.datetime.duration("-P2Y").asSeconds(), ateos.datetime.duration({ y: -2 }).asSeconds(), "python isodate 22");
        assert.equal(ateos.datetime.duration("-P3Y6M4DT12H30M5S").asSeconds(), ateos.datetime.duration({ y: -3, M: -6, d: -4, h: -12, m: -30, s: -5 }).asSeconds(), "python isodate 23");
        assert.equal(ateos.datetime.duration("-P1DT2H3M4S").asSeconds(), ateos.datetime.duration({ d: -1, h: -2, m: -3, s: -4 }).asSeconds(), "python isodate 24");
        assert.equal(ateos.datetime.duration("PT-6H3M").asSeconds(), ateos.datetime.duration({ h: -6, m: 3 }).asSeconds(), "python isodate 25");
        assert.equal(ateos.datetime.duration("-PT-6H3M").asSeconds(), ateos.datetime.duration({ h: 6, m: -3 }).asSeconds(), "python isodate 26");
        assert.equal(ateos.datetime.duration("-P-3Y-6M-4DT-12H-30M-5S").asSeconds(), ateos.datetime.duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 }).asSeconds(), "python isodate 27");
        assert.equal(ateos.datetime.duration("P-3Y-6M-4DT-12H-30M-5S").asSeconds(), ateos.datetime.duration({ y: -3, M: -6, d: -4, h: -12, m: -30, s: -5 }).asSeconds(), "python isodate 28");
        assert.equal(ateos.datetime.duration("-P-2W").asSeconds(), ateos.datetime.duration({ w: 2 }).asSeconds(), "python isodate 29");
        assert.equal(ateos.datetime.duration("P-2W").asSeconds(), ateos.datetime.duration({ w: -2 }).asSeconds(), "python isodate 30");
        assert.equal(ateos.datetime.duration("+P2Y").asSeconds(), ateos.datetime.duration({ y: 2 }).asSeconds(), "python isodate 31");
        assert.equal(ateos.datetime.duration("+P3Y6M4DT12H30M5S").asSeconds(), ateos.datetime.duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 }).asSeconds(), "python isodate 32");
        assert.equal(ateos.datetime.duration("+P1DT2H3M4S").asSeconds(), ateos.datetime.duration({ d: 1, h: 2, m: 3, s: 4 }).asSeconds(), "python isodate 34");
        assert.equal(ateos.datetime.duration("PT+6H3M").asSeconds(), ateos.datetime.duration({ h: 6, m: 3 }).asSeconds(), "python isodate 35");
        assert.equal(ateos.datetime.duration("+PT+6H3M").asSeconds(), ateos.datetime.duration({ h: 6, m: 3 }).asSeconds(), "python isodate 36");
        assert.equal(ateos.datetime.duration("+PT-6H3M").asSeconds(), ateos.datetime.duration({ h: -6, m: 3 }).asSeconds(), "python isodate 37");
        assert.equal(ateos.datetime.duration("+P+3Y+6M+4DT+12H+30M+5S").asSeconds(), ateos.datetime.duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 }).asSeconds(), "python isodate 38");
        assert.equal(ateos.datetime.duration("+P-3Y-6M-4DT-12H-30M-5S").asSeconds(), ateos.datetime.duration({ y: -3, M: -6, d: -4, h: -12, m: -30, s: -5 }).asSeconds(), "python isodate 39");
        assert.equal(ateos.datetime.duration("P+3Y+6M+4DT+12H+30M+5S").asSeconds(), ateos.datetime.duration({ y: 3, M: 6, d: 4, h: 12, m: 30, s: 5 }).asSeconds(), "python isodate 40");
        assert.equal(ateos.datetime.duration("+P+2W").asSeconds(), ateos.datetime.duration({ w: 2 }).asSeconds(), "python isodate 41");
        assert.equal(ateos.datetime.duration("+P-2W").asSeconds(), ateos.datetime.duration({ w: -2 }).asSeconds(), "python isodate 41");
        assert.equal(ateos.datetime.duration("P+2W").asSeconds(), ateos.datetime.duration({ w: 2 }).asSeconds(), "python isodate 43");
    });

    it("ISO 8601 misuse cases", () => {
        assert.equal(ateos.datetime.duration("P").asSeconds(), 0, "lonely P");
        assert.equal(ateos.datetime.duration("PT").asSeconds(), 0, "just P and T");
        assert.equal(ateos.datetime.duration("P1H").asSeconds(), 0, "missing T");
        assert.equal(ateos.datetime.duration("P1D1Y").asSeconds(), 0, "out of order");
        assert.equal(ateos.datetime.duration("PT.5S").asSeconds(), 0.5, "accept no leading zero for decimal");
        assert.equal(ateos.datetime.duration("PT1,S").asSeconds(), 1, "accept trailing decimal separator");
        assert.equal(ateos.datetime.duration("PT1M0,,5S").asSeconds(), 60, "extra decimal separators are ignored as 0");
    });

    it("humanize", () => {
        ateos.datetime.locale("en");
        assert.equal(ateos.datetime.duration({ seconds: 44 }).humanize(), "a few seconds", "44 seconds = a few seconds");
        assert.equal(ateos.datetime.duration({ seconds: 45 }).humanize(), "a minute", "45 seconds = a minute");
        assert.equal(ateos.datetime.duration({ seconds: 89 }).humanize(), "a minute", "89 seconds = a minute");
        assert.equal(ateos.datetime.duration({ seconds: 90 }).humanize(), "2 minutes", "90 seconds = 2 minutes");
        assert.equal(ateos.datetime.duration({ minutes: 44 }).humanize(), "44 minutes", "44 minutes = 44 minutes");
        assert.equal(ateos.datetime.duration({ minutes: 45 }).humanize(), "an hour", "45 minutes = an hour");
        assert.equal(ateos.datetime.duration({ minutes: 89 }).humanize(), "an hour", "89 minutes = an hour");
        assert.equal(ateos.datetime.duration({ minutes: 90 }).humanize(), "2 hours", "90 minutes = 2 hours");
        assert.equal(ateos.datetime.duration({ hours: 5 }).humanize(), "5 hours", "5 hours = 5 hours");
        assert.equal(ateos.datetime.duration({ hours: 21 }).humanize(), "21 hours", "21 hours = 21 hours");
        assert.equal(ateos.datetime.duration({ hours: 22 }).humanize(), "a day", "22 hours = a day");
        assert.equal(ateos.datetime.duration({ hours: 35 }).humanize(), "a day", "35 hours = a day");
        assert.equal(ateos.datetime.duration({ hours: 36 }).humanize(), "2 days", "36 hours = 2 days");
        assert.equal(ateos.datetime.duration({ days: 1 }).humanize(), "a day", "1 day = a day");
        assert.equal(ateos.datetime.duration({ days: 5 }).humanize(), "5 days", "5 days = 5 days");
        assert.equal(ateos.datetime.duration({ weeks: 1 }).humanize(), "7 days", "1 week = 7 days");
        assert.equal(ateos.datetime.duration({ days: 25 }).humanize(), "25 days", "25 days = 25 days");
        assert.equal(ateos.datetime.duration({ days: 26 }).humanize(), "a month", "26 days = a month");
        assert.equal(ateos.datetime.duration({ days: 30 }).humanize(), "a month", "30 days = a month");
        assert.equal(ateos.datetime.duration({ days: 45 }).humanize(), "a month", "45 days = a month");
        assert.equal(ateos.datetime.duration({ days: 46 }).humanize(), "2 months", "46 days = 2 months");
        assert.equal(ateos.datetime.duration({ days: 74 }).humanize(), "2 months", "74 days = 2 months");
        assert.equal(ateos.datetime.duration({ days: 77 }).humanize(), "3 months", "77 days = 3 months");
        assert.equal(ateos.datetime.duration({ months: 1 }).humanize(), "a month", "1 month = a month");
        assert.equal(ateos.datetime.duration({ months: 5 }).humanize(), "5 months", "5 months = 5 months");
        assert.equal(ateos.datetime.duration({ days: 344 }).humanize(), "a year", "344 days = a year");
        assert.equal(ateos.datetime.duration({ days: 345 }).humanize(), "a year", "345 days = a year");
        assert.equal(ateos.datetime.duration({ days: 547 }).humanize(), "a year", "547 days = a year");
        assert.equal(ateos.datetime.duration({ days: 548 }).humanize(), "2 years", "548 days = 2 years");
        assert.equal(ateos.datetime.duration({ years: 1 }).humanize(), "a year", "1 year = a year");
        assert.equal(ateos.datetime.duration({ years: 5 }).humanize(), "5 years", "5 years = 5 years");
        assert.equal(ateos.datetime.duration(7200000).humanize(), "2 hours", "7200000 = 2 minutes");
    });

    it("humanize duration with suffix", () => {
        ateos.datetime.locale("en");
        assert.equal(ateos.datetime.duration({ seconds: 44 }).humanize(true), "in a few seconds", "44 seconds = a few seconds");
        assert.equal(ateos.datetime.duration({ seconds: -44 }).humanize(true), "a few seconds ago", "44 seconds = a few seconds");
        assert.equal(ateos.datetime.duration({ seconds: +44 }).humanize(true), "in a few seconds", "44 seconds = a few seconds");
    });

    it("bubble value up", () => {
        assert.equal(ateos.datetime.duration({ milliseconds: 61001 }).milliseconds(), 1, "61001 milliseconds has 1 millisecond left over");
        assert.equal(ateos.datetime.duration({ milliseconds: 61001 }).seconds(), 1, "61001 milliseconds has 1 second left over");
        assert.equal(ateos.datetime.duration({ milliseconds: 61001 }).minutes(), 1, "61001 milliseconds has 1 minute left over");

        assert.equal(ateos.datetime.duration({ minutes: 350 }).minutes(), 50, "350 minutes has 50 minutes left over");
        assert.equal(ateos.datetime.duration({ minutes: 350 }).hours(), 5, "350 minutes has 5 hours left over");
    });

    it("clipping", () => {
        assert.equal(ateos.datetime.duration({ months: 11 }).months(), 11, "11 months is 11 months");
        assert.equal(ateos.datetime.duration({ months: 11 }).years(), 0, "11 months makes no year");
        assert.equal(ateos.datetime.duration({ months: 12 }).months(), 0, "12 months is 0 months left over");
        assert.equal(ateos.datetime.duration({ months: 12 }).years(), 1, "12 months makes 1 year");
        assert.equal(ateos.datetime.duration({ months: 13 }).months(), 1, "13 months is 1 month left over");
        assert.equal(ateos.datetime.duration({ months: 13 }).years(), 1, "13 months makes 1 year");

        assert.equal(ateos.datetime.duration({ days: 30 }).days(), 30, "30 days is 30 days");
        assert.equal(ateos.datetime.duration({ days: 30 }).months(), 0, "30 days makes no month");
        assert.equal(ateos.datetime.duration({ days: 31 }).days(), 0, "31 days is 0 days left over");
        assert.equal(ateos.datetime.duration({ days: 31 }).months(), 1, "31 days is a month");
        assert.equal(ateos.datetime.duration({ days: 32 }).days(), 1, "32 days is 1 day left over");
        assert.equal(ateos.datetime.duration({ days: 32 }).months(), 1, "32 days is a month");

        assert.equal(ateos.datetime.duration({ hours: 23 }).hours(), 23, "23 hours is 23 hours");
        assert.equal(ateos.datetime.duration({ hours: 23 }).days(), 0, "23 hours makes no day");
        assert.equal(ateos.datetime.duration({ hours: 24 }).hours(), 0, "24 hours is 0 hours left over");
        assert.equal(ateos.datetime.duration({ hours: 24 }).days(), 1, "24 hours makes 1 day");
        assert.equal(ateos.datetime.duration({ hours: 25 }).hours(), 1, "25 hours is 1 hour left over");
        assert.equal(ateos.datetime.duration({ hours: 25 }).days(), 1, "25 hours makes 1 day");
    });

    it("bubbling consistency", () => {
        let days = 0;
        let months = 0;
        for (let totalDays = 1; totalDays <= 500; ++totalDays) {
            const d = ateos.datetime.duration(totalDays, "days");
            const newDays = d.days();
            const newMonths = d.months() + d.years() * 12;
            assert.ok(
                (months === newMonths && days + 1 === newDays) ||
                (months + 1 === newMonths && newDays === 0),
                `consistent total days ${totalDays
                } was ${months} ${days
                } now ${newMonths} ${newDays}`);
            days = newDays;
            months = newMonths;
        }
    });

    it("effective equivalency", () => {
        assert.deepEqual(ateos.datetime.duration({ seconds: 1 })._data, ateos.datetime.duration({ milliseconds: 1000 })._data, "1 second is the same as 1000 milliseconds");
        assert.deepEqual(ateos.datetime.duration({ seconds: 60 })._data, ateos.datetime.duration({ minutes: 1 })._data, "1 minute is the same as 60 seconds");
        assert.deepEqual(ateos.datetime.duration({ minutes: 60 })._data, ateos.datetime.duration({ hours: 1 })._data, "1 hour is the same as 60 minutes");
        assert.deepEqual(ateos.datetime.duration({ hours: 24 })._data, ateos.datetime.duration({ days: 1 })._data, "1 day is the same as 24 hours");
        assert.deepEqual(ateos.datetime.duration({ days: 7 })._data, ateos.datetime.duration({ weeks: 1 })._data, "1 week is the same as 7 days");
        assert.deepEqual(ateos.datetime.duration({ days: 31 })._data, ateos.datetime.duration({ months: 1 })._data, "1 month is the same as 30 days");
        assert.deepEqual(ateos.datetime.duration({ months: 12 })._data, ateos.datetime.duration({ years: 1 })._data, "1 years is the same as 12 months");
    });

    it("asGetters", () => {
        // 400 years have exactly 146097 days

        // years
        assert.equal(ateos.datetime.duration(1, "year").asYears(), 1, "1 year as years");
        assert.equal(ateos.datetime.duration(1, "year").asMonths(), 12, "1 year as months");
        assert.equal(ateos.datetime.duration(400, "year").asMonths(), 4800, "400 years as months");
        assert.equal(ateos.datetime.duration(1, "year").asWeeks().toFixed(3), 52.143, "1 year as weeks");
        assert.equal(ateos.datetime.duration(1, "year").asDays(), 365, "1 year as days");
        assert.equal(ateos.datetime.duration(2, "year").asDays(), 730, "2 years as days");
        assert.equal(ateos.datetime.duration(3, "year").asDays(), 1096, "3 years as days");
        assert.equal(ateos.datetime.duration(4, "year").asDays(), 1461, "4 years as days");
        assert.equal(ateos.datetime.duration(400, "year").asDays(), 146097, "400 years as days");
        assert.equal(ateos.datetime.duration(1, "year").asHours(), 8760, "1 year as hours");
        assert.equal(ateos.datetime.duration(1, "year").asMinutes(), 525600, "1 year as minutes");
        assert.equal(ateos.datetime.duration(1, "year").asSeconds(), 31536000, "1 year as seconds");
        assert.equal(ateos.datetime.duration(1, "year").asMilliseconds(), 31536000000, "1 year as milliseconds");

        // months
        assert.equal(ateos.datetime.duration(1, "month").asYears().toFixed(4), 0.0833, "1 month as years");
        assert.equal(ateos.datetime.duration(1, "month").asMonths(), 1, "1 month as months");
        assert.equal(ateos.datetime.duration(1, "month").asWeeks().toFixed(3), 4.286, "1 month as weeks");
        assert.equal(ateos.datetime.duration(1, "month").asDays(), 30, "1 month as days");
        assert.equal(ateos.datetime.duration(2, "month").asDays(), 61, "2 months as days");
        assert.equal(ateos.datetime.duration(3, "month").asDays(), 91, "3 months as days");
        assert.equal(ateos.datetime.duration(4, "month").asDays(), 122, "4 months as days");
        assert.equal(ateos.datetime.duration(5, "month").asDays(), 152, "5 months as days");
        assert.equal(ateos.datetime.duration(6, "month").asDays(), 183, "6 months as days");
        assert.equal(ateos.datetime.duration(7, "month").asDays(), 213, "7 months as days");
        assert.equal(ateos.datetime.duration(8, "month").asDays(), 243, "8 months as days");
        assert.equal(ateos.datetime.duration(9, "month").asDays(), 274, "9 months as days");
        assert.equal(ateos.datetime.duration(10, "month").asDays(), 304, "10 months as days");
        assert.equal(ateos.datetime.duration(11, "month").asDays(), 335, "11 months as days");
        assert.equal(ateos.datetime.duration(12, "month").asDays(), 365, "12 months as days");
        assert.equal(ateos.datetime.duration(24, "month").asDays(), 730, "24 months as days");
        assert.equal(ateos.datetime.duration(36, "month").asDays(), 1096, "36 months as days");
        assert.equal(ateos.datetime.duration(48, "month").asDays(), 1461, "48 months as days");
        assert.equal(ateos.datetime.duration(4800, "month").asDays(), 146097, "4800 months as days");
        assert.equal(ateos.datetime.duration(1, "month").asHours(), 720, "1 month as hours");
        assert.equal(ateos.datetime.duration(1, "month").asMinutes(), 43200, "1 month as minutes");
        assert.equal(ateos.datetime.duration(1, "month").asSeconds(), 2592000, "1 month as seconds");
        assert.equal(ateos.datetime.duration(1, "month").asMilliseconds(), 2592000000, "1 month as milliseconds");

        // weeks
        assert.equal(ateos.datetime.duration(1, "week").asYears().toFixed(4), 0.0192, "1 week as years");
        assert.equal(ateos.datetime.duration(1, "week").asMonths().toFixed(3), 0.230, "1 week as months");
        assert.equal(ateos.datetime.duration(1, "week").asWeeks(), 1, "1 week as weeks");
        assert.equal(ateos.datetime.duration(1, "week").asDays(), 7, "1 week as days");
        assert.equal(ateos.datetime.duration(1, "week").asHours(), 168, "1 week as hours");
        assert.equal(ateos.datetime.duration(1, "week").asMinutes(), 10080, "1 week as minutes");
        assert.equal(ateos.datetime.duration(1, "week").asSeconds(), 604800, "1 week as seconds");
        assert.equal(ateos.datetime.duration(1, "week").asMilliseconds(), 604800000, "1 week as milliseconds");

        // days
        assert.equal(ateos.datetime.duration(1, "day").asYears().toFixed(4), 0.0027, "1 day as years");
        assert.equal(ateos.datetime.duration(1, "day").asMonths().toFixed(3), 0.033, "1 day as months");
        assert.equal(ateos.datetime.duration(1, "day").asWeeks().toFixed(3), 0.143, "1 day as weeks");
        assert.equal(ateos.datetime.duration(1, "day").asDays(), 1, "1 day as days");
        assert.equal(ateos.datetime.duration(1, "day").asHours(), 24, "1 day as hours");
        assert.equal(ateos.datetime.duration(1, "day").asMinutes(), 1440, "1 day as minutes");
        assert.equal(ateos.datetime.duration(1, "day").asSeconds(), 86400, "1 day as seconds");
        assert.equal(ateos.datetime.duration(1, "day").asMilliseconds(), 86400000, "1 day as milliseconds");

        // hours
        assert.equal(ateos.datetime.duration(1, "hour").asYears().toFixed(6), 0.000114, "1 hour as years");
        assert.equal(ateos.datetime.duration(1, "hour").asMonths().toFixed(5), 0.00137, "1 hour as months");
        assert.equal(ateos.datetime.duration(1, "hour").asWeeks().toFixed(5), 0.00595, "1 hour as weeks");
        assert.equal(ateos.datetime.duration(1, "hour").asDays().toFixed(4), 0.0417, "1 hour as days");
        assert.equal(ateos.datetime.duration(1, "hour").asHours(), 1, "1 hour as hours");
        assert.equal(ateos.datetime.duration(1, "hour").asMinutes(), 60, "1 hour as minutes");
        assert.equal(ateos.datetime.duration(1, "hour").asSeconds(), 3600, "1 hour as seconds");
        assert.equal(ateos.datetime.duration(1, "hour").asMilliseconds(), 3600000, "1 hour as milliseconds");

        // minutes
        assert.equal(ateos.datetime.duration(1, "minute").asYears().toFixed(8), 0.00000190, "1 minute as years");
        assert.equal(ateos.datetime.duration(1, "minute").asMonths().toFixed(7), 0.0000228, "1 minute as months");
        assert.equal(ateos.datetime.duration(1, "minute").asWeeks().toFixed(7), 0.0000992, "1 minute as weeks");
        assert.equal(ateos.datetime.duration(1, "minute").asDays().toFixed(6), 0.000694, "1 minute as days");
        assert.equal(ateos.datetime.duration(1, "minute").asHours().toFixed(4), 0.0167, "1 minute as hours");
        assert.equal(ateos.datetime.duration(1, "minute").asMinutes(), 1, "1 minute as minutes");
        assert.equal(ateos.datetime.duration(1, "minute").asSeconds(), 60, "1 minute as seconds");
        assert.equal(ateos.datetime.duration(1, "minute").asMilliseconds(), 60000, "1 minute as milliseconds");

        // seconds
        assert.equal(ateos.datetime.duration(1, "second").asYears().toFixed(10), 0.0000000317, "1 second as years");
        assert.equal(ateos.datetime.duration(1, "second").asMonths().toFixed(9), 0.000000380, "1 second as months");
        assert.equal(ateos.datetime.duration(1, "second").asWeeks().toFixed(8), 0.00000165, "1 second as weeks");
        assert.equal(ateos.datetime.duration(1, "second").asDays().toFixed(7), 0.0000116, "1 second as days");
        assert.equal(ateos.datetime.duration(1, "second").asHours().toFixed(6), 0.000278, "1 second as hours");
        assert.equal(ateos.datetime.duration(1, "second").asMinutes().toFixed(4), 0.0167, "1 second as minutes");
        assert.equal(ateos.datetime.duration(1, "second").asSeconds(), 1, "1 second as seconds");
        assert.equal(ateos.datetime.duration(1, "second").asMilliseconds(), 1000, "1 second as milliseconds");

        // milliseconds
        assert.equal(ateos.datetime.duration(1, "millisecond").asYears().toFixed(13), 0.0000000000317, "1 millisecond as years");
        assert.equal(ateos.datetime.duration(1, "millisecond").asMonths().toFixed(12), 0.000000000380, "1 millisecond as months");
        assert.equal(ateos.datetime.duration(1, "millisecond").asWeeks().toFixed(11), 0.00000000165, "1 millisecond as weeks");
        assert.equal(ateos.datetime.duration(1, "millisecond").asDays().toFixed(10), 0.0000000116, "1 millisecond as days");
        assert.equal(ateos.datetime.duration(1, "millisecond").asHours().toFixed(9), 0.000000278, "1 millisecond as hours");
        assert.equal(ateos.datetime.duration(1, "millisecond").asMinutes().toFixed(7), 0.0000167, "1 millisecond as minutes");
        assert.equal(ateos.datetime.duration(1, "millisecond").asSeconds(), 0.001, "1 millisecond as seconds");
        assert.equal(ateos.datetime.duration(1, "millisecond").asMilliseconds(), 1, "1 millisecond as milliseconds");
    });

    it("as getters for small units", () => {
        const dS = ateos.datetime.duration(1, "milliseconds");
        const ds = ateos.datetime.duration(3, "seconds");
        const dm = ateos.datetime.duration(13, "minutes");

        // Floating point errors for small duration units
        assert.equal(dS.as("milliseconds"), 1, "as(\"milliseconds\")");
        assert.equal(dS.asMilliseconds(), 1, "asMilliseconds()");
        assert.equal(ds.as("seconds"), 3, "as(\"seconds\")");
        assert.equal(ds.asSeconds(), 3, "asSeconds()");
        assert.equal(dm.as("minutes"), 13, "as(\"minutes\")");
        assert.equal(dm.asMinutes(), 13, "asMinutes()");
    });

    it("minutes getter for floating point hours", () => {
        // For certain floating point hours, .minutes() getter produced incorrect values due to the rounding errors
        assert.equal(ateos.datetime.duration(2.3, "h").minutes(), 18, "minutes()");
        assert.equal(ateos.datetime.duration(4.1, "h").minutes(), 6, "minutes()");
    });

    it("isDuration", () => {
        assert.ok(ateos.datetime.isDuration(ateos.datetime.duration(12345678)), "correctly says true");
        assert.ok(!ateos.datetime.isDuration(ateos.datetime()), "ateos.datetime object is not a duration");
        assert.ok(!ateos.datetime.isDuration({ milliseconds: 1 }), "plain object is not a duration");
    });

    it("add", () => {
        const d = ateos.datetime.duration({ months: 4, weeks: 3, days: 2 });
        // for some reason, d._data._months does not get updated; use d._months instead.
        assert.equal(d.add(1, "month")._months, 5, "Add months");
        assert.equal(d.add(5, "days")._days, 28, "Add days");
        assert.equal(d.add(10000)._milliseconds, 10000, "Add milliseconds");
        assert.equal(d.add({ h: 23, m: 59 })._milliseconds, 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 10000, "Add hour:minute");
    });

    it("add and bubble", () => {
        let d;

        assert.equal(ateos.datetime.duration(1, "second").add(1000, "milliseconds").seconds(), 2, "Adding milliseconds should bubble up to seconds");
        assert.equal(ateos.datetime.duration(1, "minute").add(60, "second").minutes(), 2, "Adding seconds should bubble up to minutes");
        assert.equal(ateos.datetime.duration(1, "hour").add(60, "minutes").hours(), 2, "Adding minutes should bubble up to hours");
        assert.equal(ateos.datetime.duration(1, "day").add(24, "hours").days(), 2, "Adding hours should bubble up to days");

        d = ateos.datetime.duration(-1, "day").add(1, "hour");
        assert.equal(d.hours(), -23, "-1 day + 1 hour == -23 hour (component)");
        assert.equal(d.asHours(), -23, "-1 day + 1 hour == -23 hours");

        d = ateos.datetime.duration(+1, "day").add(1, "hour");
        assert.equal(d.hours(), 1, "1 day + 1 hour == 1 hour (component)");
        assert.equal(d.asHours(), 25, "1 day + 1 hour == 25 hour");

        d = ateos.datetime.duration(-1, "year").add(1, "day");
        assert.equal(d.days(), -30, "- 1 year + 1 day == -30 days (component)");
        assert.equal(d.months(), -11, "- 1 year + 1 day == -11 months (component)");
        assert.equal(d.years(), 0, "- 1 year + 1 day == 0 years (component)");
        assert.equal(d.asDays(), -364, "- 1 year + 1 day == -364 days");

        d = ateos.datetime.duration(+1, "year").add(1, "day");
        assert.equal(d.days(), 1, "+ 1 year + 1 day == 1 days (component)");
        assert.equal(d.months(), 0, "+ 1 year + 1 day == 0 month (component)");
        assert.equal(d.years(), 1, "+ 1 year + 1 day == 1 year (component)");
        assert.equal(d.asDays(), 366, "+ 1 year + 1 day == +366 day");

        d = ateos.datetime.duration(-1, "year").add(1, "hour");
        assert.equal(d.hours(), -23, "- 1 year + 1 hour == -23 hours (component)");
        assert.equal(d.days(), -30, "- 1 year + 1 hour == -30 days (component)");
        assert.equal(d.months(), -11, "- 1 year + 1 hour == -11 months (component)");
        assert.equal(d.years(), 0, "- 1 year + 1 hour == 0 years (component)");

        d = ateos.datetime.duration(+1, "year").add(1, "hour");
        assert.equal(d.hours(), 1, "+ 1 year + 1 hour == 1 hour (component)");
        assert.equal(d.days(), 0, "+ 1 year + 1 hour == 1 day (component)");
        assert.equal(d.months(), 0, "+ 1 year + 1 hour == 1 month (component)");
        assert.equal(d.years(), 1, "+ 1 year + 1 hour == 1 year (component)");
    });

    it("add to moment", () => {
        const d = ateos.datetime.duration({ months: 1, seconds: -1 });
        const m = ateos.datetime("2017-03-01").add(d);
        assert.equal(m.month(), 2, "Adds months before time");
        assert.equal(m.date(), 31, "Adds time after months");
    });

    it("subtract and bubble", () => {
        let d;

        assert.equal(ateos.datetime.duration(2, "second").subtract(1000, "milliseconds").seconds(), 1, "Subtracting milliseconds should bubble up to seconds");
        assert.equal(ateos.datetime.duration(2, "minute").subtract(60, "second").minutes(), 1, "Subtracting seconds should bubble up to minutes");
        assert.equal(ateos.datetime.duration(2, "hour").subtract(60, "minutes").hours(), 1, "Subtracting minutes should bubble up to hours");
        assert.equal(ateos.datetime.duration(2, "day").subtract(24, "hours").days(), 1, "Subtracting hours should bubble up to days");

        d = ateos.datetime.duration(1, "day").subtract(1, "hour");
        assert.equal(d.hours(), 23, "1 day - 1 hour == 23 hour (component)");
        assert.equal(d.asHours(), 23, "1 day - 1 hour == 23 hours");

        d = ateos.datetime.duration(1, "year").subtract(1, "day");
        assert.equal(d.days(), 30, "1 year - 1 day == 30 days (component)");
        assert.equal(d.months(), 11, "1 year - 1 day == 11 months (component)");
        assert.equal(d.years(), 0, "1 year - 1 day == 0 years (component)");
        assert.equal(d.asDays(), 364, "1 year - 1 day == 364 days");

        d = ateos.datetime.duration(1, "year").subtract(1, "hour");
        assert.equal(d.hours(), 23, "1 year - 1 hour == 23 hours (component)");
        assert.equal(d.days(), 30, "1 year - 1 hour == 30 days (component)");
        assert.equal(d.months(), 11, "1 year - 1 hour == 11 months (component)");
        assert.equal(d.years(), 0, "1 year - 1 hour == 0 years (component)");
    });

    it("subtract", () => {
        const d = ateos.datetime.duration({ months: 2, weeks: 2, days: 0, hours: 5 });
        // for some reason, d._data._months does not get updated; use d._months instead.
        assert.equal(d.subtract(1, "months")._months, 1, "Subtract months");
        assert.equal(d.subtract(14, "days")._days, 0, "Subtract days");
        assert.equal(d.subtract(10000)._milliseconds, 5 * 60 * 60 * 1000 - 10000, "Subtract milliseconds");
        assert.equal(d.subtract({ h: 1, m: 59 })._milliseconds, 3 * 60 * 60 * 1000 + 1 * 60 * 1000 - 10000, "Subtract hour:minute");
    });

    it("JSON.stringify duration", () => {
        const d = ateos.datetime.duration(1024, "h");

        assert.equal(JSON.stringify(d), `"${d.toISOString()}"`, "JSON.stringify on duration should return ISO string");
    });

    it.skip("duration plugins", () => {
        const durationObject = ateos.datetime.duration();
        ateos.datetime.duration.prototype.foo = function (arg) {
            assert.equal(this, durationObject);
            assert.equal(arg, 5);
        };
        durationObject.foo(5);
    });

    describe("invalid", () => {
        it("invalid duration", () => {
            const m = ateos.datetime.duration.invalid(); // should be invalid
            assert.equal(m.isValid(), false);
            assert.ok(isNaN(m.valueOf()));
        });

        it("valid duration", () => {
            const m = ateos.datetime.duration({ d: null }); // should be valid, for now
            assert.equal(m.isValid(), true);
            assert.equal(m.valueOf(), 0);
        });

        it("invalid duration - only smallest unit can have decimal", () => {
            const m = ateos.datetime.duration({ days: 3.5, hours: 1.1 }); // should be invalid
            assert.equal(m.isValid(), false);
            assert.ok(isNaN(m.valueOf())); // .valueOf() returns NaN for invalid durations
        });

        it("valid duration - smallest unit can have decimal", () => {
            const m = ateos.datetime.duration({ days: 3, hours: 1.1 }); // should be valid
            assert.equal(m.isValid(), true);
            assert.equal(m.asHours(), 73.1);
        });

        it("invalid duration with two arguments", () => {
            const m = ateos.datetime.duration(NaN, "days");
            assert.equal(m.isValid(), false);
            assert.ok(isNaN(m.valueOf()));
        });

        it("invalid duration operations", () => {
            let invalids = [
                    ateos.datetime.duration(NaN),
                    ateos.datetime.duration(NaN, "days"),
                    ateos.datetime.duration.invalid()
                ],
                i,
                invalid,
                valid = ateos.datetime.duration();

            for (i = 0; i < invalids.length; ++i) {
                invalid = invalids[i];

                assert.ok(!invalid.add(5, "hours").isValid(), `invalid.add is invalid; i=${i}`);
                assert.ok(!invalid.subtract(30, "days").isValid(), `invalid.subtract is invalid; i=${i}`);
                assert.ok(!invalid.abs().isValid(), `invalid.abs is invalid; i=${i}`);
                assert.ok(isNaN(invalid.as("years")), `invalid.as is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asMilliseconds()), `invalid.asMilliseconds is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asSeconds()), `invalid.asSeconds is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asMinutes()), `invalid.asMinutes is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asHours()), `invalid.asHours is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asDays()), `invalid.asDays is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asWeeks()), `invalid.asWeeks is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asMonths()), `invalid.asMonths is NaN; i=${i}`);
                assert.ok(isNaN(invalid.asYears()), `invalid.asYears is NaN; i=${i}`);
                assert.ok(isNaN(invalid.valueOf()), `invalid.valueOf is NaN; i=${i}`);
                assert.ok(isNaN(invalid.get("hours")), `invalid.get is NaN; i=${i}`);

                assert.ok(isNaN(invalid.milliseconds()), `invalid.milliseconds is NaN; i=${i}`);
                assert.ok(isNaN(invalid.seconds()), `invalid.seconds is NaN; i=${i}`);
                assert.ok(isNaN(invalid.minutes()), `invalid.minutes is NaN; i=${i}`);
                assert.ok(isNaN(invalid.hours()), `invalid.hours is NaN; i=${i}`);
                assert.ok(isNaN(invalid.days()), `invalid.days is NaN; i=${i}`);
                assert.ok(isNaN(invalid.weeks()), `invalid.weeks is NaN; i=${i}`);
                assert.ok(isNaN(invalid.months()), `invalid.months is NaN; i=${i}`);
                assert.ok(isNaN(invalid.years()), `invalid.years is NaN; i=${i}`);

                assert.equal(invalid.humanize(),
                    invalid.localeData().invalidDate(),
                    `invalid.humanize is localized invalid duration string; i=${i}`);
                assert.equal(invalid.toISOString(),
                    invalid.localeData().invalidDate(),
                    `invalid.toISOString is localized invalid duration string; i=${i}`);
                assert.equal(invalid.toString(),
                    invalid.localeData().invalidDate(),
                    `invalid.toString is localized invalid duration string; i=${i}`);
                assert.equal(invalid.toJSON(), invalid.localeData().invalidDate(), `invalid.toJSON is null; i=${i}`);
                assert.equal(invalid.locale(), "en", `invalid.locale; i=${i}`);
                assert.equal(invalid.localeData()._abbr, "en", `invalid.localeData()._abbr; i=${i}`);
            }
        });
    });
});
