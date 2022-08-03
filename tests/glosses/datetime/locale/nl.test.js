import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "nl", () => {
    commonLocaleTests("nl");

    beforeEach(() => {
        ateos.datetime.locale("nl");
    });

    it("parse", () => {
        const tests = "januari jan._februari feb._maart mrt._april apr._mei mei._juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.".split("_");
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
            ["dddd, MMMM Do YYYY, HH:mm:ss", "zondag, februari 14de 2010, 15:25:50"],
            ["ddd, HH", "zo., 15"],
            ["M Mo MM MMMM MMM", "2 2de 02 februari feb."],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14de 14"],
            ["d do dddd ddd dd", "0 0de zondag zo. zo"],
            ["DDD DDDo DDDD", "45 45ste 045"],
            ["w wo ww", "6 6de 06"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "pm PM"],
            ["[the] DDDo [day of the year]", "the 45ste day of the year"],
            ["LTS", "15:25:50"],
            ["L", "14-02-2010"],
            ["LL", "14 februari 2010"],
            ["LLL", "14 februari 2010 15:25"],
            ["LLLL", "zondag 14 februari 2010 15:25"],
            ["l", "14-2-2010"],
            ["ll", "14 feb. 2010"],
            ["lll", "14 feb. 2010 15:25"],
            ["llll", "zo. 14 feb. 2010 15:25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "1ste", "1ste");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "2de", "2de");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "3de", "3de");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "4de", "4de");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "5de", "5de");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "6de", "6de");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "7de", "7de");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "8ste", "8ste");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "9de", "9de");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "10de", "10de");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "11de", "11de");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "12de", "12de");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "13de", "13de");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "14de", "14de");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "15de", "15de");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "16de", "16de");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "17de", "17de");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "18de", "18de");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "19de", "19de");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "20ste", "20ste");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "21ste", "21ste");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "22ste", "22ste");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "23ste", "23ste");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "24ste", "24ste");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "25ste", "25ste");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "26ste", "26ste");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "27ste", "27ste");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "28ste", "28ste");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "29ste", "29ste");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "30ste", "30ste");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "31ste", "31ste");
    });

    it("format month", () => {
        const expected = "januari jan._februari feb._maart mrt._april apr._mei mei_juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "zondag zo. zo_maandag ma. ma_dinsdag di. di_woensdag wo. wo_donderdag do. do_vrijdag vr. vr_zaterdag za. za".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "een paar seconden", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "één minuut", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "één minuut", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "2 minuten", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 minuten", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "één uur", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "één uur", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "2 uur", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 uur", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 uur", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "één dag", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "één dag", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "2 dagen", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "één dag", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 dagen", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 dagen", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "één maand", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "één maand", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "één maand", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "2 maanden", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "2 maanden", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "3 maanden", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "één maand", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 maanden", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "één jaar", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "2 jaar", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "één jaar", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 jaar", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "over een paar seconden", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "een paar seconden geleden", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "een paar seconden geleden", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "over een paar seconden", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "over 5 dagen", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "vandaag om 12:00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "vandaag om 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "vandaag om 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "morgen om 12:00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "vandaag om 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "gisteren om 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd [om] LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd [om] LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd [om] LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[afgelopen] dddd [om] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[afgelopen] dddd [om] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[afgelopen] dddd [om] LT"), `Today - ${i} days end of day`);
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

    it("month abbreviation", () => {
        assert.equal(ateos.datetime([2012, 5, 23]).format("D-MMM-YYYY"), "23-jun-2012", "format month abbreviation surrounded by dashes should not include a dot");
        assert.equal(ateos.datetime([2012, 5, 23]).unix(), ateos.datetime("23-jun-2012", "D-MMM-YYYY").unix(), "parse month abbreviation surrounded by dashes without dot");
        assert.equal(ateos.datetime([2012, 5, 23]).format("D MMM YYYY"), "23 jun. 2012", "format month abbreviation not surrounded by dashes should include a dot");
        assert.equal(ateos.datetime([2012, 5, 23]).unix(), ateos.datetime("23 jun. 2012", "D MMM YYYY").unix(), "parse month abbreviation not surrounded by dashes with dot");
    });

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "52 52 52ste", "Jan  1 2012 should be week 52");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "1 01 1ste", "Jan  2 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "1 01 1ste", "Jan  8 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "2 02 2de", "Jan  9 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).format("w ww wo"), "2 02 2de", "Jan 15 2012 should be week 2");
    });
});
