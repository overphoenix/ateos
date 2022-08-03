import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "fi", () => {
    commonLocaleTests("fi");

    beforeEach(() => {
        ateos.datetime.locale("fi");
    });

    it("parse", () => {
        const tests = "tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kesäkuu kesä_heinäkuu heinä_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu".split("_");
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
            ["dddd, MMMM Do YYYY, h:mm:ss a", "sunnuntai, helmikuu 14. 2010, 3:25:50 pm"],
            ["ddd, hA", "su, 3PM"],
            ["M Mo MM MMMM MMM", "2 2. 02 helmikuu helmi"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14. 14"],
            ["d do dddd ddd dd", "0 0. sunnuntai su su"],
            ["DDD DDDo DDDD", "45 45. 045"],
            ["w wo ww", "6 6. 06"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "pm PM"],
            ["[vuoden] DDDo [päivä]", "vuoden 45. päivä"],
            ["LTS", "15.25.50"],
            ["L", "14.02.2010"],
            ["LL", "14. helmikuuta 2010"],
            ["LLL", "14. helmikuuta 2010, klo 15.25"],
            ["LLLL", "sunnuntai, 14. helmikuuta 2010, klo 15.25"],
            ["l", "14.2.2010"],
            ["ll", "14. helmi 2010"],
            ["lll", "14. helmi 2010, klo 15.25"],
            ["llll", "su, 14. helmi 2010, klo 15.25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "1.", "1st");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "2.", "2nd");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "3.", "3rd");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "4.", "4th");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "5.", "5th");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "6.", "6th");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "7.", "7th");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "8.", "8th");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "9.", "9th");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "10.", "10th");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "11.", "11th");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "12.", "12th");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "13.", "13th");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "14.", "14th");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "15.", "15th");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "16.", "16th");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "17.", "17th");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "18.", "18th");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "19.", "19th");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "20.", "20th");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "21.", "21st");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "22.", "22nd");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "23.", "23rd");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "24.", "24th");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "25.", "25th");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "26.", "26th");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "27.", "27th");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "28.", "28th");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "29.", "29th");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "30.", "30th");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "31.", "31st");
    });

    it("format month", () => {
        const expected = "tammikuu tammi_helmikuu helmi_maaliskuu maalis_huhtikuu huhti_toukokuu touko_kesäkuu kesä_heinäkuu heinä_elokuu elo_syyskuu syys_lokakuu loka_marraskuu marras_joulukuu joulu".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "sunnuntai su su_maanantai ma ma_tiistai ti ti_keskiviikko ke ke_torstai to to_perjantai pe pe_lauantai la la".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "muutama sekunti", "44 seconds = few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "minuutti", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "minuutti", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "kaksi minuuttia", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 minuuttia", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "tunti", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "tunti", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "kaksi tuntia", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "viisi tuntia", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 tuntia", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "päivä", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "päivä", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "kaksi päivää", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "päivä", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "viisi päivää", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 päivää", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "kuukausi", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "kuukausi", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "kuukausi", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "kaksi kuukautta", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "kaksi kuukautta", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "kolme kuukautta", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "kuukausi", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "viisi kuukautta", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "vuosi", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "kaksi vuotta", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "vuosi", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "viisi vuotta", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "muutaman sekunnin päästä", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "muutama sekunti sitten", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "muutama sekunti sitten", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "muutaman sekunnin päästä", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "viiden päivän päästä", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "tänään klo 12.00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "tänään klo 12.25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "tänään klo 13.00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "huomenna klo 12.00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "tänään klo 11.00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "eilen klo 12.00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd [klo] LT"), `today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd [klo] LT"), `today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd [klo] LT"), `today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[viime] dddd[na] [klo] LT"), `today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[viime] dddd[na] [klo] LT"), `today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[viime] dddd[na] [klo] LT"), `today - ${i} days end of day`);
        }
    });

    it("calendar all else", () => {
        let weeksAgo = ateos.datetime().subtract({
            w: 1
        });
        let weeksFromNow = ateos.datetime().add({
            w: 1
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format("L"), "yksi viikko sitten");
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format("L"), "yhden viikon päästä");

        weeksAgo = ateos.datetime().subtract({
            w: 2
        });
        weeksFromNow = ateos.datetime().add({
            w: 2
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format("L"), "kaksi viikkoa sitten");
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format("L"), "kaden viikon päästä");
    });

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "52 52 52.", "Jan  1 2012 should be week 52");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "1 01 1.", "Jan  2 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "1 01 1.", "Jan  8 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "2 02 2.", "Jan  9 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).format("w ww wo"), "2 02 2.", "Jan 15 2012 should be week 2");
    });
});
