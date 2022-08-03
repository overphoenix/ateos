describe("datetime", "listers", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("default", () => {
        assert.deepEqual(ateos.datetime.months(), ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        assert.deepEqual(ateos.datetime.monthsShort(), ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
        assert.deepEqual(ateos.datetime.weekdays(), ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
        assert.deepEqual(ateos.datetime.weekdaysShort(), ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        assert.deepEqual(ateos.datetime.weekdaysMin(), ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
    });

    it("index", () => {
        assert.equal(ateos.datetime.months(0), "January");
        assert.equal(ateos.datetime.months(2), "March");
        assert.equal(ateos.datetime.monthsShort(0), "Jan");
        assert.equal(ateos.datetime.monthsShort(2), "Mar");
        assert.equal(ateos.datetime.weekdays(0), "Sunday");
        assert.equal(ateos.datetime.weekdays(2), "Tuesday");
        assert.equal(ateos.datetime.weekdaysShort(0), "Sun");
        assert.equal(ateos.datetime.weekdaysShort(2), "Tue");
        assert.equal(ateos.datetime.weekdaysMin(0), "Su");
        assert.equal(ateos.datetime.weekdaysMin(2), "Tu");
    });

    it("localized", () => {
        const months = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_");
        const monthsShort = "on_tw_th_fo_fi_si_se_ei_ni_te_el_tw".split("_");
        const weekdays = "one_two_three_four_five_six_seven".split("_");
        const weekdaysShort = "on_tw_th_fo_fi_si_se".split("_");
        const weekdaysMin = "1_2_3_4_5_6_7".split("_");
        const weekdaysLocale = "four_five_six_seven_one_two_three".split("_");
        const weekdaysShortLocale = "fo_fi_si_se_on_tw_th".split("_");
        const weekdaysMinLocale = "4_5_6_7_1_2_3".split("_");
        const week = {
            dow: 3,
            doy: 6
        };

        ateos.datetime.locale("numerologists", {
            months,
            monthsShort,
            weekdays,
            weekdaysShort,
            weekdaysMin,
            week
        });

        assert.deepEqual(ateos.datetime.months(), months);
        assert.deepEqual(ateos.datetime.monthsShort(), monthsShort);
        assert.deepEqual(ateos.datetime.weekdays(), weekdays);
        assert.deepEqual(ateos.datetime.weekdaysShort(), weekdaysShort);
        assert.deepEqual(ateos.datetime.weekdaysMin(), weekdaysMin);

        assert.equal(ateos.datetime.months(0), "one");
        assert.equal(ateos.datetime.monthsShort(0), "on");
        assert.equal(ateos.datetime.weekdays(0), "one");
        assert.equal(ateos.datetime.weekdaysShort(0), "on");
        assert.equal(ateos.datetime.weekdaysMin(0), "1");

        assert.equal(ateos.datetime.months(2), "three");
        assert.equal(ateos.datetime.monthsShort(2), "th");
        assert.equal(ateos.datetime.weekdays(2), "three");
        assert.equal(ateos.datetime.weekdaysShort(2), "th");
        assert.equal(ateos.datetime.weekdaysMin(2), "3");

        assert.deepEqual(ateos.datetime.weekdays(true), weekdaysLocale);
        assert.deepEqual(ateos.datetime.weekdaysShort(true), weekdaysShortLocale);
        assert.deepEqual(ateos.datetime.weekdaysMin(true), weekdaysMinLocale);

        assert.equal(ateos.datetime.weekdays(true, 0), "four");
        assert.equal(ateos.datetime.weekdaysShort(true, 0), "fo");
        assert.equal(ateos.datetime.weekdaysMin(true, 0), "4");

        assert.equal(ateos.datetime.weekdays(false, 2), "three");
        assert.equal(ateos.datetime.weekdaysShort(false, 2), "th");
        assert.equal(ateos.datetime.weekdaysMin(false, 2), "3");
    });

    it("with functions", () => {
        const monthsShort = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_");
        const monthsShortWeird = "onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy".split("_");

        ateos.datetime.locale("difficult", {

            monthsShort(m, format) {
                const arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
                return arr[m.month()];
            }
        });

        assert.deepEqual(ateos.datetime.monthsShort(), monthsShort);
        assert.deepEqual(ateos.datetime.monthsShort("MMM"), monthsShort);
        assert.deepEqual(ateos.datetime.monthsShort("-MMM-"), monthsShortWeird);

        assert.deepEqual(ateos.datetime.monthsShort("MMM", 2), "three");
        assert.deepEqual(ateos.datetime.monthsShort("-MMM-", 2), "threesy");
        assert.deepEqual(ateos.datetime.monthsShort(2), "three");
    });

    it("with locale data", () => {
        const months = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split("_");
        const monthsShort = "on_tw_th_fo_fi_si_se_ei_ni_te_el_tw".split("_");
        const weekdays = "one_two_three_four_five_six_seven".split("_");
        const weekdaysShort = "on_tw_th_fo_fi_si_se".split("_");
        const weekdaysMin = "1_2_3_4_5_6_7".split("_");

        const customLocale = ateos.datetime.localeData("numerologists");

        assert.deepEqual(customLocale.months(), months);
        assert.deepEqual(customLocale.monthsShort(), monthsShort);
        assert.deepEqual(customLocale.weekdays(), weekdays);
        assert.deepEqual(customLocale.weekdaysShort(), weekdaysShort);
        assert.deepEqual(customLocale.weekdaysMin(), weekdaysMin);
    });
});
