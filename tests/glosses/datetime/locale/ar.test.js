import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "ar", () => {
    commonLocaleTests("ar");

    before(() => {
        ateos.datetime.locale("ar");
    });

    after(() => {
        ateos.datetime.locale("en");
    });

    const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ];


    it("parse", () => {
        const tests = months;
        let i;

        function equalTest(input, mmm, i) {
            assert.equal(ateos.datetime(input, mmm).month(), i, `${input} should be month ${i + 1} instead is month ${ateos.datetime(input, mmm).month()}`);
        }
        for (i = 0; i < 12; i++) {
            equalTest(tests[i], "MMM", i);
            equalTest(tests[i], "MMM", i);
            equalTest(tests[i], "MMMM", i);
            equalTest(tests[i], "MMMM", i);
            equalTest(tests[i].toLocaleLowerCase(), "MMMM", i);
            equalTest(tests[i].toLocaleLowerCase(), "MMMM", i);
            equalTest(tests[i].toLocaleUpperCase(), "MMMM", i);
            equalTest(tests[i].toLocaleUpperCase(), "MMMM", i);
        }
    });

    it("format", () => {
        const a = [
            ["dddd, MMMM Do YYYY, h:mm:ss a", "الأحد، فبراير ١٤ ٢٠١٠، ٣:٢٥:٥٠ م"],
            ["ddd, hA", "أحد، ٣م"],
            ["M Mo MM MMMM MMM", "٢ ٢ ٠٢ فبراير فبراير"],
            ["YYYY YY", "٢٠١٠ ١٠"],
            ["D Do DD", "١٤ ١٤ ١٤"],
            ["d do dddd ddd dd", "٠ ٠ الأحد أحد ح"],
            ["DDD DDDo DDDD", "٤٥ ٤٥ ٠٤٥"],
            ["w wo ww", "٨ ٨ ٠٨"],
            ["h hh", "٣ ٠٣"],
            ["H HH", "١٥ ١٥"],
            ["m mm", "٢٥ ٢٥"],
            ["s ss", "٥٠ ٥٠"],
            ["a A", "م م"],
            ["[the] DDDo [day of the year]", "the ٤٥ day of the year"],
            ["LT", "١٥:٢٥"],
            ["LTS", "١٥:٢٥:٥٠"],
            ["L", "١٤/\u200f٢/\u200f٢٠١٠"],
            ["LL", "١٤ فبراير ٢٠١٠"],
            ["LLL", "١٤ فبراير ٢٠١٠ ١٥:٢٥"],
            ["LLLL", "الأحد ١٤ فبراير ٢٠١٠ ١٥:٢٥"],
            ["l", "١٤/\u200f٢/\u200f٢٠١٠"],
            ["ll", "١٤ فبراير ٢٠١٠"],
            ["lll", "١٤ فبراير ٢٠١٠ ١٥:٢٥"],
            ["llll", "أحد ١٤ فبراير ٢٠١٠ ١٥:٢٥"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "١", "1");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "٢", "2");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "٣", "3");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "٤", "4");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "٥", "5");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "٦", "6");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "٧", "7");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "٨", "8");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "٩", "9");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "١٠", "10");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "١١", "11");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "١٢", "12");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "١٣", "13");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "١٤", "14");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "١٥", "15");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "١٦", "16");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "١٧", "17");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "١٨", "18");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "١٩", "19");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "٢٠", "20");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "٢١", "21");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "٢٢", "22");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "٢٣", "23");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "٢٤", "24");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "٢٥", "25");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "٢٦", "26");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "٢٧", "27");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "٢٨", "28");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "٢٩", "29");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "٣٠", "30");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "٣١", "31");
    });

    it("format month", () => {
        const expected = months;
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM"), expected[i], expected[i]);
            assert.equal(ateos.datetime([2011, i, 1]).format("MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "٤٤ ثانية", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "دقيقة واحدة", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "دقيقة واحدة", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "دقيقتان", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "٤٤ دقيقة", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "ساعة واحدة", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "ساعة واحدة", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "ساعتان", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "٥ ساعات", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "٢١ ساعة", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "يوم واحد", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "يوم واحد", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "يومان", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "يوم واحد", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "٥ أيام", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "٢٥ يومًا", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "شهر واحد", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "شهر واحد", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "شهر واحد", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "شهران", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "شهران", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "٣ أشهر", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "شهر واحد", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "٥ أشهر", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "عام واحد", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "عامان", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "عام واحد", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "٥ أعوام", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "بعد ٣٠ ثانية", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "منذ ٣٠ ثانية", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "منذ ثانية واحدة", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "بعد ٣٠ ثانية", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "بعد ٥ أيام", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "اليوم عند الساعة ١٢:٠٠", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "اليوم عند الساعة ١٢:٢٥", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "اليوم عند الساعة ١٣:٠٠", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "غدًا عند الساعة ١٢:٠٠", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "اليوم عند الساعة ١١:٠٠", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "أمس عند الساعة ١٢:٠٠", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd [عند الساعة] LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd [عند الساعة] LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd [عند الساعة] LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd [عند الساعة] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd [عند الساعة] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd [عند الساعة] LT"), `Today - ${i} days end of day`);
        }
    });

    it("calendar all else", () => {
        let weeksAgo = ateos.datetime().subtract({
            w: 1
        });
        let weeksFromNow = ateos.datetime().add({
            w: 1
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format("L"), "1 week ago");
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format("L"), "in 1 week");

        weeksAgo = ateos.datetime().subtract({
            w: 2
        });
        weeksFromNow = ateos.datetime().add({
            w: 2
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format("L"), "2 weeks ago");
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format("L"), "in 2 weeks");
    });

    it("weeks year starting wednesday custom", () => {
        assert.equal(ateos.datetime("2003 1 6", "gggg w d").format("YYYY-MM-DD"), "٢٠٠٢-١٢-٢٨", "Week 1 of 2003 should be Dec 28 2002");
        assert.equal(ateos.datetime("2003 1 0", "gggg w e").format("YYYY-MM-DD"), "٢٠٠٢-١٢-٢٨", "Week 1 of 2003 should be Dec 28 2002");
        assert.equal(ateos.datetime("2003 1 6", "gggg w d").format("gggg w d"), "٢٠٠٣ ١ ٦", "Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6");
        assert.equal(ateos.datetime("2003 1 0", "gggg w e").format("gggg w e"), "٢٠٠٣ ١ ٠", "1st day of week 1 of 2003 parsed should be formatted as 2003 1 0");
    });

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2011, 11, 31]).format("w ww wo"), "١ ٠١ ١", "Dec 31 2011 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 6]).format("w ww wo"), "١ ٠١ ١", "Jan  6 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 7]).format("w ww wo"), "٢ ٠٢ ٢", "Jan  7 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 13]).format("w ww wo"), "٢ ٠٢ ٢", "Jan 13 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 14]).format("w ww wo"), "٣ ٠٣ ٣", "Jan 14 2012 should be week 3");
    });

    it("no leading zeros in long date formats", () => {
        let i;
        let j;
        let longDateStr;
        let shortDateStr;

        for (i = 1; i <= 9; ++i) {
            for (j = 1; j <= 9; ++j) {
                longDateStr = ateos.datetime([2014, i, j]).format("L");
                shortDateStr = ateos.datetime([2014, i, j]).format("l");
                assert.equal(longDateStr, shortDateStr, "should not have leading zeros in month or day");
            }
        }
    });

    it("ar strict mode parsing works", () => {
        const m = ateos.datetime().locale("ar");
        const formattedDate = m.format("l");
        assert.equal(ateos.datetime.utc(formattedDate, "l", "ar", false).isValid(), true, "Non-strict parsing works");
        assert.equal(ateos.datetime.utc(formattedDate, "l", "ar", true).isValid(), true, "Strict parsing must work");
    });

});
