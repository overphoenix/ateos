import commonLocaleTests from "../helpers/common-locale";
describe("datetime", "locale", "az", () => {
    commonLocaleTests("az");

    before(() => {
        ateos.datetime.locale("az");
    });

    after(() => {
        ateos.datetime.locale("en");
    });

    it("parse", () => {
        const tests = "yanvar yan_fevral fev_mart mar_Aprel apr_may may_iyun iyn_iyul iyl_Avqust avq_sentyabr sen_oktyabr okt_noyabr noy_dekabr dek".split("_");
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
            ["dddd, D MMMM YYYY, HH:mm:ss", "Bazar, 14 fevral 2010, 15:25:50"],
            ["ddd, A h", "Baz, gündüz 3"],
            ["M Mo MM MMMM MMM", "2 2-nci 02 fevral fev"],
            ["YYYY YY", "2010 10"],
            ["D Do DD", "14 14-üncü 14"],
            ["d do dddd ddd dd", "0 0-ıncı Bazar Baz Bz"],
            ["DDD DDDo DDDD", "45 45-inci 045"],
            ["w wo ww", "7 7-nci 07"],
            ["h hh", "3 03"],
            ["H HH", "15 15"],
            ["m mm", "25 25"],
            ["s ss", "50 50"],
            ["a A", "gündüz gündüz"],
            ["[ilin] DDDo [günü]", "ilin 45-inci günü"],
            ["LT", "15:25"],
            ["LTS", "15:25:50"],
            ["L", "14.02.2010"],
            ["LL", "14 fevral 2010"],
            ["LLL", "14 fevral 2010 15:25"],
            ["LLLL", "Bazar, 14 fevral 2010 15:25"],
            ["l", "14.2.2010"],
            ["ll", "14 fev 2010"],
            ["lll", "14 fev 2010 15:25"],
            ["llll", "Baz, 14 fev 2010 15:25"]
        ];
        const DDDo = [
            [359, "360-ıncı"],
            [199, "200-üncü"],
            [149, "150-nci"]
        ];
        const dt = ateos.datetime(new Date(2010, 1, 14, 15, 25, 50, 125));
        let DDDoDt;
        let i;

        for (i = 0; i < a.length; i++) {
            assert.equal(dt.format(a[i][0]), a[i][1], `${a[i][0]} ---> ${a[i][1]}`);
        }
        for (i = 0; i < DDDo.length; i++) {
            DDDoDt = ateos.datetime([2010]);
            assert.equal(DDDoDt.add(DDDo[i][0], "days").format("DDDo"), DDDo[i][1], `${DDDo[i][0]} ---> ${DDDo[i][1]}`);
        }
    });

    it("format ordinal", () => {
        assert.equal(ateos.datetime([2011, 0, 1]).format("DDDo"), "1-inci", "1st");
        assert.equal(ateos.datetime([2011, 0, 2]).format("DDDo"), "2-nci", "2nd");
        assert.equal(ateos.datetime([2011, 0, 3]).format("DDDo"), "3-üncü", "3rd");
        assert.equal(ateos.datetime([2011, 0, 4]).format("DDDo"), "4-üncü", "4th");
        assert.equal(ateos.datetime([2011, 0, 5]).format("DDDo"), "5-inci", "5th");
        assert.equal(ateos.datetime([2011, 0, 6]).format("DDDo"), "6-ncı", "6th");
        assert.equal(ateos.datetime([2011, 0, 7]).format("DDDo"), "7-nci", "7th");
        assert.equal(ateos.datetime([2011, 0, 8]).format("DDDo"), "8-inci", "8th");
        assert.equal(ateos.datetime([2011, 0, 9]).format("DDDo"), "9-uncu", "9th");
        assert.equal(ateos.datetime([2011, 0, 10]).format("DDDo"), "10-uncu", "10th");

        assert.equal(ateos.datetime([2011, 0, 11]).format("DDDo"), "11-inci", "11th");
        assert.equal(ateos.datetime([2011, 0, 12]).format("DDDo"), "12-nci", "12th");
        assert.equal(ateos.datetime([2011, 0, 13]).format("DDDo"), "13-üncü", "13th");
        assert.equal(ateos.datetime([2011, 0, 14]).format("DDDo"), "14-üncü", "14th");
        assert.equal(ateos.datetime([2011, 0, 15]).format("DDDo"), "15-inci", "15th");
        assert.equal(ateos.datetime([2011, 0, 16]).format("DDDo"), "16-ncı", "16th");
        assert.equal(ateos.datetime([2011, 0, 17]).format("DDDo"), "17-nci", "17th");
        assert.equal(ateos.datetime([2011, 0, 18]).format("DDDo"), "18-inci", "18th");
        assert.equal(ateos.datetime([2011, 0, 19]).format("DDDo"), "19-uncu", "19th");
        assert.equal(ateos.datetime([2011, 0, 20]).format("DDDo"), "20-nci", "20th");

        assert.equal(ateos.datetime([2011, 0, 21]).format("DDDo"), "21-inci", "21th");
        assert.equal(ateos.datetime([2011, 0, 22]).format("DDDo"), "22-nci", "22th");
        assert.equal(ateos.datetime([2011, 0, 23]).format("DDDo"), "23-üncü", "23th");
        assert.equal(ateos.datetime([2011, 0, 24]).format("DDDo"), "24-üncü", "24th");
        assert.equal(ateos.datetime([2011, 0, 25]).format("DDDo"), "25-inci", "25th");
        assert.equal(ateos.datetime([2011, 0, 26]).format("DDDo"), "26-ncı", "26th");
        assert.equal(ateos.datetime([2011, 0, 27]).format("DDDo"), "27-nci", "27th");
        assert.equal(ateos.datetime([2011, 0, 28]).format("DDDo"), "28-inci", "28th");
        assert.equal(ateos.datetime([2011, 0, 29]).format("DDDo"), "29-uncu", "29th");
        assert.equal(ateos.datetime([2011, 0, 30]).format("DDDo"), "30-uncu", "30th");

        assert.equal(ateos.datetime([2011, 0, 31]).format("DDDo"), "31-inci", "31st");
    });

    it("format month", () => {
        const expected = "yanvar yan_fevral fev_mart mar_aprel apr_may may_iyun iyn_iyul iyl_avqust avq_sentyabr sen_oktyabr okt_noyabr noy_dekabr dek".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, i, 1]).format("MMMM MMM"), expected[i], expected[i]);
        }
    });

    it("format week", () => {
        const expected = "Bazar Baz Bz_Bazar ertəsi BzE BE_Çərşənbə axşamı ÇAx ÇA_Çərşənbə Çər Çə_Cümə axşamı CAx CA_Cümə Cüm Cü_Şənbə Şən Şə".split("_");
        let i;

        for (i = 0; i < expected.length; i++) {
            assert.equal(ateos.datetime([2011, 0, 2 + i]).format("dddd ddd dd"), expected[i], expected[i]);
        }
    });

    it("from", () => {
        const start = ateos.datetime([2007, 1, 28]);
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 44
        }), true), "birneçə saniyyə", "44 seconds = a few seconds");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 45
        }), true), "bir dəqiqə", "45 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 89
        }), true), "bir dəqiqə", "89 seconds = a minute");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            s: 90
        }), true), "2 dəqiqə", "90 seconds = 2 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 44
        }), true), "44 dəqiqə", "44 minutes = 44 minutes");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 45
        }), true), "bir saat", "45 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 89
        }), true), "bir saat", "89 minutes = an hour");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            m: 90
        }), true), "2 saat", "90 minutes = 2 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 5
        }), true), "5 saat", "5 hours = 5 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 21
        }), true), "21 saat", "21 hours = 21 hours");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 22
        }), true), "bir gün", "22 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 35
        }), true), "bir gün", "35 hours = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            h: 36
        }), true), "2 gün", "36 hours = 2 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 1
        }), true), "bir gün", "1 day = a day");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 5
        }), true), "5 gün", "5 days = 5 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 25
        }), true), "25 gün", "25 days = 25 days");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 26
        }), true), "bir ay", "26 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 30
        }), true), "bir ay", "30 days = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 46
        }), true), "2 ay", "46 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 74
        }), true), "2 ay", "75 days = 2 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 76
        }), true), "3 ay", "76 days = 3 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 1
        }), true), "bir ay", "1 month = a month");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            M: 5
        }), true), "5 ay", "5 months = 5 months");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 345
        }), true), "bir il", "345 days = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            d: 548
        }), true), "2 il", "548 days = 2 years");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 1
        }), true), "bir il", "1 year = a year");
        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({
            y: 5
        }), true), "5 il", "5 years = 5 years");
    });

    it("suffix", () => {
        assert.equal(ateos.datetime(30000).from(0), "birneçə saniyyə sonra", "prefix");
        assert.equal(ateos.datetime(0).from(30000), "birneçə saniyyə əvvəl", "suffix");
    });

    it("now from now", () => {
        assert.equal(ateos.datetime().fromNow(), "birneçə saniyyə əvvəl", "now from now should display as in the past");
    });

    it("fromNow", () => {
        assert.equal(ateos.datetime().add({
            s: 30
        }).fromNow(), "birneçə saniyyə sonra", "in a few seconds");
        assert.equal(ateos.datetime().add({
            d: 5
        }).fromNow(), "5 gün sonra", "in 5 days");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "bugün saat 12:00", "today at the same time");
        assert.equal(ateos.datetime(a).add({
            m: 25
        }).calendar(), "bugün saat 12:25", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({
            h: 1
        }).calendar(), "bugün saat 13:00", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({
            d: 1
        }).calendar(), "sabah saat 12:00", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({
            h: 1
        }).calendar(), "bugün saat 11:00", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({
            d: 1
        }).calendar(), "dünən 12:00", "yesterday at the same time");
    });

    it("calendar next week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().add({
                d: i
            });
            assert.equal(m.calendar(), m.format("[gələn həftə] dddd [saat] LT"), `Today + ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[gələn həftə] dddd [saat] LT"), `Today + ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[gələn həftə] dddd [saat] LT"), `Today + ${i} days end of day`);
        }
    });

    it("calendar last week", () => {
        let i;
        let m;

        for (i = 2; i < 7; i++) {
            m = ateos.datetime().subtract({
                d: i
            });
            assert.equal(m.calendar(), m.format("[keçən həftə] dddd [saat] LT"), `Today - ${i} days current time`);
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(), m.format("[keçən həftə] dddd [saat] LT"), `Today - ${i} days beginning of day`);
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(), m.format("[keçən həftə] dddd [saat] LT"), `Today - ${i} days end of day`);
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
        assert.equal(ateos.datetime([2011, 11, 26]).format("w ww wo"), "1 01 1-inci", "Dec 26 2011 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 1]).format("w ww wo"), "1 01 1-inci", "Jan  1 2012 should be week 1");
        assert.equal(ateos.datetime([2012, 0, 2]).format("w ww wo"), "2 02 2-nci", "Jan  2 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 8]).format("w ww wo"), "2 02 2-nci", "Jan  8 2012 should be week 2");
        assert.equal(ateos.datetime([2012, 0, 9]).format("w ww wo"), "3 03 3-üncü", "Jan  9 2012 should be week 3");
    });
});
