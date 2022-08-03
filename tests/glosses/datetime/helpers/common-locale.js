export default function (locale) {
    it("lenient day of month ordinal parsing", () => {
        let ordinalStr;
        let testMoment;
        for (let i = 1; i <= 31; ++i) {
            ordinalStr = ateos.datetime([2014, 0, i]).format("YYYY MM Do");
            testMoment = ateos.datetime(ordinalStr, "YYYY MM Do");
            assert.equal(testMoment.year(), 2014, `lenient day of month ordinal parsing ${i} year check`);
            assert.equal(testMoment.month(), 0, `lenient day of month ordinal parsing ${i} month check`);
            assert.equal(testMoment.date(), i, `lenient day of month ordinal parsing ${i} date check`);
        }
    });

    it("lenient day of month ordinal parsing of number", () => {
        let testMoment;
        for (let i = 1; i <= 31; ++i) {
            testMoment = ateos.datetime(`2014 01 ${i}`, "YYYY MM Do");
            assert.equal(testMoment.year(), 2014, `lenient day of month ordinal parsing of number ${i} year check`);
            assert.equal(testMoment.month(), 0, `lenient day of month ordinal parsing of number ${i} month check`);
            assert.equal(testMoment.date(), i, `lenient day of month ordinal parsing of number ${i} date check`);
        }
    });

    it("strict day of month ordinal parsingg", () => {
        let ordinalStr;
        let testMoment;
        for (let i = 1; i <= 31; ++i) {
            ordinalStr = ateos.datetime([2014, 0, i]).format("YYYY MM Do");
            testMoment = ateos.datetime(ordinalStr, "YYYY MM Do", true);
            assert.ok(testMoment.isValid(), `strict day of month ordinal parsing ${i}`);
        }
    });

    it("meridiem invariant", () => {
        for (let h = 0; h < 24; ++h) {
            for (let m = 0; m < 60; m += 15) {
                const t1 = ateos.datetime.utc([2000, 0, 1, h, m]);
                const t2 = ateos.datetime.utc(t1.format("A h:mm"), "A h:mm");
                assert.equal(t2.format("HH:mm"), t1.format("HH:mm"),
                    `meridiem at ${t1.format("HH:mm")}`);
            }
        }
    });

    it("date format correctness", () => {
        const data = ateos.datetime.localeData()._longDateFormat;
        const tokens = ateos.util.keys(data);
        tokens.forEach((srchToken) => {
            // Check each format string to make sure it does not contain any
            // tokens that need to be expanded.
            tokens.forEach((baseToken) => {
                // strip escaped sequences
                const format = data[baseToken].replace(/(\[[^\]]*\])/g, "");
                assert.equal(false, Boolean(~format.indexOf(srchToken)),
                    `contains ${srchToken} in ${baseToken}`);
            });
        });
    });

    it("month parsing correctness", () => {
        let i;
        let m;

        if (locale === "tr") {
            // I can't fix it :(
            expect(0);
            return;
        }

        function tester(format) {
            let r;
            r = ateos.datetime(m.format(format), format);
            assert.equal(r.month(), m.month(), `month ${i} fmt ${format}`);
            r = ateos.datetime(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.month(), m.month(), `month ${i} fmt ${format} upper`);
            r = ateos.datetime(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.month(), m.month(), `month ${i} fmt ${format} lower`);

            r = ateos.datetime(m.format(format), format, true);
            assert.equal(r.month(), m.month(), `month ${i} fmt ${format} strict`);
            r = ateos.datetime(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.month(), m.month(), `month ${i} fmt ${format} upper strict`);
            r = ateos.datetime(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.month(), m.month(), `month ${i} fmt ${format} lower strict`);
        }

        for (i = 0; i < 12; ++i) {
            m = ateos.datetime([2015, i, 15, 18]);
            tester("MMM");
            tester("MMM.");
            tester("MMMM");
            tester("MMMM.");
        }
    });

    it("weekday parsing correctness", () => {
        let i;
        let m;

        if (locale === "tr" || locale === "az" || locale === "ro" || locale === "mt") {
            // tr, az: There is a lower-case letter (ı), that converted to
            // upper then lower changes to i
            // ro: there is the letter ț which behaves weird under IE8
            // mt: letter Ħ
            expect(0);
            return;
        }

        function tester(format) {
            let r;
            const baseMsg = `weekday ${m.weekday()} fmt ${format} ${m.toISOString()}`;
            r = ateos.datetime(m.format(format), format);
            assert.equal(r.weekday(), m.weekday(), baseMsg);
            r = ateos.datetime(m.format(format).toLocaleUpperCase(), format);
            assert.equal(r.weekday(), m.weekday(), `${baseMsg} upper`);
            r = ateos.datetime(m.format(format).toLocaleLowerCase(), format);
            assert.equal(r.weekday(), m.weekday(), `${baseMsg} lower`);
            r = ateos.datetime(m.format(format), format, true);
            assert.equal(r.weekday(), m.weekday(), `${baseMsg} strict`);
            r = ateos.datetime(m.format(format).toLocaleUpperCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), `${baseMsg} upper strict`);
            r = ateos.datetime(m.format(format).toLocaleLowerCase(), format, true);
            assert.equal(r.weekday(), m.weekday(), `${baseMsg} lower strict`);
        }

        for (i = 0; i < 7; ++i) {
            m = ateos.datetime.utc([2015, 0, i + 1, 18]);
            tester("dd");
            tester("ddd");
            tester("dddd");
        }
    });

    it("valid localeData", () => {
        assert.equal(ateos.datetime().localeData().months().length, 12, "months should return 12 months");
        assert.equal(ateos.datetime().localeData().monthsShort().length, 12, "monthsShort should return 12 months");
        assert.equal(ateos.datetime().localeData().weekdays().length, 7, "weekdays should return 7 days");
        assert.equal(ateos.datetime().localeData().weekdaysShort().length, 7, "weekdaysShort should return 7 days");
        assert.equal(ateos.datetime().localeData().weekdaysMin().length, 7, "monthsShort should return 7 days");
    });
}
