describe("datetime", "relative time", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("default thresholds fromNow", () => {
        let a = ateos.datetime();

        // Seconds to minutes threshold
        a.subtract(44, "seconds");
        assert.equal(a.fromNow(), "a few seconds ago", "Below default seconds to minutes threshold");
        a.subtract(1, "seconds");
        assert.equal(a.fromNow(), "a minute ago", "Above default seconds to minutes threshold");

        // Minutes to hours threshold
        a = ateos.datetime();
        a.subtract(44, "minutes");
        assert.equal(a.fromNow(), "44 minutes ago", "Below default minute to hour threshold");
        a.subtract(1, "minutes");
        assert.equal(a.fromNow(), "an hour ago", "Above default minute to hour threshold");

        // Hours to days threshold
        a = ateos.datetime();
        a.subtract(21, "hours");
        assert.equal(a.fromNow(), "21 hours ago", "Below default hours to day threshold");
        a.subtract(1, "hours");
        assert.equal(a.fromNow(), "a day ago", "Above default hours to day threshold");

        // Days to month threshold
        a = ateos.datetime();
        a.subtract(25, "days");
        assert.equal(a.fromNow(), "25 days ago", "Below default days to month (singular) threshold");
        a.subtract(1, "days");
        assert.equal(a.fromNow(), "a month ago", "Above default days to month (singular) threshold");

        // months to year threshold
        a = ateos.datetime();
        a.subtract(10, "months");
        assert.equal(a.fromNow(), "10 months ago", "Below default days to years threshold");
        a.subtract(1, "month");
        assert.equal(a.fromNow(), "a year ago", "Above default days to years threshold");
    });

    it("default thresholds toNow", () => {
        let a = ateos.datetime();

        // Seconds to minutes threshold
        a.subtract(44, "seconds");
        assert.equal(a.toNow(), "in a few seconds", "Below default seconds to minutes threshold");
        a.subtract(1, "seconds");
        assert.equal(a.toNow(), "in a minute", "Above default seconds to minutes threshold");

        // Minutes to hours threshold
        a = ateos.datetime();
        a.subtract(44, "minutes");
        assert.equal(a.toNow(), "in 44 minutes", "Below default minute to hour threshold");
        a.subtract(1, "minutes");
        assert.equal(a.toNow(), "in an hour", "Above default minute to hour threshold");

        // Hours to days threshold
        a = ateos.datetime();
        a.subtract(21, "hours");
        assert.equal(a.toNow(), "in 21 hours", "Below default hours to day threshold");
        a.subtract(1, "hours");
        assert.equal(a.toNow(), "in a day", "Above default hours to day threshold");

        // Days to month threshold
        a = ateos.datetime();
        a.subtract(25, "days");
        assert.equal(a.toNow(), "in 25 days", "Below default days to month (singular) threshold");
        a.subtract(1, "days");
        assert.equal(a.toNow(), "in a month", "Above default days to month (singular) threshold");

        // months to year threshold
        a = ateos.datetime();
        a.subtract(10, "months");
        assert.equal(a.toNow(), "in 10 months", "Below default days to years threshold");
        a.subtract(1, "month");
        assert.equal(a.toNow(), "in a year", "Above default days to years threshold");
    });

    it("custom thresholds", () => {
        let a;

        // Seconds to minute threshold, under 30
        ateos.datetime.relativeTimeThreshold("s", 25);

        a = ateos.datetime();
        a.subtract(24, "seconds");
        assert.equal(a.fromNow(), "a few seconds ago", "Below custom seconds to minute threshold, s < 30");
        a.subtract(1, "seconds");
        assert.equal(a.fromNow(), "a minute ago", "Above custom seconds to minute threshold, s < 30");

        // Seconds to minutes threshold
        ateos.datetime.relativeTimeThreshold("s", 55);

        a = ateos.datetime();
        a.subtract(54, "seconds");
        assert.equal(a.fromNow(), "a few seconds ago", "Below custom seconds to minutes threshold");
        a.subtract(1, "seconds");
        assert.equal(a.fromNow(), "a minute ago", "Above custom seconds to minutes threshold");

        ateos.datetime.relativeTimeThreshold("s", 45);

        // A few seconds to seconds threshold
        ateos.datetime.relativeTimeThreshold("ss", 3);

        a = ateos.datetime();
        a.subtract(3, "seconds");
        assert.equal(a.fromNow(), "a few seconds ago", "Below custom a few seconds to seconds threshold");
        a.subtract(1, "seconds");
        assert.equal(a.fromNow(), "4 seconds ago", "Above custom a few seconds to seconds threshold");

        ateos.datetime.relativeTimeThreshold("ss", 44);

        // Minutes to hours threshold
        ateos.datetime.relativeTimeThreshold("m", 55);
        a = ateos.datetime();
        a.subtract(54, "minutes");
        assert.equal(a.fromNow(), "54 minutes ago", "Below custom minutes to hours threshold");
        a.subtract(1, "minutes");
        assert.equal(a.fromNow(), "an hour ago", "Above custom minutes to hours threshold");
        ateos.datetime.relativeTimeThreshold("m", 45);

        // Hours to days threshold
        ateos.datetime.relativeTimeThreshold("h", 24);
        a = ateos.datetime();
        a.subtract(23, "hours");
        assert.equal(a.fromNow(), "23 hours ago", "Below custom hours to days threshold");
        a.subtract(1, "hours");
        assert.equal(a.fromNow(), "a day ago", "Above custom hours to days threshold");
        ateos.datetime.relativeTimeThreshold("h", 22);

        // Days to month threshold
        ateos.datetime.relativeTimeThreshold("d", 28);
        a = ateos.datetime();
        a.subtract(27, "days");
        assert.equal(a.fromNow(), "27 days ago", "Below custom days to month (singular) threshold");
        a.subtract(1, "days");
        assert.equal(a.fromNow(), "a month ago", "Above custom days to month (singular) threshold");
        ateos.datetime.relativeTimeThreshold("d", 26);

        // months to years threshold
        ateos.datetime.relativeTimeThreshold("M", 9);
        a = ateos.datetime();
        a.subtract(8, "months");
        assert.equal(a.fromNow(), "8 months ago", "Below custom days to years threshold");
        a.subtract(1, "months");
        assert.equal(a.fromNow(), "a year ago", "Above custom days to years threshold");
        ateos.datetime.relativeTimeThreshold("M", 11);
    });

    it("custom rounding", () => {
        const roundingDefault = ateos.datetime.relativeTimeRounding();
        const sThreshold = ateos.datetime.relativeTimeThreshold("s");
        const mThreshold = ateos.datetime.relativeTimeThreshold("m");
        const hThreshold = ateos.datetime.relativeTimeThreshold("h");
        const dThreshold = ateos.datetime.relativeTimeThreshold("d");
        const MThreshold = ateos.datetime.relativeTimeThreshold("M");
        // Round relative time evaluation down
        try {
            ateos.datetime.relativeTimeRounding(Math.floor);

            ateos.datetime.relativeTimeThreshold("s", 60);
            ateos.datetime.relativeTimeThreshold("m", 60);
            ateos.datetime.relativeTimeThreshold("h", 24);
            ateos.datetime.relativeTimeThreshold("d", 27);
            ateos.datetime.relativeTimeThreshold("M", 12);

            let a = ateos.datetime.utc();
            a.subtract({ minutes: 59, seconds: 59 });
            assert.equal(a.toNow(), "in 59 minutes", "Round down towards the nearest minute");

            a = ateos.datetime.utc();
            a.subtract({ hours: 23, minutes: 59, seconds: 59 });
            assert.equal(a.toNow(), "in 23 hours", "Round down towards the nearest hour");

            a = ateos.datetime.utc();
            a.subtract({ days: 26, hours: 23, minutes: 59 });
            assert.equal(a.toNow(), "in 26 days", "Round down towards the nearest day (just under)");

            a = ateos.datetime.utc();
            a.subtract({ days: 27 });
            assert.equal(a.toNow(), "in a month", "Round down towards the nearest day (just over)");

            a = ateos.datetime.utc();
            a.subtract({ days: 364 });
            assert.equal(a.toNow(), "in 11 months", "Round down towards the nearest month");

            a = ateos.datetime.utc();
            a.subtract({ years: 1, days: 364 });
            assert.equal(a.toNow(), "in a year", "Round down towards the nearest year");

            // Do not round relative time evaluation
            const retainValue = function (value) {
                return value.toFixed(3);
            };
            ateos.datetime.relativeTimeRounding(retainValue);

            a = ateos.datetime.utc();
            a.subtract({ hours: 39 });
            assert.equal(a.toNow(), "in 1.625 days", "Round down towards the nearest year");
        } finally {
            ateos.datetime.relativeTimeRounding(roundingDefault);
            ateos.datetime.relativeTimeThreshold("s", sThreshold);
            ateos.datetime.relativeTimeThreshold("m", mThreshold);
            ateos.datetime.relativeTimeThreshold("h", hThreshold);
            ateos.datetime.relativeTimeThreshold("d", dThreshold);
            ateos.datetime.relativeTimeThreshold("M", MThreshold);
        }
    });

    it("retrieve rounding settings", () => {
        ateos.datetime.relativeTimeRounding(Math.round);
        const roundingFunction = ateos.datetime.relativeTimeRounding();

        assert.equal(roundingFunction, Math.round, "Can retrieve rounding setting");
    });

    it("retrieve threshold settings", () => {
        ateos.datetime.relativeTimeThreshold("m", 45);
        const minuteThreshold = ateos.datetime.relativeTimeThreshold("m");

        assert.equal(minuteThreshold, 45, "Can retrieve minute setting");
    });
});
