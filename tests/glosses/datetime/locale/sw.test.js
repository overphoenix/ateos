import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "sw", () => {
    commonLocaleTests("sw");

    beforeEach(() => {
        ateos.datetime.locale("sw");
    });

    it("parse", () => {
        const tests = "Januari Jan_Februari Feb_Machi Mac_Aprili Apr_Mei Mei_Juni Jun_Julai Jul_Agosti Ago_Septemba Sep_Oktoba Okt_Novemba Nov_Desemba Des".split("_");
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
            ["dddd, MMMM Do YYYY, h:mm:ss a", "Jumapili, Februari 14 2010, 3:25:50 pm"],
            ["ddd, hA", "Jpl, 3PM"],
            ["M Mo MM MMMM MMM", "2 2 02 Februari Feb"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14 14"],
            ["d do dddd ddd dd", "0 0 Jumapili Jpl J2"],
            ["DDD DDDo DDDD", "45 45 045"],
            ["w wo ww", "7 7 07"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "pm PM"],
            ["[siku] DDDo [ya mwaka]", "siku 45 ya mwaka"],
            ["LTS", "15:25:50"],
            ["L", "14.02.2010"],
            ["LL", "14 Februari 2010"],
            ["LLL", "14 Februari 2010 15:25"],
            ["LLLL", "Jumapili, 14 Februari 2010 15:25"],
            ["l", "14.2.2010"],
            ["ll", "14 Feb 2010"],
            ["lll", "14 Feb 2010 15:25"],
            ["llll", "Jpl, 14 Feb 2010 15:25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "1", "1");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "2", "2");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "3", "3");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "4", "4");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "5", "5");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "6", "6");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "7", "7");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "8", "8");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "9", "9");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "10", "10");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "11", "11");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "12", "12");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "13", "13");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "14", "14");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "15", "15");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "16", "16");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "17", "17");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "18", "18");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "19", "19");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "20", "20");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "21", "21");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "22", "22");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "23", "23");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "24", "24");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "25", "25");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "26", "26");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "27", "27");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "28", "28");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "29", "29");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "30", "30");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "31", "31");
    });

    it("format month", () => {
        const expected = "Januari Jan_Februari Feb_Machi Mac_Aprili Apr_Mei Mei_Juni Jun_Julai Jul_Agosti Ago_Septemba Sep_Oktoba Okt_Novemba Nov_Desemba Des".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "Jumapili Jpl J2_Jumatatu Jtat J3_Jumanne Jnne J4_Jumatano Jtan J5_Alhamisi Alh Al_Ijumaa Ijm Ij_Jumamosi Jmos J1".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "hivi punde", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "dakika moja", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "dakika moja", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "dakika 2", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "dakika 44", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "saa limoja", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "saa limoja", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "masaa 2", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "masaa 5", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "masaa 21", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "siku moja", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "siku moja", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "masiku 2", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "siku moja", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "masiku 5", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "masiku 25", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "mwezi mmoja", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "mwezi mmoja", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "mwezi mmoja", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "miezi 2", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "miezi 2", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "miezi 3", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "mwezi mmoja", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "miezi 5", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "mwaka mmoja", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "miaka 2", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "mwaka mmoja", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "miaka 5", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "hivi punde baadaye", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "tokea hivi punde", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "tokea hivi punde", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "hivi punde baadaye", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "masiku 5 baadaye", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);
        assert.equal(ateos.datetime(a).calendar(), "leo saa 12:00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "leo saa 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "leo saa 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "kesho saa 12:00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "leo saa 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "jana 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("[wiki ijayo] dddd [saat] LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[wiki ijayo] dddd [saat] LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[wiki ijayo] dddd [saat] LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[wiki iliyopita] dddd [saat] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[wiki iliyopita] dddd [saat] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[wiki iliyopita] dddd [saat] LT"), `Today - ${i} days end of day`);
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

    it("weeks year starting sunday format", () => {
        assert.equal(ateos.datetime([2011, 11, 26]).format("w ww wo"), "1 01 1", "Dec 26 2011 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "1 01 1", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "2 02 2", "Jan  2 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "2 02 2", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "3 03 3", "Jan  9 2012 should be week 3");
    });
});
