import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "se", () => {
    commonLocaleTests("se");

    beforeEach(() => {
        ateos.datetime.locale("se");
    });

    it("parse", () => {
        let i;
        const tests = "ođđajagemánnu ođđj_guovvamánnu guov_njukčamánnu njuk_cuoŋománnu cuo_miessemánnu mies_geassemánnu geas_suoidnemánnu suoi_borgemánnu borg_čakčamánnu čakč_golggotmánnu golg_skábmamánnu skáb_juovlamánnu juov".split("_");

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
            ["dddd, MMMM Do YYYY, h:mm:ss a", "sotnabeaivi, guovvamánnu 14. 2010, 3:25:50 pm"],
            ["ddd, hA", "sotn, 3PM"],
            ["M Mo MM MMMM MMM", "2 2. 02 guovvamánnu guov"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14. 14"],
            ["d do dddd ddd dd", "0 0. sotnabeaivi sotn s"],
            ["DDD DDDo DDDD", "45 45. 045"],
            ["w wo ww", "6 6. 06"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "pm PM"],
            ["[jagi] DDDo [beaivi]", "jagi 45. beaivi"],
            ["LTS", "15:25:50"],
            ["L", "14.02.2010"],
            ["LL", "guovvamánnu 14. b. 2010"],
            ["LLL", "guovvamánnu 14. b. 2010 ti. 15:25"],
            ["LLLL", "sotnabeaivi, guovvamánnu 14. b. 2010 ti. 15:25"],
            ["l", "14.2.2010"],
            ["ll", "guov 14. b. 2010"],
            ["lll", "guov 14. b. 2010 ti. 15:25"],
            ["llll", "sotn, guov 14. b. 2010 ti. 15:25"]
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
        let i;
        const expected = "ođđajagemánnu ođđj_guovvamánnu guov_njukčamánnu njuk_cuoŋománnu cuo_miessemánnu mies_geassemánnu geas_suoidnemánnu suoi_borgemánnu borg_čakčamánnu čakč_golggotmánnu golg_skábmamánnu skáb_juovlamánnu juov".split("_");

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        let i;
        const expected = "sotnabeaivi sotn s_vuossárga vuos v_maŋŋebárga maŋ m_gaskavahkku gask g_duorastat duor d_bearjadat bear b_lávvardat láv L".split("_");

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "moadde sekunddat", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "okta minuhta", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "okta minuhta", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "2 minuhtat", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 minuhtat", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "okta diimmu", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "okta diimmu", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "2 diimmut", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 diimmut", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 diimmut", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "okta beaivi", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "okta beaivi", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "2 beaivvit", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "okta beaivi", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 beaivvit", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 beaivvit", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "okta mánnu", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "okta mánnu", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "okta mánnu", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "2 mánut", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "2 mánut", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "3 mánut", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "okta mánnu", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 mánut", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "okta jahki", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "2 jagit", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "okta jahki", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 jagit", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "moadde sekunddat geažes", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "maŋit moadde sekunddat", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "maŋit moadde sekunddat", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "moadde sekunddat geažes", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "5 beaivvit geažes", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "otne ti 12:00", "Today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "otne ti 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "otne ti 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "ihttin ti 12:00", "Tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "otne ti 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "ikte ti 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd [ti] LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd [ti] LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd [ti] LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[ovddit] dddd [ti] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[ovddit] dddd [ti] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[ovddit] dddd [ti] LT"), `Today - ${i} days end of day`);
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
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "52 52 52.", "Jan  1 2012 should be week 52");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "1 01 1.", "Jan  2 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "1 01 1.", "Jan  8 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "2 02 2.", "Jan  9 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).format("w ww wo"), "2 02 2.", "Jan 15 2012 should be week 2");
    });
});
