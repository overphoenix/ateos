import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "be", () => {
    commonLocaleTests("be");

    before(() => {
        ateos.datetime.locale("be");
    });

    after(() => {
        ateos.datetime.locale("en");
    });

    it("parse", () => {
        const tests = "студзень студ_люты лют_сакавік сак_красавік крас_травень трав_чэрвень чэрв_ліпень ліп_жнівень жнів_верасень вер_кастрычнік каст_лістапад ліст_снежань снеж".split("_");
        let i;

        function equalTest(input, mmm, i) {
            assert.equal(ateos.datetime(input, mmm).month(), i, `${input} should be month ${i + 1}`);
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(" ");
            equalTest(tests[i][0], "MMM", i);
            equalTest(tests[i][1], "MMM", i);
            equalTest(tests[i][0], "MMMM", i);
            equalTest(tests[i][1], "MMMM", i);
            equalTest(tests[i][0].toLocaleLowerCase(), "MMMM", i);
            equalTest(tests[i][1].toLocaleLowerCase(), "MMMM", i);
            equalTest(tests[i][0].toLocaleUpperCase(), "MMMM", i);
            equalTest(tests[i][1].toLocaleUpperCase(), "MMMM", i);
        }
    });

    it("format", () => {
        const a = [
            ["dddd, Do MMMM YYYY, HH:mm:ss", "нядзеля, 14-га лютага 2010, 15:25:50"],
            ["ddd, h A", "нд, 3 дня"],
            ["M Mo MM MMMM MMM", "2 2-і 02 люты лют"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14-га 14"],
            ["d do dddd ddd dd", "0 0-ы нядзеля нд нд"],
            ["DDD DDDo DDDD", "45 45-ы 045"],
            ["w wo ww", "7 7-ы 07"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "дня дня"],
            ["DDDo [дзень года]", "45-ы дзень года"],
            ["LT", "15:25"],
            ["LTS", "15:25:50"],
            ["L", "14.02.2010"],
            ["LL", "14 лютага 2010 г."],
            ["LLL", "14 лютага 2010 г., 15:25"],
            ["LLLL", "нядзеля, 14 лютага 2010 г., 15:25"],
            ["l", "14.2.2010"],
            ["ll", "14 лют 2010 г."],
            ["lll", "14 лют 2010 г., 15:25"],
            ["llll", "нд, 14 лют 2010 г., 15:25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format meridiem", () => {
        assert.equal(ateos.datetime([2012, 11, 28, 0, 0]).format("A"), "ночы", "night");
        assert.equal(ateos.datetime([2012, 11, 28, 3, 59]).format("A"), "ночы", "night");
        assert.equal(ateos.datetime([2012, 11, 28, 4, 0]).format("A"), "раніцы", "morning");
        assert.equal(ateos.datetime([2012, 11, 28, 11, 59]).format("A"), "раніцы", "morning");
        assert.equal(ateos.datetime([2012, 11, 28, 12, 0]).format("A"), "дня", "afternoon");
        assert.equal(ateos.datetime([2012, 11, 28, 16, 59]).format("A"), "дня", "afternoon");
        assert.equal(ateos.datetime([2012, 11, 28, 17, 0]).format("A"), "вечара", "evening");
        assert.equal(ateos.datetime([2012, 11, 28, 23, 59]).format("A"), "вечара", "evening");
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "1-ы", "1-ы");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "2-і", "2-і");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "3-і", "3-і");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "4-ы", "4-ы");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "5-ы", "5-ы");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "6-ы", "6-ы");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "7-ы", "7-ы");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "8-ы", "8-ы");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "9-ы", "9-ы");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "10-ы", "10-ы");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "11-ы", "11-ы");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "12-ы", "12-ы");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "13-ы", "13-ы");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "14-ы", "14-ы");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "15-ы", "15-ы");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "16-ы", "16-ы");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "17-ы", "17-ы");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "18-ы", "18-ы");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "19-ы", "19-ы");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "20-ы", "20-ы");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "21-ы", "21-ы");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "22-і", "22-і");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "23-і", "23-і");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "24-ы", "24-ы");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "25-ы", "25-ы");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "26-ы", "26-ы");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "27-ы", "27-ы");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "28-ы", "28-ы");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "29-ы", "29-ы");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "30-ы", "30-ы");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "31-ы", "31-ы");
    });

    it("format month", () => {
        const expected = "студзень студ_люты лют_сакавік сак_красавік крас_травень трав_чэрвень чэрв_ліпень ліп_жнівень жнів_верасень вер_кастрычнік каст_лістапад ліст_снежань снеж".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format month case", () => {
        const months = {
            nominative: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_"),
            accusative: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_")
        };
        let i;

        for (i = 0; i < 12; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("D MMMM"), `1 ${months.accusative[i]}`, `1 ${months.accusative[i]}`);
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM"), months.nominative[i], `1 ${months.nominative[i]}`);
        }
    });

    it("format month case with escaped symbols", () => {
        const months = {
            nominative: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_"),
            accusative: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_")
        };
        let i;

        for (i = 0; i < 12; i++) {
            assert.equal(ateos.datetime([2013, i, 1]).format("D[] MMMM"), `1 ${months.accusative[i]}`, `1 ${months.accusative[i]}`);
            assert.equal(ateos.datetime([2013, i, 1]).format("[<i>]D[</i>] [<b>]MMMM[</b>]"), `<i>1</i> <b>${months.accusative[i]}</b>`, `1 <b>${months.accusative[i]}</b>`);
            assert.equal(ateos.datetime([2013, i, 1]).format("D[-ы дзень] MMMM"), `1-ы дзень ${months.accusative[i]}`, `1-ы дзень ${months.accusative[i]}`);
            assert.equal(ateos.datetime([2013, i, 1]).format("D, MMMM"), `1, ${months.nominative[i]}`, `1, ${months.nominative[i]}`);
        }
    });

    it("format week", () => {
        const expected = "нядзеля нд нд_панядзелак пн пн_аўторак ат ат_серада ср ср_чацвер чц чц_пятніца пт пт_субота сб сб".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "некалькі секунд", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "хвіліна", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "хвіліна", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "2 хвіліны", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 31
        }), true), "31 хвіліна", "31 minutes = 31 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 хвіліны", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "гадзіна", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "гадзіна", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "2 гадзіны", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 гадзін", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 гадзіна", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "дзень", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "дзень", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "2 дні", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "дзень", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 дзён", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 11
        }), true), "11 дзён", "11 days = 11 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 21
        }), true), "21 дзень", "21 days = 21 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 дзён", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "месяц", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "месяц", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "месяц", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "2 месяцы", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "2 месяцы", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "3 месяцы", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "месяц", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 месяцаў", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "год", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "2 гады", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "год", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 гадоў", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "праз некалькі секунд", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "некалькі секунд таму", "suffix");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "праз некалькі секунд", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "праз 5 дзён", "in 5 days");
        assert.equal(ateos.datetime().add({
            m: 31
        }).fromNow(), "праз 31 хвіліну", "in 31 minutes = in 31 minutes");
        assert.equal(ateos.datetime().subtract({
            m: 31
        }).fromNow(), "31 хвіліну таму", "31 minutes ago = 31 minutes ago");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "Сёння ў 12:00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "Сёння ў 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "Сёння ў 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "Заўтра ў 12:00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "Сёння ў 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "Учора ў 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        function makeFormat() {
            return "[У] dddd [ў] LT";
        }

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format(makeFormat(m)), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format(makeFormat(m)), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format(makeFormat(m)), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        function makeFormat(d) {
            switch (d.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return "[У мінулую] dddd [ў] LT";
                case 1:
                case 2:
                case 4:
                    return "[У мінулы] dddd [ў] LT";
            }
        }

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format(makeFormat(m)), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format(makeFormat(m)), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format(makeFormat(m)), `Today - ${i} days end of day`);
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

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2011, 11, 26]).format("w ww wo"), "1 01 1-ы", "Dec 26 2011 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "1 01 1-ы", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "2 02 2-і", "Jan  2 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "2 02 2-і", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "3 03 3-і", "Jan  9 2012 should be week 3");
    });
});
