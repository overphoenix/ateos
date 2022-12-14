import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "pa-in", () => {
    commonLocaleTests("pa-in");

    beforeEach(() => {
        ateos.datetime.locale("pa-in");
    });

    it("parse", () => {
        const tests = "ਜਨਵਰੀ ਜਨਵਰੀ_ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ_ਮਾਰਚ ਮਾਰਚ_ਅਪ੍ਰੈਲ ਅਪ੍ਰੈਲ_ਮਈ ਮਈ_ਜੂਨ ਜੂਨ_ਜੁਲਾਈ ਜੁਲਾਈ_ਅਗਸਤ ਅਗਸਤ_ਸਤੰਬਰ ਸਤੰਬਰ_ਅਕਤੂਬਰ ਅਕਤੂਬਰ_ਨਵੰਬਰ ਨਵੰਬਰ_ਦਸੰਬਰ ਦਸੰਬਰ".split("_");
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
            ["dddd, Do MMMM YYYY, a h:mm:ss ਵਜੇ", "ਐਤਵਾਰ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫:੫੦ ਵਜੇ"],
            ["ddd, a h ਵਜੇ", "ਐਤ, ਦੁਪਹਿਰ ੩ ਵਜੇ"],
            ["M Mo MM MMMM MMM", "੨ ੨ ੦੨ ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ"],
            ["YYYY YY", "੨੦੧੦ ੧੦"],
            ["D Do DD", "੧੪ ੧੪ ੧੪"],
            ["d do dddd ddd dd", "੦ ੦ ਐਤਵਾਰ ਐਤ ਐਤ"],
            ["DDD DDDo DDDD", "੪੫ ੪੫ ੦੪੫"],
            ["w wo ww", "੮ ੮ ੦੮"],
            ["h hh", "੩ ੦੩"],
            ["H HH", "੧੫ ੧੫"],
            ["m mm", "੨੫ ੨੫"],
            ["s ss", "੫੦ ੫੦"],
            ["a A", "ਦੁਪਹਿਰ ਦੁਪਹਿਰ"],
            ["LTS", "ਦੁਪਹਿਰ ੩:੨੫:੫੦ ਵਜੇ"],
            ["L", "੧੪/੦੨/੨੦੧੦"],
            ["LL", "੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦"],
            ["LLL", "੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ"],
            ["LLLL", "ਐਤਵਾਰ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ"],
            ["l", "੧੪/੨/੨੦੧੦"],
            ["ll", "੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦"],
            ["lll", "੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ"],
            ["llll", "ਐਤ, ੧੪ ਫ਼ਰਵਰੀ ੨੦੧੦, ਦੁਪਹਿਰ ੩:੨੫ ਵਜੇ"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "੧", "੧");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "੨", "੨");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "੩", "੩");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "੪", "੪");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "੫", "੫");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "੬", "੬");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "੭", "੭");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "੮", "੮");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "੯", "੯");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "੧੦", "੧੦");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "੧੧", "੧੧");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "੧੨", "੧੨");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "੧੩", "੧੩");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "੧੪", "੧੪");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "੧੫", "੧੫");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "੧੬", "੧੬");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "੧੭", "੧੭");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "੧੮", "੧੮");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "੧੯", "੧੯");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "੨੦", "੨੦");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "੨੧", "੨੧");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "੨੨", "੨੨");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "੨੩", "੨੩");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "੨੪", "੨੪");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "੨੫", "੨੫");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "੨੬", "੨੬");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "੨੭", "੨੭");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "੨੮", "੨੮");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "੨੯", "੨੯");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "੩੦", "੩੦");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "੩੧", "੩੧");
    });

    it("format month", () => {
        const expected = "ਜਨਵਰੀ ਜਨਵਰੀ_ਫ਼ਰਵਰੀ ਫ਼ਰਵਰੀ_ਮਾਰਚ ਮਾਰਚ_ਅਪ੍ਰੈਲ ਅਪ੍ਰੈਲ_ਮਈ ਮਈ_ਜੂਨ ਜੂਨ_ਜੁਲਾਈ ਜੁਲਾਈ_ਅਗਸਤ ਅਗਸਤ_ਸਤੰਬਰ ਸਤੰਬਰ_ਅਕਤੂਬਰ ਅਕਤੂਬਰ_ਨਵੰਬਰ ਨਵੰਬਰ_ਦਸੰਬਰ ਦਸੰਬਰ".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "ਐਤਵਾਰ ਐਤ ਐਤ_ਸੋਮਵਾਰ ਸੋਮ ਸੋਮ_ਮੰਗਲਵਾਰ ਮੰਗਲ ਮੰਗਲ_ਬੁਧਵਾਰ ਬੁਧ ਬੁਧ_ਵੀਰਵਾਰ ਵੀਰ ਵੀਰ_ਸ਼ੁੱਕਰਵਾਰ ਸ਼ੁਕਰ ਸ਼ੁਕਰ_ਸ਼ਨੀਚਰਵਾਰ ਸ਼ਨੀ ਸ਼ਨੀ".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "ਕੁਝ ਸਕਿੰਟ", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "ਇਕ ਮਿੰਟ", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "ਇਕ ਮਿੰਟ", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "੨ ਮਿੰਟ", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "੪੪ ਮਿੰਟ", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "ਇੱਕ ਘੰਟਾ", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "ਇੱਕ ਘੰਟਾ", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "੨ ਘੰਟੇ", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "੫ ਘੰਟੇ", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "੨੧ ਘੰਟੇ", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "ਇੱਕ ਦਿਨ", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "ਇੱਕ ਦਿਨ", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "੨ ਦਿਨ", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "ਇੱਕ ਦਿਨ", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "੫ ਦਿਨ", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "੨੫ ਦਿਨ", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "ਇੱਕ ਮਹੀਨਾ", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "ਇੱਕ ਮਹੀਨਾ", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "ਇੱਕ ਮਹੀਨਾ", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "੨ ਮਹੀਨੇ", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "੨ ਮਹੀਨੇ", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "੩ ਮਹੀਨੇ", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "ਇੱਕ ਮਹੀਨਾ", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "੫ ਮਹੀਨੇ", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "ਇੱਕ ਸਾਲ", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "੨ ਸਾਲ", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "ਇੱਕ ਸਾਲ", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "੫ ਸਾਲ", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "ਕੁਝ ਸਕਿੰਟ ਪਿਛਲੇ", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "ਕੁਝ ਸਕਿੰਟ ਪਿਛਲੇ", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ", "ਕੁਝ ਸਕਿੰਟ ਵਿੱਚ");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "੫ ਦਿਨ ਵਿੱਚ", "੫ ਦਿਨ ਵਿੱਚ");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "ਅਜ ਦੁਪਹਿਰ ੧੨:੦੦ ਵਜੇ", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "ਅਜ ਦੁਪਹਿਰ ੧੨:੨੫ ਵਜੇ", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 3
        }).calendar(), "ਅਜ ਦੁਪਹਿਰ ੩:੦੦ ਵਜੇ", "Now plus 3 hours");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "ਕਲ ਦੁਪਹਿਰ ੧੨:੦੦ ਵਜੇ", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "ਅਜ ਦੁਪਹਿਰ ੧੧:੦੦ ਵਜੇ", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "ਕਲ ਦੁਪਹਿਰ ੧੨:੦੦ ਵਜੇ", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("dddd[,] LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("dddd[,] LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("dddd[,] LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[ਪਿਛਲੇ] dddd[,] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[ਪਿਛਲੇ] dddd[,] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[ਪਿਛਲੇ] dddd[,] LT"), `Today - ${i} days end of day`);
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

    it("meridiem invariant", () => {
        assert.equal(ateos.datetime([2011, 2, 23, 2, 30]).format("a"), "ਰਾਤ", "before dawn");
        assert.equal(ateos.datetime([2011, 2, 23, 9, 30]).format("a"), "ਸਵੇਰ", "morning");
        assert.equal(ateos.datetime([2011, 2, 23, 14, 30]).format("a"), "ਦੁਪਹਿਰ", "during day");
        assert.equal(ateos.datetime([2011, 2, 23, 17, 30]).format("a"), "ਸ਼ਾਮ", "evening");
        assert.equal(ateos.datetime([2011, 2, 23, 19, 30]).format("a"), "ਸ਼ਾਮ", "late evening");
        assert.equal(ateos.datetime([2011, 2, 23, 21, 20]).format("a"), "ਰਾਤ", "night");

        assert.equal(ateos.datetime([2011, 2, 23, 2, 30]).format("A"), "ਰਾਤ", "before dawn");
        assert.equal(ateos.datetime([2011, 2, 23, 9, 30]).format("A"), "ਸਵੇਰ", "morning");
        assert.equal(ateos.datetime([2011, 2, 23, 14, 30]).format("A"), "ਦੁਪਹਿਰ", " during day");
        assert.equal(ateos.datetime([2011, 2, 23, 17, 30]).format("A"), "ਸ਼ਾਮ", "evening");
        assert.equal(ateos.datetime([2011, 2, 23, 19, 30]).format("A"), "ਸ਼ਾਮ", "late evening");
        assert.equal(ateos.datetime([2011, 2, 23, 21, 20]).format("A"), "ਰਾਤ", "night");
    });

    it("weeks year starting sunday", () => {
        assert.equal(ateos.datetime([2012, 0, 1]).week(), 1, "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 7]).week(), 1, "Jan  7 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).week(), 2, "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 14]).week(), 2, "Jan 14 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).week(), 3, "Jan 15 2012 should be week 3");
    });

    it("weeks year starting monday", () => {
        assert.equal(ateos.datetime([2006, 11, 31]).week(), 1, "Dec 31 2006 should be week 1");
        assert.equal(ateos.datetime([2007, 0, 1]).week(), 1, "Jan  1 2007 should be week 1");
        assert.equal(ateos.datetime([2007, 0, 6]).week(), 1, "Jan  6 2007 should be week 1");
        assert.equal(ateos.datetime([2007, 0, 7]).week(), 2, "Jan  7 2007 should be week 2");
        assert.equal(ateos.datetime([2007, 0, 13]).week(), 2, "Jan 13 2007 should be week 2");
        assert.equal(ateos.datetime([2007, 0, 14]).week(), 3, "Jan 14 2007 should be week 3");
    });

    it("weeks year starting tuesday", () => {
        assert.equal(ateos.datetime([2007, 11, 29]).week(), 52, "Dec 29 2007 should be week 52");
        assert.equal(ateos.datetime([2008, 0, 1]).week(), 1, "Jan  1 2008 should be week 1");
        assert.equal(ateos.datetime([2008, 0, 5]).week(), 1, "Jan  5 2008 should be week 1");
        assert.equal(ateos.datetime([2008, 0, 6]).week(), 2, "Jan  6 2008 should be week 2");
        assert.equal(ateos.datetime([2008, 0, 12]).week(), 2, "Jan 12 2008 should be week 2");
        assert.equal(ateos.datetime([2008, 0, 13]).week(), 3, "Jan 13 2008 should be week 3");
    });

    it("weeks year starting wednesday", () => {
        assert.equal(ateos.datetime([2002, 11, 29]).week(), 1, "Dec 29 2002 should be week 1");
        assert.equal(ateos.datetime([2003, 0, 1]).week(), 1, "Jan  1 2003 should be week 1");
        assert.equal(ateos.datetime([2003, 0, 4]).week(), 1, "Jan  4 2003 should be week 1");
        assert.equal(ateos.datetime([2003, 0, 5]).week(), 2, "Jan  5 2003 should be week 2");
        assert.equal(ateos.datetime([2003, 0, 11]).week(), 2, "Jan 11 2003 should be week 2");
        assert.equal(ateos.datetime([2003, 0, 12]).week(), 3, "Jan 12 2003 should be week 3");
    });

    it("weeks year starting thursday", () => {
        assert.equal(ateos.datetime([2008, 11, 28]).week(), 1, "Dec 28 2008 should be week 1");
        assert.equal(ateos.datetime([2009, 0, 1]).week(), 1, "Jan  1 2009 should be week 1");
        assert.equal(ateos.datetime([2009, 0, 3]).week(), 1, "Jan  3 2009 should be week 1");
        assert.equal(ateos.datetime([2009, 0, 4]).week(), 2, "Jan  4 2009 should be week 2");
        assert.equal(ateos.datetime([2009, 0, 10]).week(), 2, "Jan 10 2009 should be week 2");
        assert.equal(ateos.datetime([2009, 0, 11]).week(), 3, "Jan 11 2009 should be week 3");
    });

    it("weeks year starting friday", () => {
        assert.equal(ateos.datetime([2009, 11, 27]).week(), 1, "Dec 27 2009 should be week 1");
        assert.equal(ateos.datetime([2010, 0, 1]).week(), 1, "Jan  1 2010 should be week 1");
        assert.equal(ateos.datetime([2010, 0, 2]).week(), 1, "Jan  2 2010 should be week 1");
        assert.equal(ateos.datetime([2010, 0, 3]).week(), 2, "Jan  3 2010 should be week 2");
        assert.equal(ateos.datetime([2010, 0, 9]).week(), 2, "Jan  9 2010 should be week 2");
        assert.equal(ateos.datetime([2010, 0, 10]).week(), 3, "Jan 10 2010 should be week 3");
    });

    it("weeks year starting saturday", () => {
        assert.equal(ateos.datetime([2010, 11, 26]).week(), 1, "Dec 26 2010 should be week 1");
        assert.equal(ateos.datetime([2011, 0, 1]).week(), 1, "Jan  1 2011 should be week 1");
        assert.equal(ateos.datetime([2011, 0, 2]).week(), 2, "Jan  2 2011 should be week 2");
        assert.equal(ateos.datetime([2011, 0, 8]).week(), 2, "Jan  8 2011 should be week 2");
        assert.equal(ateos.datetime([2011, 0, 9]).week(), 3, "Jan  9 2011 should be week 3");
    });

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "੧ ੦੧ ੧", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 7]).format("w ww wo"), "੧ ੦੧ ੧", "Jan  7 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "੨ ੦੨ ੨", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 14]).format("w ww wo"), "੨ ੦੨ ੨", "Jan 14 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).format("w ww wo"), "੩ ੦੩ ੩", "Jan 15 2012 should be week 3");
    });

    it("lenient day of month ordinal parsing", () => {
        let i;
        let ordinalStr;
        let testMoment;

        for (i = 1; i <= 31; ++i) {
            ordinalStr = ateos.datetime([2014, 0, i]).format("YYYY MM Do");
            testMoment = ateos.datetime(ordinalStr, "YYYY MM Do");
            assert.equal(testMoment.year(), 2014, `lenient day of month ordinal parsing ${i} year check`);
            assert.equal(testMoment.month(), 0, `lenient day of month ordinal parsing ${i} month check`);
            assert.equal(testMoment.date(), i, `lenient day of month ordinal parsing ${i} date check`);
        }
    });

    it("lenient day of month ordinal parsing of number", () => {
        let i;
        let testMoment;

        for (i = 1; i <= 31; ++i) {
            testMoment = ateos.datetime(`2014 01 ${i}`, "YYYY MM Do");
            assert.equal(testMoment.year(), 2014, `lenient day of month ordinal parsing of number ${i} year check`);
            assert.equal(testMoment.month(), 0, `lenient day of month ordinal parsing of number ${i} month check`);
            assert.equal(testMoment.date(), i, `lenient day of month ordinal parsing of number ${i} date check`);
        }
    });

    it("strict day of month ordinal parsing", () => {
        let i;
        let ordinalStr;
        let testMoment;

        for (i = 1; i <= 31; ++i) {
            ordinalStr = ateos.datetime([2014, 0, i]).format("YYYY MM Do");
            testMoment = ateos.datetime(ordinalStr, "YYYY MM Do", true);
            assert.ok(testMoment.isValid(), `strict day of month ordinal parsing ${i}`);
        }
    });
});
