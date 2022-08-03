const indexOf = Array.prototype.indexOf;

describe("datetime", "locale", () => {
    beforeEach(() => {
        [{
            name: "en-gb",
            data: {}
        }, {
            name: "en-ca",
            data: {}
        }, {
            name: "es",
            data: {
                relativeTime: { past: "hace %s", s: "unos segundos", d: "un día" },
                months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_")
            }
        }, {
            name: "fr",
            data: {}
        }, {
            name: "fr-ca",
            data: {}
        }, {
            name: "it",
            data: {}
        }, {
            name: "zh-cn",
            data: {
                months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_")
            }
        }].forEach((locale) => {
            if (ateos.datetime.locale(locale.name) !== locale.name) {
                ateos.datetime.defineLocale(locale.name, locale.data);
            }
        });

        ateos.datetime.locale("en");
    });

    it("library getters and setters", () => {
        const r = ateos.datetime.locale("en");

        assert.equal(r, "en", "locale should return en by default");
        assert.equal(ateos.datetime.locale(), "en", "locale should return en by default");

        ateos.datetime.locale("fr");
        assert.equal(ateos.datetime.locale(), "fr", "locale should return the changed locale");

        ateos.datetime.locale("en-gb");
        assert.equal(ateos.datetime.locale(), "en-gb", "locale should return the changed locale");

        ateos.datetime.locale("en");
        assert.equal(ateos.datetime.locale(), "en", "locale should reset");

        ateos.datetime.locale("does-not-exist");
        assert.equal(ateos.datetime.locale(), "en", "locale should reset");

        ateos.datetime.locale("EN");
        assert.equal(ateos.datetime.locale(), "en", "Normalize locale key case");

        ateos.datetime.locale("EN_gb");
        assert.equal(ateos.datetime.locale(), "en-gb", "Normalize locale key underscore");
    });

    it("library setter array of locales", () => {
        assert.equal(ateos.datetime.locale(["non-existent", "fr", "also-non-existent"]), "fr", "passing an array uses the first valid locale");
        assert.equal(ateos.datetime.locale(["es", "fr", "also-non-existent"]), "es", "passing an array uses the first valid locale");
    });

    it("library setter locale substrings", () => {
        assert.equal(ateos.datetime.locale("fr-crap"), "fr", "use substrings");
        assert.equal(ateos.datetime.locale("fr-does-not-exist"), "fr", "uses deep substrings");
        assert.equal(ateos.datetime.locale("fr-CA-does-not-exist"), "fr-ca", "uses deepest substring");
    });

    it("library getter locale array and substrings", () => {
        assert.equal(ateos.datetime.locale(["en-CH", "fr"]), "en", "prefer root locale to shallower ones");
        assert.equal(ateos.datetime.locale(["en-gb-leeds", "en-CA"]), "en-gb", "prefer root locale to shallower ones");
        assert.equal(ateos.datetime.locale(["en-fake", "en-CA"]), "en-ca", "prefer alternatives with shared roots");
        assert.equal(ateos.datetime.locale(["en-fake", "en-fake2", "en-ca"]), "en-ca", "prefer alternatives with shared roots");
        assert.equal(ateos.datetime.locale(["fake-CA", "fake-MX", "fr"]), "fr", "always find something if possible");
        assert.equal(ateos.datetime.locale(["fake-CA", "fake-MX", "fr"]), "fr", "always find something if possible");
        assert.equal(ateos.datetime.locale(["fake-CA", "fake-MX", "fr-fake-fake-fake"]), "fr", "always find something if possible");
        assert.equal(ateos.datetime.locale(["en", "en-CA"]), "en", "prefer earlier if it works");
    });

    it("library ensure inheritance", () => {
        ateos.datetime.locale("made-up", {
            // I put them out of order
            months: "February_March_April_May_June_July_August_September_October_November_December_January".split("_")
            // the rest of the properties should be inherited.
        });

        assert.equal(ateos.datetime([2012, 5, 6]).format("MMMM"), "July", "Override some of the configs");
        assert.equal(ateos.datetime([2012, 5, 6]).format("MMM"), "Jun", "But not all of them");
    });

    it("library ensure inheritance LT L LL LLL LLLL", () => {
        const locale = "test-inherit-lt";

        ateos.datetime.defineLocale(locale, {
            longDateFormat: {
                LT: "-[LT]-",
                L: "-[L]-",
                LL: "-[LL]-",
                LLL: "-[LLL]-",
                LLLL: "-[LLLL]-"
            },
            calendar: {
                sameDay: "[sameDay] LT",
                nextDay: "[nextDay] L",
                nextWeek: "[nextWeek] LL",
                lastDay: "[lastDay] LLL",
                lastWeek: "[lastWeek] LLLL",
                sameElse: "L"
            }
        });

        ateos.datetime.locale("es");

        assert.equal(ateos.datetime().locale(locale).calendar(), "sameDay -LT-", "Should use instance locale in LT formatting");
        assert.equal(ateos.datetime().add(1, "days").locale(locale).calendar(), "nextDay -L-", "Should use instance locale in L formatting");
        assert.equal(ateos.datetime().add(-1, "days").locale(locale).calendar(), "lastDay -LLL-", "Should use instance locale in LL formatting");
        assert.equal(ateos.datetime().add(4, "days").locale(locale).calendar(), "nextWeek -LL-", "Should use instance locale in LLL formatting");
        assert.equal(ateos.datetime().add(-4, "days").locale(locale).calendar(), "lastWeek -LLLL-", "Should use instance locale in LLLL formatting");
    });

    it("library localeData", () => {
        ateos.datetime.locale("en");

        const jan = ateos.datetime([2000, 0]);

        assert.equal(ateos.datetime.localeData().months(jan), "January", "no arguments returns global");
        assert.equal(ateos.datetime.localeData("zh-cn").months(jan), "一月", "a string returns the locale based on key");
        assert.equal(ateos.datetime.localeData(ateos.datetime().locale("es")).months(jan), "enero", "if you pass in a ateos.datetime it uses the ateos.datetime's locale");
    });

    it("defineLocale", () => {
        ateos.datetime.locale("en");
        ateos.datetime.defineLocale("dude", { months: ["Movember"] });
        assert.equal(ateos.datetime().locale(), "dude", "defineLocale also sets it");
        assert.equal(ateos.datetime().locale("dude").locale(), "dude", "defineLocale defines a locale");
        ateos.datetime.defineLocale("dude", null);
    });

    it("locales", () => {
        ateos.datetime.defineLocale("dude", { months: ["Movember"] });
        assert.equal(true, Boolean(~indexOf.call(ateos.datetime.locales(), "dude")), "locales returns an array of defined locales");
        assert.equal(true, Boolean(~indexOf.call(ateos.datetime.locales(), "en")), "locales should always include english");
        ateos.datetime.defineLocale("dude", null);
    });

    it("library convenience", () => {
        ateos.datetime.locale("something", { week: { dow: 3 } });
        ateos.datetime.locale("something");
        assert.equal(ateos.datetime.locale(), "something", "locale can be used to create the locale too");
        ateos.datetime.defineLocale("something", null);
    });

    it("firstDayOfWeek firstDayOfYear locale getters", () => {
        ateos.datetime.locale("something", { week: { dow: 3, doy: 4 } });
        ateos.datetime.locale("something");
        assert.equal(ateos.datetime.localeData().firstDayOfWeek(), 3, "firstDayOfWeek");
        assert.equal(ateos.datetime.localeData().firstDayOfYear(), 4, "firstDayOfYear");
        ateos.datetime.defineLocale("something", null);
    });

    it("instance locale method", () => {
        ateos.datetime.locale("en");

        assert.equal(ateos.datetime([2012, 5, 6]).format("MMMM"), "June", "Normally default to global");
        assert.equal(ateos.datetime([2012, 5, 6]).locale("es").format("MMMM"), "junio", "Use the instance specific locale");
        assert.equal(ateos.datetime([2012, 5, 6]).format("MMMM"), "June", "Using an instance specific locale does not affect other moments");
    });

    it("instance locale method with array", () => {
        let m = ateos.datetime().locale(["non-existent", "fr", "also-non-existent"]);
        assert.equal(m.locale(), "fr", "passing an array uses the first valid locale");
        m = ateos.datetime().locale(["es", "fr", "also-non-existent"]);
        assert.equal(m.locale(), "es", "passing an array uses the first valid locale");
    });

    it("instance getter locale substrings", () => {
        const m = ateos.datetime();

        m.locale("fr-crap");
        assert.equal(m.locale(), "fr", "use substrings");

        m.locale("fr-does-not-exist");
        assert.equal(m.locale(), "fr", "uses deep substrings");
    });

    it("instance locale persists with manipulation", () => {
        ateos.datetime.locale("en");

        assert.equal(ateos.datetime([2012, 5, 6]).locale("es").add({ days: 1 }).format("MMMM"), "junio", "With addition");
        assert.equal(ateos.datetime([2012, 5, 6]).locale("es").day(0).format("MMMM"), "junio", "With day getter");
        assert.equal(ateos.datetime([2012, 5, 6]).locale("es").endOf("day").format("MMMM"), "junio", "With endOf");
    });

    it("instance locale persists with cloning", () => {
        ateos.datetime.locale("en");

        const a = ateos.datetime([2012, 5, 6]).locale("es");
        const b = a.clone();

        assert.equal(b.format("MMMM"), "junio", "using ateos.datetime.fn.clone()");
        assert.equal(b.format("MMMM"), "junio", "using ateos.datetime()");
    });

    it("duration locale method", () => {
        ateos.datetime.locale("en");

        assert.equal(ateos.datetime.duration({ seconds: 44 }).humanize(), "a few seconds", "Normally default to global");
        assert.equal(ateos.datetime.duration({ seconds: 44 }).locale("es").humanize(), "unos segundos", "Use the instance specific locale");
        assert.equal(ateos.datetime.duration({ seconds: 44 }).humanize(), "a few seconds", "Using an instance specific locale does not affect other durations");
    });

    it("duration locale persists with cloning", () => {
        ateos.datetime.locale("en");

        const a = ateos.datetime.duration({ seconds: 44 }).locale("es");
        const b = ateos.datetime.duration(a);

        assert.equal(b.humanize(), "unos segundos", "using ateos.datetime.duration()");
    });

    it("changing the global locale doesn't affect existing duration instances", () => {
        const mom = ateos.datetime.duration();
        ateos.datetime.locale("fr");
        assert.equal("en", mom.locale());
    });

    it("from and fromNow with invalid date", () => {
        assert.equal(ateos.datetime(NaN).from(), "Invalid date", "ateos.datetime.from with invalid ateos.datetime");
        assert.equal(ateos.datetime(NaN).fromNow(), "Invalid date", "ateos.datetime.fromNow with invalid ateos.datetime");
    });

    it("from relative time future", () => {
        const start = ateos.datetime([2007, 1, 28]);

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ s: 44 })), "in a few seconds", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ s: 45 })), "in a minute", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ s: 89 })), "in a minute", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ s: 90 })), "in 2 minutes", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ m: 44 })), "in 44 minutes", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ m: 45 })), "in an hour", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ m: 89 })), "in an hour", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ m: 90 })), "in 2 hours", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ h: 5 })), "in 5 hours", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ h: 21 })), "in 21 hours", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ h: 22 })), "in a day", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ h: 35 })), "in a day", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ h: 36 })), "in 2 days", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 1 })), "in a day", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 5 })), "in 5 days", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 25 })), "in 25 days", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 26 })), "in a month", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 30 })), "in a month", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 45 })), "in a month", "45 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 47 })), "in 2 months", "47 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 74 })), "in 2 months", "74 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 78 })), "in 3 months", "78 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ M: 1 })), "in a month", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ M: 5 })), "in 5 months", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 315 })), "in 10 months", "315 days = 10 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 344 })), "in a year", "344 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 345 })), "in a year", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ d: 548 })), "in 2 years", "548 days = in 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ y: 1 })), "in a year", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).subtract({ y: 5 })), "in 5 years", "5 years = 5 years");
    });

    it("from relative time past", () => {
        const start = ateos.datetime([2007, 1, 28]);

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ s: 44 })), "a few seconds ago", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ s: 45 })), "a minute ago", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ s: 89 })), "a minute ago", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ s: 90 })), "2 minutes ago", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ m: 44 })), "44 minutes ago", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ m: 45 })), "an hour ago", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ m: 89 })), "an hour ago", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ m: 90 })), "2 hours ago", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ h: 5 })), "5 hours ago", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ h: 21 })), "21 hours ago", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ h: 22 })), "a day ago", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ h: 35 })), "a day ago", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ h: 36 })), "2 days ago", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 1 })), "a day ago", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 5 })), "5 days ago", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 25 })), "25 days ago", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 26 })), "a month ago", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 30 })), "a month ago", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 43 })), "a month ago", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 46 })), "2 months ago", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 74 })), "2 months ago", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 76 })), "3 months ago", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ M: 1 })), "a month ago", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ M: 5 })), "5 months ago", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 315 })), "10 months ago", "315 days = 10 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 344 })), "a year ago", "344 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 345 })), "a year ago", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ d: 548 })), "2 years ago", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ y: 1 })), "a year ago", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ y: 5 })), "5 years ago", "5 years = 5 years");
    });

    it("instance locale used with from", () => {
        ateos.datetime.locale("en");

        const a = ateos.datetime([2012, 5, 6]).locale("es");
        const b = ateos.datetime([2012, 5, 7]);

        assert.equal(a.from(b), "hace un día", "preserve locale of first ateos.datetime");
        assert.equal(b.from(a), "in a day", "do not preserve locale of second ateos.datetime");
    });

    it("instance localeData", () => {
        ateos.datetime.defineLocale("dude", { week: { dow: 3 } });
        assert.equal(ateos.datetime().locale("dude").localeData()._week.dow, 3);
        ateos.datetime.defineLocale("dude", null);
    });

    it("month name callback function", () => {
        function fakeReplace(m, format) {
            if (/test/.test(format)) {
                return "test";
            }
            if (m.date() === 1) {
                return "date";
            }
            return "default";
        }

        ateos.datetime.locale("made-up-2", {
            months: fakeReplace,
            monthsShort: fakeReplace,
            weekdays: fakeReplace,
            weekdaysShort: fakeReplace,
            weekdaysMin: fakeReplace
        });

        assert.equal(ateos.datetime().format("[test] dd ddd dddd MMM MMMM"), "test test test test test test", "format month name function should be able to access the format string");
        assert.equal(ateos.datetime([2011, 0, 1]).format("dd ddd dddd MMM MMMM"), "date date date date date", "format month name function should be able to access the ateos.datetime object");
        assert.equal(ateos.datetime([2011, 0, 2]).format("dd ddd dddd MMM MMMM"), "default default default default default", "format month name function should be able to access the ateos.datetime object");
    });

    it("changing parts of a locale config", () => {
        ateos.datetime.locale("partial-lang", {
            months: "a b c d e f g h i j k l".split(" ")
        });

        assert.equal(ateos.datetime([2011, 0, 1]).format("MMMM"), "a", "should be able to set locale values when creating the localeuage");

        ateos.datetime.updateLocale("partial-lang", {
            monthsShort: "A B C D E F G H I J K L".split(" ")
        });

        assert.equal(ateos.datetime([2011, 0, 1]).format("MMMM MMM"), "a A", "should be able to set locale values after creating the localeuage");

        ateos.datetime.defineLocale("partial-lang", null);
    });

    it("start/endOf week feature for first-day-is-monday locales", () => {
        ateos.datetime.locale("monday-lang", {
            week: {
                dow: 1 // Monday is the first day of the week
            }
        });

        ateos.datetime.locale("monday-lang");
        assert.equal(ateos.datetime([2013, 0, 1]).startOf("week").day(), 1, "for locale monday-lang first day of the week should be monday");
        assert.equal(ateos.datetime([2013, 0, 1]).endOf("week").day(), 0, "for locale monday-lang last day of the week should be sunday");
        ateos.datetime.defineLocale("monday-lang", null);
    });

    it("meridiem parsing", () => {
        ateos.datetime.locale("meridiem-parsing", {
            meridiemParse: /[bd]/i,
            isPM(input) {
                return input === "b";
            }
        });

        ateos.datetime.locale("meridiem-parsing");
        assert.equal(ateos.datetime("2012-01-01 3b", "YYYY-MM-DD ha").hour(), 15, "Custom parsing of meridiem should work");
        assert.equal(ateos.datetime("2012-01-01 3d", "YYYY-MM-DD ha").hour(), 3, "Custom parsing of meridiem should work");
        ateos.datetime.defineLocale("meridiem-parsing", null);
    });

    it("invalid date formatting", () => {
        ateos.datetime.locale("has-invalid", {
            invalidDate: "KHAAAAAAAAAAAN!"
        });

        assert.equal(ateos.datetime.invalid().format(), "KHAAAAAAAAAAAN!");
        assert.equal(ateos.datetime.invalid().format("YYYY-MM-DD"), "KHAAAAAAAAAAAN!");
        ateos.datetime.defineLocale("has-invalid", null);
    });

    it("return locale name", () => {
        const registered = ateos.datetime.locale("return-this", {});

        assert.equal(registered, "return-this", "returns the locale configured");
        ateos.datetime.locale("return-this", null);
    });

    it("changing the global locale doesn't affect existing instances", () => {
        const mom = ateos.datetime();
        ateos.datetime.locale("fr");
        assert.equal("en", mom.locale());
    });

    it("setting a language on instance returns the original ateos.datetime for chaining", () => {
        const mom = ateos.datetime();

        assert.equal(mom.locale("it"), mom, "setting the language (locale) returns the original ateos.datetime for chaining");
    });

    it("ateos.datetime#locale(false) resets to global locale", () => {
        const m = ateos.datetime();

        ateos.datetime.locale("fr");
        m.locale("it");

        assert.equal(ateos.datetime.locale(), "fr", "global locale is it");
        assert.equal(m.locale(), "it", "instance locale is it");
        m.locale(false);
        assert.equal(m.locale(), "fr", "instance locale reset to global locale");
    });

    it("ateos.datetime().locale with missing key doesn't change locale", () => {
        assert.equal(ateos.datetime().locale("boo").localeData(), ateos.datetime.localeData(),
                "preserve global locale in case of bad locale id");
    });


    // TODO: Enable this after fixing pl months parse hack hack
    // it('monthsParseExact', () => {
    //     var locale = 'test-months-parse-exact';

    //     ateos.datetime.defineLocale(locale, {
    //         monthsParseExact: true,
    //         months: 'A_AA_AAA_B_B B_BB  B_C_C-C_C,C2C_D_D+D_D`D*D'.split('_'),
    //         monthsShort: 'E_EE_EEE_F_FF_FFF_G_GG_GGG_H_HH_HHH'.split('_')
    //     });

    //     assert.equal(ateos.datetime('A', 'MMMM', true).month(), 0, 'parse long month 0 with MMMM');
    //     assert.equal(ateos.datetime('AA', 'MMMM', true).month(), 1, 'parse long month 1 with MMMM');
    //     assert.equal(ateos.datetime('AAA', 'MMMM', true).month(), 2, 'parse long month 2 with MMMM');
    //     assert.equal(ateos.datetime('B B', 'MMMM', true).month(), 4, 'parse long month 4 with MMMM');
    //     assert.equal(ateos.datetime('BB  B', 'MMMM', true).month(), 5, 'parse long month 5 with MMMM');
    //     assert.equal(ateos.datetime('C-C', 'MMMM', true).month(), 7, 'parse long month 7 with MMMM');
    //     assert.equal(ateos.datetime('C,C2C', 'MMMM', true).month(), 8, 'parse long month 8 with MMMM');
    //     assert.equal(ateos.datetime('D+D', 'MMMM', true).month(), 10, 'parse long month 10 with MMMM');
    //     assert.equal(ateos.datetime('D`D*D', 'MMMM', true).month(), 11, 'parse long month 11 with MMMM');

    //     assert.equal(ateos.datetime('E', 'MMM', true).month(), 0, 'parse long month 0 with MMM');
    //     assert.equal(ateos.datetime('EE', 'MMM', true).month(), 1, 'parse long month 1 with MMM');
    //     assert.equal(ateos.datetime('EEE', 'MMM', true).month(), 2, 'parse long month 2 with MMM');

    //     assert.equal(ateos.datetime('A', 'MMM').month(), 0, 'non-strict parse long month 0 with MMM');
    //     assert.equal(ateos.datetime('AA', 'MMM').month(), 1, 'non-strict parse long month 1 with MMM');
    //     assert.equal(ateos.datetime('AAA', 'MMM').month(), 2, 'non-strict parse long month 2 with MMM');
    //     assert.equal(ateos.datetime('E', 'MMMM').month(), 0, 'non-strict parse short month 0 with MMMM');
    //     assert.equal(ateos.datetime('EE', 'MMMM').month(), 1, 'non-strict parse short month 1 with MMMM');
    //     assert.equal(ateos.datetime('EEE', 'MMMM').month(), 2, 'non-strict parse short month 2 with MMMM');
    // });
});
