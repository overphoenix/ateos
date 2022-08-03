describe("datetime", "locale inheritance", () => {
    beforeEach(() => {
        ateos.datetime.locale("en");
    });

    it("calendar", () => {
        ateos.datetime.defineLocale("base-cal", {
            calendar: {
                sameDay: "[Today at] HH:mm",
                nextDay: "[Tomorrow at] HH:mm",
                nextWeek: "[Next week at] HH:mm",
                lastDay: "[Yesterday at] HH:mm",
                lastWeek: "[Last week at] HH:mm",
                sameElse: "[whatever]"
            }
        });
        ateos.datetime.defineLocale("child-cal", {
            parentLocale: "base-cal",
            calendar: {
                sameDay: "[Today] HH:mm",
                nextDay: "[Tomorrow] HH:mm",
                nextWeek: "[Next week] HH:mm"
            }
        });

        ateos.datetime.locale("child-cal");
        const anchor = ateos.datetime.utc("2015-05-05T12:00:00", ateos.datetime.ISO_8601);
        assert.equal(anchor.clone().add(3, "hours").calendar(anchor), "Today 15:00", "today uses child version");
        assert.equal(anchor.clone().add(1, "day").calendar(anchor), "Tomorrow 12:00", "tomorrow uses child version");
        assert.equal(anchor.clone().add(3, "days").calendar(anchor), "Next week 12:00", "next week uses child version");

        assert.equal(anchor.clone().subtract(1, "day").calendar(anchor), "Yesterday at 12:00", "yesterday uses parent version");
        assert.equal(anchor.clone().subtract(3, "days").calendar(anchor), "Last week at 12:00", "last week uses parent version");
        assert.equal(anchor.clone().subtract(7, "days").calendar(anchor), "whatever", "sameElse uses parent version -");
        assert.equal(anchor.clone().add(7, "days").calendar(anchor), "whatever", "sameElse uses parent version +");
    });

    it("missing", () => {
        ateos.datetime.defineLocale("base-cal-2", {
            calendar: {
                sameDay: "[Today at] HH:mm",
                nextDay: "[Tomorrow at] HH:mm",
                nextWeek: "[Next week at] HH:mm",
                lastDay: "[Yesterday at] HH:mm",
                lastWeek: "[Last week at] HH:mm",
                sameElse: "[whatever]"
            }
        });
        ateos.datetime.defineLocale("child-cal-2", {
            parentLocale: "base-cal-2"
        });
        ateos.datetime.locale("child-cal-2");
        const anchor = ateos.datetime.utc("2015-05-05T12:00:00", ateos.datetime.ISO_8601);
        assert.equal(anchor.clone().add(3, "hours").calendar(anchor), "Today at 15:00", "today uses parent version");
        assert.equal(anchor.clone().add(1, "day").calendar(anchor), "Tomorrow at 12:00", "tomorrow uses parent version");
        assert.equal(anchor.clone().add(3, "days").calendar(anchor), "Next week at 12:00", "next week uses parent version");
        assert.equal(anchor.clone().subtract(1, "day").calendar(anchor), "Yesterday at 12:00", "yesterday uses parent version");
        assert.equal(anchor.clone().subtract(3, "days").calendar(anchor), "Last week at 12:00", "last week uses parent version");
        assert.equal(anchor.clone().subtract(7, "days").calendar(anchor), "whatever", "sameElse uses parent version -");
        assert.equal(anchor.clone().add(7, "days").calendar(anchor), "whatever", "sameElse uses parent version +");
    });

    // Test function vs obj both directions

    it("long date format", () => {
        ateos.datetime.defineLocale("base-ldf", {
            longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            }
        });
        ateos.datetime.defineLocale("child-ldf", {
            parentLocale: "base-ldf",
            longDateFormat: {
                LLL: "[child] MMMM D, YYYY h:mm A",
                LLLL: "[child] dddd, MMMM D, YYYY h:mm A"
            }
        });

        ateos.datetime.locale("child-ldf");
        const anchor = ateos.datetime.utc("2015-09-06T12:34:56", ateos.datetime.ISO_8601);
        assert.equal(anchor.format("LTS"), "12:34:56 PM", "LTS uses base");
        assert.equal(anchor.format("LT"), "12:34 PM", "LT uses base");
        assert.equal(anchor.format("L"), "09/06/2015", "L uses base");
        assert.equal(anchor.format("l"), "9/6/2015", "l uses base");
        assert.equal(anchor.format("LL"), "September 6, 2015", "LL uses base");
        assert.equal(anchor.format("ll"), "Sep 6, 2015", "ll uses base");
        assert.equal(anchor.format("LLL"), "child September 6, 2015 12:34 PM", "LLL uses child");
        assert.equal(anchor.format("lll"), "child Sep 6, 2015 12:34 PM", "lll uses child");
        assert.equal(anchor.format("LLLL"), "child Sunday, September 6, 2015 12:34 PM", "LLLL uses child");
        assert.equal(anchor.format("llll"), "child Sun, Sep 6, 2015 12:34 PM", "llll uses child");
    });

    it("ordinal", () => {
        ateos.datetime.defineLocale("base-ordinal-1", {
            ordinal: "%dx"
        });
        ateos.datetime.defineLocale("child-ordinal-1", {
            parentLocale: "base-ordinal-1",
            ordinal: "%dy"
        });

        assert.equal(ateos.datetime.utc("2015-02-03", ateos.datetime.ISO_8601).format("Do"), "3y", "ordinal uses child string");

        ateos.datetime.defineLocale("base-ordinal-2", {
            ordinal: "%dx"
        });
        ateos.datetime.defineLocale("child-ordinal-2", {
            parentLocale: "base-ordinal-2",
            ordinal(num) {
                return `${num}y`;
            }
        });

        assert.equal(ateos.datetime.utc("2015-02-03", ateos.datetime.ISO_8601).format("Do"), "3y", "ordinal uses child function");

        ateos.datetime.defineLocale("base-ordinal-3", {
            ordinal(num) {
                return `${num}x`;
            }
        });
        ateos.datetime.defineLocale("child-ordinal-3", {
            parentLocale: "base-ordinal-3",
            ordinal: "%dy"
        });

        assert.equal(ateos.datetime.utc("2015-02-03", ateos.datetime.ISO_8601).format("Do"), "3y", "ordinal uses child string (overwrite parent function)");
    });

    it("ordinal parse", () => {
        ateos.datetime.defineLocale("base-ordinal-parse-1", {
            dayOfMonthOrdinalParse: /\d{1,2}x/
        });
        ateos.datetime.defineLocale("child-ordinal-parse-1", {
            parentLocale: "base-ordinal-parse-1",
            dayOfMonthOrdinalParse: /\d{1,2}y/
        });

        assert.ok(ateos.datetime.utc("2015-01-1y", "YYYY-MM-Do", true).isValid(), "ordinal parse uses child");

        ateos.datetime.defineLocale("base-ordinal-parse-2", {
            dayOfMonthOrdinalParse: /\d{1,2}x/
        });
        ateos.datetime.defineLocale("child-ordinal-parse-2", {
            parentLocale: "base-ordinal-parse-2",
            dayOfMonthOrdinalParse: /\d{1,2}/
        });

        assert.ok(ateos.datetime.utc("2015-01-1", "YYYY-MM-Do", true).isValid(), "ordinal parse uses child (default)");
    });

    it("months", () => {
        ateos.datetime.defineLocale("base-months", {
            months: "One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve".split("_")
        });
        ateos.datetime.defineLocale("child-months", {
            parentLocale: "base-months",
            months: "First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth ".split("_")
        });
        assert.ok(ateos.datetime.utc("2015-01-01", "YYYY-MM-DD").format("MMMM"), "First", "months uses child");
    });

    it("define child locale before parent", () => {
        ateos.datetime.defineLocale("months-x", null);
        ateos.datetime.defineLocale("base-months-x", null);

        ateos.datetime.defineLocale("months-x", {
            parentLocale: "base-months-x",
            months: "First_Second_Third_Fourth_Fifth_Sixth_Seventh_Eighth_Ninth_Tenth_Eleventh_Twelveth ".split("_")
        });
        assert.equal(ateos.datetime.locale(), "en", "failed to set a locale requiring missing parent");
        ateos.datetime.defineLocale("base-months-x", {
            months: "One_Two_Three_Four_Five_Six_Seven_Eight_Nine_Ten_Eleven_Twelve".split("_")
        });
        assert.equal(ateos.datetime.locale(), "base-months-x", "defineLocale should also set the locale (regardless of child locales)");

        assert.equal(ateos.datetime().locale("months-x").month(0).format("MMMM"), "First", "loading child before parent locale works");
    });
});
