import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "sl", () => {
    commonLocaleTests("sl");

    beforeEach(() => {
        ateos.datetime.locale("sl");
    });

    it("parse", () => {
        const tests = "januar jan._februar feb._marec mar._april apr._maj maj_junij jun._julij jul._avgust avg._september sep._oktober okt._november nov._december dec.".split("_");
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
            ["dddd, Do MMMM YYYY, h:mm:ss a", "nedelja, 14. februar 2010, 3:25:50 pm"],
            ["ddd, hA", "ned., 3PM"],
            ["M Mo MM MMMM MMM", "2 2. 02 februar feb."],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14. 14"],
            ["d do dddd ddd dd", "0 0. nedelja ned. ne"],
            ["DDD DDDo DDDD", "45 45. 045"],
            ["w wo ww", "7 7. 07"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "pm PM"],
            ["[the] DDDo [day of the year]", "the 45. day of the year"],
            ["LTS", "15:25:50"],
            ["L", "14.02.2010"],
            ["LL", "14. februar 2010"],
            ["LLL", "14. februar 2010 15:25"],
            ["LLLL", "nedelja, 14. februar 2010 15:25"],
            ["l", "14.2.2010"],
            ["ll", "14. feb. 2010"],
            ["lll", "14. feb. 2010 15:25"],
            ["llll", "ned., 14. feb. 2010 15:25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "1.", "1.");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "2.", "2.");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "3.", "3.");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "4.", "4.");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "5.", "5.");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "6.", "6.");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "7.", "7.");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "8.", "8.");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "9.", "9.");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "10.", "10.");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "11.", "11.");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "12.", "12.");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "13.", "13.");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "14.", "14.");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "15.", "15.");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "16.", "16.");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "17.", "17.");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "18.", "18.");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "19.", "19.");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "20.", "20.");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "21.", "21.");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "22.", "22.");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "23.", "23.");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "24.", "24.");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "25.", "25.");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "26.", "26.");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "27.", "27.");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "28.", "28.");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "29.", "29.");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "30.", "30.");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "31.", "31.");
    });

    it("format month", () => {
        const expected = "januar jan._februar feb._marec mar._april apr._maj maj._junij jun._julij jul._avgust avg._september sep._oktober okt._november nov._december dec.".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "nedelja ned. ne_ponedeljek pon. po_torek tor. to_sreda sre. sr_četrtek čet. če_petek pet. pe_sobota sob. so".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "nekaj sekund", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "ena minuta", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "ena minuta", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "2 minuti", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 minut", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "ena ura", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "ena ura", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "2 uri", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 ur", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 ur", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "en dan", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "en dan", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "2 dni", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "en dan", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 dni", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 dni", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "en mesec", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "en mesec", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "en mesec", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "2 meseca", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "2 meseca", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "3 mesece", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "en mesec", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 mesecev", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "eno leto", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "2 leti", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "eno leto", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 let", "5 years = 5 years");

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 1
        }), true), "ena minuta", "a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 2
        }), true), "2 minuti", "2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 3
        }), true), "3 minute", "3 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 4
        }), true), "4 minute", "4 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 5
        }), true), "5 minut", "5 minutes");

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 1
        }), true), "ena ura", "an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 2
        }), true), "2 uri", "2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 3
        }), true), "3 ure", "3 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 4
        }), true), "4 ure", "4 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 ur", "5 hours");

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "en dan", "a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 2
        }), true), "2 dni", "2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 3
        }), true), "3 dni", "3 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 4
        }), true), "4 dni", "4 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 dni", "5 days");

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "en mesec", "a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 2
        }), true), "2 meseca", "2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 3
        }), true), "3 mesece", "3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 4
        }), true), "4 mesece", "4 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 mesecev", "5 months");

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "eno leto", "a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 2
        }), true), "2 leti", "2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 3
        }), true), "3 leta", "3 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 4
        }), true), "4 leta", "4 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 let", "5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "čez nekaj sekund", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "pred nekaj sekundami", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "pred nekaj sekundami", "now from now should display as in the past");
    });

    it("fromNow (future)", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "čez nekaj sekund", "in a few seconds");
        assert.equal(ateos.datetime().add({
            m: 1
        }).fromNow(), "čez eno minuto", "in a minute");
        assert.equal(ateos.datetime().add({
            m: 2
        }).fromNow(), "čez 2 minuti", "in 2 minutes");
        assert.equal(ateos.datetime().add({
            m: 3
        }).fromNow(), "čez 3 minute", "in 3 minutes");
        assert.equal(ateos.datetime().add({
            m: 4
        }).fromNow(), "čez 4 minute", "in 4 minutes");
        assert.equal(ateos.datetime().add({
            m: 5
        }).fromNow(), "čez 5 minut", "in 5 minutes");

        assert.equal(ateos.datetime().add({
            h: 1
        }).fromNow(), "čez eno uro", "in an hour");
        assert.equal(ateos.datetime().add({
            h: 2
        }).fromNow(), "čez 2 uri", "in 2 hours");
        assert.equal(ateos.datetime().add({
            h: 3
        }).fromNow(), "čez 3 ure", "in 3 hours");
        assert.equal(ateos.datetime().add({
            h: 4
        }).fromNow(), "čez 4 ure", "in 4 hours");
        assert.equal(ateos.datetime().add({
            h: 5
        }).fromNow(), "čez 5 ur", "in 5 hours");

        assert.equal(ateos.datetime().add({
            d: 1
        }).fromNow(), "čez en dan", "in a day");
        assert.equal(ateos.datetime().add({
            d: 2
        }).fromNow(), "čez 2 dni", "in 2 days");
        assert.equal(ateos.datetime().add({
            d: 3
        }).fromNow(), "čez 3 dni", "in 3 days");
        assert.equal(ateos.datetime().add({
            d: 4
        }).fromNow(), "čez 4 dni", "in 4 days");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "čez 5 dni", "in 5 days");

        assert.equal(ateos.datetime().add({
            M: 1
        }).fromNow(), "čez en mesec", "in a month");
        assert.equal(ateos.datetime().add({
            M: 2
        }).fromNow(), "čez 2 meseca", "in 2 months");
        assert.equal(ateos.datetime().add({
            M: 3
        }).fromNow(), "čez 3 mesece", "in 3 months");
        assert.equal(ateos.datetime().add({
            M: 4
        }).fromNow(), "čez 4 mesece", "in 4 months");
        assert.equal(ateos.datetime().add({
            M: 5
        }).fromNow(), "čez 5 mesecev", "in 5 months");

        assert.equal(ateos.datetime().add({
            y: 1
        }).fromNow(), "čez eno leto", "in a year");
        assert.equal(ateos.datetime().add({
            y: 2
        }).fromNow(), "čez 2 leti", "in 2 years");
        assert.equal(ateos.datetime().add({
            y: 3
        }).fromNow(), "čez 3 leta", "in 3 years");
        assert.equal(ateos.datetime().add({
            y: 4
        }).fromNow(), "čez 4 leta", "in 4 years");
        assert.equal(ateos.datetime().add({
            y: 5
        }).fromNow(), "čez 5 let", "in 5 years");

        assert.equal(ateos.datetime().subtract({
            s: 30
        }).fromNow(), "pred nekaj sekundami", "a few seconds ago");

        assert.equal(ateos.datetime().subtract({
            m: 1
        }).fromNow(), "pred eno minuto", "a minute ago");
        assert.equal(ateos.datetime().subtract({
            m: 2
        }).fromNow(), "pred 2 minutama", "2 minutes ago");
        assert.equal(ateos.datetime().subtract({
            m: 3
        }).fromNow(), "pred 3 minutami", "3 minutes ago");
        assert.equal(ateos.datetime().subtract({
            m: 4
        }).fromNow(), "pred 4 minutami", "4 minutes ago");
        assert.equal(ateos.datetime().subtract({
            m: 5
        }).fromNow(), "pred 5 minutami", "5 minutes ago");

        assert.equal(ateos.datetime().subtract({
            h: 1
        }).fromNow(), "pred eno uro", "an hour ago");
        assert.equal(ateos.datetime().subtract({
            h: 2
        }).fromNow(), "pred 2 urama", "2 hours ago");
        assert.equal(ateos.datetime().subtract({
            h: 3
        }).fromNow(), "pred 3 urami", "3 hours ago");
        assert.equal(ateos.datetime().subtract({
            h: 4
        }).fromNow(), "pred 4 urami", "4 hours ago");
        assert.equal(ateos.datetime().subtract({
            h: 5
        }).fromNow(), "pred 5 urami", "5 hours ago");

        assert.equal(ateos.datetime().subtract({
            d: 1
        }).fromNow(), "pred enim dnem", "a day ago");
        assert.equal(ateos.datetime().subtract({
            d: 2
        }).fromNow(), "pred 2 dnevoma", "2 days ago");
        assert.equal(ateos.datetime().subtract({
            d: 3
        }).fromNow(), "pred 3 dnevi", "3 days ago");
        assert.equal(ateos.datetime().subtract({
            d: 4
        }).fromNow(), "pred 4 dnevi", "4 days ago");
        assert.equal(ateos.datetime().subtract({
            d: 5
        }).fromNow(), "pred 5 dnevi", "5 days ago");

        assert.equal(ateos.datetime().subtract({
            M: 1
        }).fromNow(), "pred enim mesecem", "a month ago");
        assert.equal(ateos.datetime().subtract({
            M: 2
        }).fromNow(), "pred 2 mesecema", "2 months ago");
        assert.equal(ateos.datetime().subtract({
            M: 3
        }).fromNow(), "pred 3 meseci", "3 months ago");
        assert.equal(ateos.datetime().subtract({
            M: 4
        }).fromNow(), "pred 4 meseci", "4 months ago");
        assert.equal(ateos.datetime().subtract({
            M: 5
        }).fromNow(), "pred 5 meseci", "5 months ago");

        assert.equal(ateos.datetime().subtract({
            y: 1
        }).fromNow(), "pred enim letom", "a year ago");
        assert.equal(ateos.datetime().subtract({
            y: 2
        }).fromNow(), "pred 2 letoma", "2 years ago");
        assert.equal(ateos.datetime().subtract({
            y: 3
        }).fromNow(), "pred 3 leti", "3 years ago");
        assert.equal(ateos.datetime().subtract({
            y: 4
        }).fromNow(), "pred 4 leti", "4 years ago");
        assert.equal(ateos.datetime().subtract({
            y: 5
        }).fromNow(), "pred 5 leti", "5 years ago");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "danes ob 12:00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "danes ob 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "danes ob 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "jutri ob 12:00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "danes ob 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "včeraj ob 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        function makeFormat(d) {
            switch (d.day()) {
                case 0:
                    return "[v] [nedeljo] [ob] LT";
                case 3:
                    return "[v] [sredo] [ob] LT";
                case 6:
                    return "[v] [soboto] [ob] LT";
                case 1:
                case 2:
                case 4:
                case 5:
                    return "[v] dddd [ob] LT";
            }
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
                    return "[prejšnjo] [nedeljo] [ob] LT";
                case 3:
                    return "[prejšnjo] [sredo] [ob] LT";
                case 6:
                    return "[prejšnjo] [soboto] [ob] LT";
                case 1:
                case 2:
                case 4:
                case 5:
                    return "[prejšnji] dddd [ob] LT";
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
        assert.equal(ateos.datetime([2011, 11, 26]).format("w ww wo"), "1 01 1.", "Dec 26 2011 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "1 01 1.", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "2 02 2.", "Jan  2 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "2 02 2.", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "3 03 3.", "Jan  9 2012 should be week 3");
    });
});
