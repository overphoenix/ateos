import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "hu", () => {
    commonLocaleTests("hu");

    beforeEach(() => {
        ateos.datetime.locale("hu");
    });

    it("parse", () => {
        const tests = "január jan_február feb_március márc_április ápr_május máj_június jún_július júl_augusztus aug_szeptember szept_október okt_november nov_december dec".split("_");
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
            ["dddd, MMMM Do YYYY, HH:mm:ss", "vasárnap, február 14. 2010, 15:25:50"],
            ["ddd, HH", "vas, 15"],
            ["M Mo MM MMMM MMM", "2 2. 02 február feb"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14. 14"],
            ["d do dddd ddd dd", "0 0. vasárnap vas v"],
            ["DDD DDDo DDDD", "45 45. 045"],
            ["w wo ww", "6 6. 06"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["[az év] DDDo [napja]", "az év 45. napja"],
            ["LTS", "15:25:50"],
            ["L", "2010.02.14."],
            ["LL", "2010. február 14."],
            ["LLL", "2010. február 14. 15:25"],
            ["LLLL", "2010. február 14., vasárnap 15:25"],
            ["l", "2010.2.14."],
            ["ll", "2010. feb 14."],
            ["lll", "2010. feb 14. 15:25"],
            ["llll", "2010. feb 14., vas 15:25"]
        ];
        const b = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
    });

    it("meridiem", () => {
        assert.equal(ateos.datetime([2011, 2, 23, 0, 0]).format("a"), "de", "am");
        assert.equal(ateos.datetime([2011, 2, 23, 11, 59]).format("a"), "de", "am");
        assert.equal(ateos.datetime([2011, 2, 23, 12, 0]).format("a"), "du", "pm");
        assert.equal(ateos.datetime([2011, 2, 23, 23, 59]).format("a"), "du", "pm");

        assert.equal(ateos.datetime([2011, 2, 23, 0, 0]).format("A"), "DE", "AM");
        assert.equal(ateos.datetime([2011, 2, 23, 11, 59]).format("A"), "DE", "AM");
        assert.equal(ateos.datetime([2011, 2, 23, 12, 0]).format("A"), "DU", "PM");
        assert.equal(ateos.datetime([2011, 2, 23, 23, 59]).format("A"), "DU", "PM");
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
        const expected = "január jan_február feb_március márc_április ápr_május máj_június jún_július júl_augusztus aug_szeptember szept_október okt_november nov_december dec".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "vasárnap vas_hétfő hét_kedd kedd_szerda sze_csütörtök csüt_péntek pén_szombat szo".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "néhány másodperc", "44 másodperc = néhány másodperc");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "egy perc", "45 másodperc = egy perc");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "egy perc", "89 másodperc = egy perc");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "2 perc", "90 másodperc = 2 perc");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 perc", "44 perc = 44 perc");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "egy óra", "45 perc = egy óra");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "egy óra", "89 perc = egy óra");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "2 óra", "90 perc = 2 óra");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 óra", "5 óra = 5 óra");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 óra", "21 óra = 21 óra");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "egy nap", "22 óra = egy nap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "egy nap", "35 óra = egy nap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "2 nap", "36 óra = 2 nap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "egy nap", "1 nap = egy nap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 nap", "5 nap = 5 nap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 nap", "25 nap = 25 nap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "egy hónap", "26 nap = egy hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "egy hónap", "30 nap = egy hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 43
        }), true), "egy hónap", "45 nap = egy hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "2 hónap", "46 nap = 2 hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "2 hónap", "75 nap = 2 hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "3 hónap", "76 nap = 3 hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "egy hónap", "1 hónap = egy hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 hónap", "5 hónap = 5 hónap");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "egy év", "345 nap = egy év");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "2 év", "548 nap = 2 év");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "egy év", "1 év = egy év");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 év", "5 év = 5 év");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "néhány másodperc múlva", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "néhány másodperce", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "néhány másodperce", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "néhány másodperc múlva", "néhány másodperc múlva");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "5 nap múlva", "5 nap múlva");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "ma 12:00-kor", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "ma 12:25-kor", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "ma 13:00-kor", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "holnap 12:00-kor", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "ma 11:00-kor", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "tegnap 12:00-kor", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;
        const days = "vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton".split("_");

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format(`[${days[m.day()]}] LT[-kor]`), `today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format(`[${days[m.day()]}] LT[-kor]`), `today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format(`[${days[m.day()]}] LT[-kor]`), `today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;
        const days = "vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton".split("_");

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format(`[múlt ${days[m.day()]}] LT[-kor]`), `today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format(`[múlt ${days[m.day()]}] LT[-kor]`), `today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format(`[múlt ${days[m.day()]}] LT[-kor]`), `today - ${i} days end of day`);
        }
    });

    it("calendar all else", () => {
        let weeksAgo = ateos.datetime().subtract({
            w: 1
        });
        let weeksFromNow = ateos.datetime().add({
            w: 1
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format("L"), "egy héte");
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format("L"), "egy hét múlva");

        weeksAgo = ateos.datetime().subtract({
            w: 2
        });
        weeksFromNow = ateos.datetime().add({
            w: 2
        });

        assert.equal(weeksAgo.calendar(), weeksAgo.format("L"), "2 hete");
        assert.equal(weeksFromNow.calendar(), weeksFromNow.format("L"), "2 hét múlva");
    });

    it("weeks year starting sunday formatted", () => {
        assert.equal(ateos.datetime([2011, 11, 26]).format("w ww wo"), "52 52 52.", "Dec 26 2011 should be week 52");
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "52 52 52.", "Jan  1 2012 should be week 52");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "1 01 1.", "Jan  2 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "1 01 1.", "Jan  8 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "2 02 2.", "Jan  9 2012 should be week 2");
    });
});
