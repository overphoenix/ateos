import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "dv", () => {
    commonLocaleTests("dv");

    before(() => {
        ateos.datetime.locale("dv");
    });

    after(() => {
        ateos.datetime.locale("en");
    });

    it("parse", () => {
        let i;
        const tests = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"];

        function equalTest(input, mmm, i) {
            assert.equal(ateos.datetime(input, mmm).month(), i, `${input} should be month ${i + 1}`);
        }

        for (i = 0; i < 12; i++) {
            equalTest(tests[i], "MMM", i);
            equalTest(tests[i], "MMMM", i);
            equalTest(tests[i].toLocaleLowerCase(), "MMMM", i);
            equalTest(tests[i].toLocaleUpperCase(), "MMMM", i);
        }
    });

    it("format", () => {
        const a = [
            ["dddd, MMMM Do YYYY, h:mm:ss a", "އާދިއްތަ، ފެބްރުއަރީ 14 2010، 3:25:50 މފ"],
            ["ddd, hA", "އާދިއްތަ، 3މފ"],
            ["M Mo MM MMMM MMM", "2 2 02 ފެބްރުއަރީ ފެބްރުއަރީ"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14 14"],
            ["d do dddd ddd dd", "0 0 އާދިއްތަ އާދިއްތަ އާދި"],
            ["DDD DDDo DDDD", "45 45 045"],
            ["w wo ww", "8 8 08"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "މފ މފ"],
            ["LTS", "15:25:50"],
            ["L", "14/2/2010"],
            ["LL", "14 ފެބްރުއަރީ 2010"],
            ["LLL", "14 ފެބްރުއަރީ 2010 15:25"],
            ["LLLL", "އާދިއްތަ 14 ފެބްރުއަރީ 2010 15:25"],
            ["l", "14/2/2010"],
            ["ll", "14 ފެބްރުއަރީ 2010"],
            ["lll", "14 ފެބްރުއަރީ 2010 15:25"],
            ["llll", "އާދިއްތަ 14 ފެބްރުއަރީ 2010 15:25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format month", () => {
        let i;
        const expected = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"];

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM"), expected[i]);
        }
    });

    it("format week", () => {
        let i;
        const expected = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd"), expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "ސިކުންތުކޮޅެއް", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "މިނިޓެއް", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "މިނިޓެއް", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "މިނިޓު 2", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "މިނިޓު 44", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "ގަޑިއިރެއް", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "ގަޑިއިރެއް", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "ގަޑިއިރު 2", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "ގަޑިއިރު 5", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "ގަޑިއިރު 21", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "ދުވަހެއް", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "ދުވަހެއް", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "ދުވަސް 2", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "ދުވަހެއް", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "ދުވަސް 5", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "ދުވަސް 25", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "މަހެއް", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "މަހެއް", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "މަހެއް", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "މަސް 2", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "މަސް 2", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "މަސް 3", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "މަހެއް", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "މަސް 5", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "އަހަރެއް", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "އަހަރު 2", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "އަހަރެއް", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "އަހަރު 5", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "ތެރޭގައި ސިކުންތުކޮޅެއް", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "ކުރިން ސިކުންތުކޮޅެއް", "suffix");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "ތެރޭގައި ސިކުންތުކޮޅެއް", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "ތެރޭގައި ދުވަސް 5", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "މިއަދު 12:00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "މިއަދު 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "މިއަދު 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "މާދަމާ 12:00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "މިއަދު 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "އިއްޔެ 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[ފާއިތުވި] dddd LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[ފާއިތުވި] dddd LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[ފާއިތުވި] dddd LT"), `Today + ${i} days end of day`);
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
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "1 01 1", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "1 01 1", "Jan  2 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "2 02 2", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "2 02 2", "Jan  9 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).format("w ww wo"), "3 03 3", "Jan 15 2012 should be week 3");
    });
});
