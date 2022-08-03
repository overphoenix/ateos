import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "hi", () => {
    commonLocaleTests("hi");

    beforeEach(() => {
        ateos.datetime.locale("hi");
    });

    it("parse", () => {
        const tests = "जनवरी जन._फ़रवरी फ़र._मार्च मार्च_अप्रैल अप्रै._मई मई_जून जून_जुलाई जुल._अगस्त अग._सितम्बर सित._अक्टूबर अक्टू._नवम्बर नव._दिसम्बर दिस.".split("_");
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
            ["dddd, Do MMMM YYYY, a h:mm:ss बजे", "रविवार, १४ फ़रवरी २०१०, दोपहर ३:२५:५० बजे"],
            ["ddd, a h बजे", "रवि, दोपहर ३ बजे"],
            ["M Mo MM MMMM MMM", "२ २ ०२ फ़रवरी फ़र."],
            ["YYYY YY", "२०१० १०"],
            ["D Do DD", "१४ १४ १४"],
            ["d do dddd ddd dd", "० ० रविवार रवि र"],
            ["DDD DDDo DDDD", "४५ ४५ ०४५"],
            ["w wo ww", "८ ८ ०८"],
            ["h hh", "३ ०३"],
            ["H HH", "१५ १५"],
            ["m mm", "२५ २५"],
            ["s ss", "५० ५०"],
            ["a A", "दोपहर दोपहर"],
            ["LTS", "दोपहर ३:२५:५० बजे"],
            ["L", "१४/०२/२०१०"],
            ["LL", "१४ फ़रवरी २०१०"],
            ["LLL", "१४ फ़रवरी २०१०, दोपहर ३:२५ बजे"],
            ["LLLL", "रविवार, १४ फ़रवरी २०१०, दोपहर ३:२५ बजे"],
            ["l", "१४/२/२०१०"],
            ["ll", "१४ फ़र. २०१०"],
            ["lll", "१४ फ़र. २०१०, दोपहर ३:२५ बजे"],
            ["llll", "रवि, १४ फ़र. २०१०, दोपहर ३:२५ बजे"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "१", "१");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "२", "२");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "३", "३");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "४", "४");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "५", "५");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "६", "६");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "७", "७");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "८", "८");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "९", "९");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "१०", "१०");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "११", "११");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "१२", "१२");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "१३", "१३");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "१४", "१४");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "१५", "१५");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "१६", "१६");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "१७", "१७");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "१८", "१८");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "१९", "१९");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "२०", "२०");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "२१", "२१");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "२२", "२२");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "२३", "२३");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "२४", "२४");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "२५", "२५");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "२६", "२६");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "२७", "२७");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "२८", "२८");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "२९", "२९");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "३०", "३०");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "३१", "३१");
    });

    it("format month", () => {
        const expected = "जनवरी जन._फ़रवरी फ़र._मार्च मार्च_अप्रैल अप्रै._मई मई_जून जून_जुलाई जुल._अगस्त अग._सितम्बर सित._अक्टूबर अक्टू._नवम्बर नव._दिसम्बर दिस.".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "रविवार रवि र_सोमवार सोम सो_मंगलवार मंगल मं_बुधवार बुध बु_गुरूवार गुरू गु_शुक्रवार शुक्र शु_शनिवार शनि श".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "कुछ ही क्षण", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "एक मिनट", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "एक मिनट", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "२ मिनट", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "४४ मिनट", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "एक घंटा", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "एक घंटा", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "२ घंटे", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "५ घंटे", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "२१ घंटे", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "एक दिन", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "एक दिन", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "२ दिन", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "एक दिन", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "५ दिन", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "२५ दिन", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "एक महीने", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "एक महीने", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "एक महीने", "43 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "२ महीने", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "२ महीने", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "३ महीने", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "एक महीने", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "५ महीने", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "एक वर्ष", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "२ वर्ष", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "एक वर्ष", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "५ वर्ष", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "कुछ ही क्षण में", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "कुछ ही क्षण पहले", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "कुछ ही क्षण पहले", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "कुछ ही क्षण में", "कुछ ही क्षण में");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "५ दिन में", "५ दिन में");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "आज दोपहर १२:०० बजे", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "आज दोपहर १२:२५ बजे", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 3
        }).calendar(), "आज दोपहर ३:०० बजे", "Now plus 3 hours");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "कल दोपहर १२:०० बजे", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "आज दोपहर ११:०० बजे", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "कल दोपहर १२:०० बजे", "yesterday at the same time");
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
            assert.equal(m.calendar(), m.format("[पिछले] dddd[,] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[पिछले] dddd[,] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[पिछले] dddd[,] LT"), `Today - ${i} days end of day`);
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

    it("meridiem", () => {
        assert.equal(ateos.datetime([2011, 2, 23, 2, 30]).format("a"), "रात", "before dawn");
        assert.equal(ateos.datetime([2011, 2, 23, 9, 30]).format("a"), "सुबह", "morning");
        assert.equal(ateos.datetime([2011, 2, 23, 14, 30]).format("a"), "दोपहर", "during day");
        assert.equal(ateos.datetime([2011, 2, 23, 17, 30]).format("a"), "शाम", "evening");
        assert.equal(ateos.datetime([2011, 2, 23, 19, 30]).format("a"), "शाम", "late evening");
        assert.equal(ateos.datetime([2011, 2, 23, 21, 20]).format("a"), "रात", "night");

        assert.equal(ateos.datetime([2011, 2, 23, 2, 30]).format("A"), "रात", "before dawn");
        assert.equal(ateos.datetime([2011, 2, 23, 9, 30]).format("A"), "सुबह", "morning");
        assert.equal(ateos.datetime([2011, 2, 23, 14, 30]).format("A"), "दोपहर", " during day");
        assert.equal(ateos.datetime([2011, 2, 23, 17, 30]).format("A"), "शाम", "evening");
        assert.equal(ateos.datetime([2011, 2, 23, 19, 30]).format("A"), "शाम", "late evening");
        assert.equal(ateos.datetime([2011, 2, 23, 21, 20]).format("A"), "रात", "night");
    });

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "१ ०१ १", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 7]).format("w ww wo"), "१ ०१ १", "Jan  7 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "२ ०२ २", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 14]).format("w ww wo"), "२ ०२ २", "Jan 14 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 15]).format("w ww wo"), "३ ०३ ३", "Jan 15 2012 should be week 3");
    });
});
