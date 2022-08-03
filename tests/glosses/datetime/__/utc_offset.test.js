describe("datetime", "utc offset", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it("setter / getter blackbox", () => {
        const m = ateos.datetime([2010]);

        assert.equal(m.clone().utcOffset(0).utcOffset(), 0, "utcOffset 0");

        assert.equal(m.clone().utcOffset(1).utcOffset(), 60, "utcOffset 1 is 60");
        assert.equal(m.clone().utcOffset(60).utcOffset(), 60, "utcOffset 60");
        assert.equal(m.clone().utcOffset("+01:00").utcOffset(), 60, "utcOffset +01:00 is 60");
        assert.equal(m.clone().utcOffset("+0100").utcOffset(), 60, "utcOffset +0100 is 60");

        assert.equal(m.clone().utcOffset(-1).utcOffset(), -60, "utcOffset -1 is -60");
        assert.equal(m.clone().utcOffset(-60).utcOffset(), -60, "utcOffset -60");
        assert.equal(m.clone().utcOffset("-01:00").utcOffset(), -60, "utcOffset -01:00 is -60");
        assert.equal(m.clone().utcOffset("-0100").utcOffset(), -60, "utcOffset -0100 is -60");

        assert.equal(m.clone().utcOffset(1.5).utcOffset(), 90, "utcOffset 1.5 is 90");
        assert.equal(m.clone().utcOffset(90).utcOffset(), 90, "utcOffset 1.5 is 90");
        assert.equal(m.clone().utcOffset("+01:30").utcOffset(), 90, "utcOffset +01:30 is 90");
        assert.equal(m.clone().utcOffset("+0130").utcOffset(), 90, "utcOffset +0130 is 90");

        assert.equal(m.clone().utcOffset(-1.5).utcOffset(), -90, "utcOffset -1.5");
        assert.equal(m.clone().utcOffset(-90).utcOffset(), -90, "utcOffset -90");
        assert.equal(m.clone().utcOffset("-01:30").utcOffset(), -90, "utcOffset +01:30 is 90");
        assert.equal(m.clone().utcOffset("-0130").utcOffset(), -90, "utcOffset +0130 is 90");
        assert.equal(m.clone().utcOffset("+00:10").utcOffset(), 10, "utcOffset +00:10 is 10");
        assert.equal(m.clone().utcOffset("-00:10").utcOffset(), -10, "utcOffset +00:10 is 10");
        assert.equal(m.clone().utcOffset("+0010").utcOffset(), 10, "utcOffset +0010 is 10");
        assert.equal(m.clone().utcOffset("-0010").utcOffset(), -10, "utcOffset +0010 is 10");
    });

    it("utcOffset shorthand hours -> minutes", () => {
        let i;
        for (i = -15; i <= 15; ++i) {
            assert.equal(ateos.datetime().utcOffset(i).utcOffset(), i * 60,
                    `${String(i)} -> ${i * 60}`);
        }
        assert.equal(ateos.datetime().utcOffset(-16).utcOffset(), -16, "-16 -> -16");
        assert.equal(ateos.datetime().utcOffset(16).utcOffset(), 16, "16 -> 16");
    });

    it("isLocal, isUtc, isUtcOffset", () => {
        assert.ok(ateos.datetime().isLocal(), "ateos.datetime() creates objects in local time");
        assert.ok(!ateos.datetime.utc().isLocal(), "ateos.datetime.utc creates objects NOT in local time");
        assert.ok(ateos.datetime.utc().local().isLocal(), "ateos.datetime.fn.local() converts to local time");
        assert.ok(!ateos.datetime().utcOffset(5).isLocal(), "ateos.datetime.fn.utcOffset(N) puts objects NOT in local time");
        assert.ok(ateos.datetime().utcOffset(5).local().isLocal(), "ateos.datetime.fn.local() converts to local time");

        assert.ok(ateos.datetime.utc().isUtc(), "ateos.datetime.utc() creates objects in utc time");
        assert.ok(ateos.datetime().utcOffset(0).isUtc(), "utcOffset(0) is equivalent to utc mode");
        assert.ok(!ateos.datetime().utcOffset(1).isUtc(), "utcOffset(1) is NOT equivalent to utc mode");

        assert.ok(!ateos.datetime().isUtcOffset(), "ateos.datetime() creates objects NOT in utc-offset mode");
        assert.ok(ateos.datetime.utc().isUtcOffset(), "ateos.datetime.utc() creates objects in utc-offset mode");
        assert.ok(ateos.datetime().utcOffset(3).isUtcOffset(), "utcOffset(N != 0) creates objects in utc-offset mode");
        assert.ok(ateos.datetime().utcOffset(0).isUtcOffset(), "utcOffset(0) creates objects in utc-offset mode");
    });

    it("isUTC", () => {
        assert.ok(ateos.datetime.utc().isUTC(), "ateos.datetime.utc() creates objects in utc time");
        assert.ok(ateos.datetime().utcOffset(0).isUTC(), "utcOffset(0) is equivalent to utc mode");
        assert.ok(!ateos.datetime().utcOffset(1).isUTC(), "utcOffset(1) is NOT equivalent to utc mode");
    });

    it("change hours when changing the utc offset", () => {
        const m = ateos.datetime.utc([2000, 0, 1, 6]);
        assert.equal(m.hour(), 6, "UTC 6AM should be 6AM at +0000");

        // sanity check
        m.utcOffset(0);
        assert.equal(m.hour(), 6, "UTC 6AM should be 6AM at +0000");

        m.utcOffset(-60);
        assert.equal(m.hour(), 5, "UTC 6AM should be 5AM at -0100");

        m.utcOffset(60);
        assert.equal(m.hour(), 7, "UTC 6AM should be 7AM at +0100");
    });

    it("change minutes when changing the utc offset", () => {
        const m = ateos.datetime.utc([2000, 0, 1, 6, 31]);

        m.utcOffset(0);
        assert.equal(m.format("HH:mm"), "06:31", "UTC 6:31AM should be 6:31AM at +0000");

        m.utcOffset(-30);
        assert.equal(m.format("HH:mm"), "06:01", "UTC 6:31AM should be 6:01AM at -0030");

        m.utcOffset(30);
        assert.equal(m.format("HH:mm"), "07:01", "UTC 6:31AM should be 7:01AM at +0030");

        m.utcOffset(-1380);
        assert.equal(m.format("HH:mm"), "07:31", "UTC 6:31AM should be 7:31AM at +1380");
    });

    it("distance from the unix epoch", () => {
        const zoneA = ateos.datetime();
        const zoneB = ateos.datetime(zoneA);
        const zoneC = ateos.datetime(zoneA);
        const zoneD = ateos.datetime(zoneA);
        const zoneE = ateos.datetime(zoneA);

        zoneB.utc();
        assert.equal(Number(zoneA), Number(zoneB), "ateos.datetime should equal ateos.datetime.utc");

        zoneC.utcOffset(60);
        assert.equal(Number(zoneA), Number(zoneC), "ateos.datetime should equal ateos.datetime.utcOffset(60)");

        zoneD.utcOffset(-480);
        assert.equal(Number(zoneA), Number(zoneD),
                "ateos.datetime should equal ateos.datetime.utcOffset(-480)");

        zoneE.utcOffset(-1000);
        assert.equal(Number(zoneA), Number(zoneE),
                "ateos.datetime should equal ateos.datetime.utcOffset(-1000)");
    });

    it("update offset after changing any values", () => {
        const oldOffset = ateos.datetime.updateOffset;
        const m = ateos.datetime.utc([2000, 6, 1]);

        ateos.datetime.updateOffset = function (mom, keepTime) {
            if (mom.__doChange) {
                if (Number(mom) > 962409600000) {
                    mom.utcOffset(-120, keepTime);
                } else {
                    mom.utcOffset(-60, keepTime);
                }
            }
        };

        assert.equal(m.format("ZZ"), "+0000", "should be at +0000");
        assert.equal(m.format("HH:mm"), "00:00", "should start 12AM at +0000 timezone");

        m.__doChange = true;
        m.add(1, "h");

        assert.equal(m.format("ZZ"), "-0200", "should be at -0200");
        assert.equal(m.format("HH:mm"), "23:00", "1AM at +0000 should be 11PM at -0200 timezone");

        m.subtract(1, "h");

        assert.equal(m.format("ZZ"), "-0100", "should be at -0100");
        assert.equal(m.format("HH:mm"), "23:00", "12AM at +0000 should be 11PM at -0100 timezone");

        ateos.datetime.updateOffset = oldOffset;
    });

    //////////////////
    it("getters and setters", () => {
        const a = ateos.datetime([2011, 5, 20]);

        assert.equal(a.clone().utcOffset(-120).year(2012).year(), 2012, "should get and set year correctly");
        assert.equal(a.clone().utcOffset(-120).month(1).month(), 1, "should get and set month correctly");
        assert.equal(a.clone().utcOffset(-120).date(2).date(), 2, "should get and set date correctly");
        assert.equal(a.clone().utcOffset(-120).day(1).day(), 1, "should get and set day correctly");
        assert.equal(a.clone().utcOffset(-120).hour(1).hour(), 1, "should get and set hour correctly");
        assert.equal(a.clone().utcOffset(-120).minute(1).minute(), 1, "should get and set minute correctly");
    });

    it("getters", () => {
        const a = ateos.datetime.utc([2012, 0, 1, 0, 0, 0]);

        assert.equal(a.clone().utcOffset(-120).year(), 2011, "should get year correctly");
        assert.equal(a.clone().utcOffset(-120).month(), 11, "should get month correctly");
        assert.equal(a.clone().utcOffset(-120).date(), 31, "should get date correctly");
        assert.equal(a.clone().utcOffset(-120).hour(), 22, "should get hour correctly");
        assert.equal(a.clone().utcOffset(-120).minute(), 0, "should get minute correctly");

        assert.equal(a.clone().utcOffset(120).year(), 2012, "should get year correctly");
        assert.equal(a.clone().utcOffset(120).month(), 0, "should get month correctly");
        assert.equal(a.clone().utcOffset(120).date(), 1, "should get date correctly");
        assert.equal(a.clone().utcOffset(120).hour(), 2, "should get hour correctly");
        assert.equal(a.clone().utcOffset(120).minute(), 0, "should get minute correctly");

        assert.equal(a.clone().utcOffset(90).year(), 2012, "should get year correctly");
        assert.equal(a.clone().utcOffset(90).month(), 0, "should get month correctly");
        assert.equal(a.clone().utcOffset(90).date(), 1, "should get date correctly");
        assert.equal(a.clone().utcOffset(90).hour(), 1, "should get hour correctly");
        assert.equal(a.clone().utcOffset(90).minute(), 30, "should get minute correctly");
    });

    it("from", () => {
        const zoneA = ateos.datetime();
        const zoneB = ateos.datetime(zoneA).utcOffset(-720);
        const zoneC = ateos.datetime(zoneA).utcOffset(-360);
        const zoneD = ateos.datetime(zoneA).utcOffset(690);
        const other = ateos.datetime(zoneA).add(35, "m");

        assert.equal(zoneA.from(other), zoneB.from(other), "ateos.datetime#from should be the same in all zones");
        assert.equal(zoneA.from(other), zoneC.from(other), "ateos.datetime#from should be the same in all zones");
        assert.equal(zoneA.from(other), zoneD.from(other), "ateos.datetime#from should be the same in all zones");
    });

    it("diff", () => {
        const zoneA = ateos.datetime();
        const zoneB = ateos.datetime(zoneA).utcOffset(-720);
        const zoneC = ateos.datetime(zoneA).utcOffset(-360);
        const zoneD = ateos.datetime(zoneA).utcOffset(690);
        const other = ateos.datetime(zoneA).add(35, "m");

        assert.equal(zoneA.diff(other), zoneB.diff(other), "ateos.datetime#diff should be the same in all zones");
        assert.equal(zoneA.diff(other), zoneC.diff(other), "ateos.datetime#diff should be the same in all zones");
        assert.equal(zoneA.diff(other), zoneD.diff(other), "ateos.datetime#diff should be the same in all zones");

        assert.equal(zoneA.diff(other, "minute", true), zoneB.diff(other, "minute", true), "ateos.datetime#diff should be the same in all zones");
        assert.equal(zoneA.diff(other, "minute", true), zoneC.diff(other, "minute", true), "ateos.datetime#diff should be the same in all zones");
        assert.equal(zoneA.diff(other, "minute", true), zoneD.diff(other, "minute", true), "ateos.datetime#diff should be the same in all zones");

        assert.equal(zoneA.diff(other, "hour", true), zoneB.diff(other, "hour", true), "ateos.datetime#diff should be the same in all zones");
        assert.equal(zoneA.diff(other, "hour", true), zoneC.diff(other, "hour", true), "ateos.datetime#diff should be the same in all zones");
        assert.equal(zoneA.diff(other, "hour", true), zoneD.diff(other, "hour", true), "ateos.datetime#diff should be the same in all zones");
    });

    it("unix offset and timestamp", () => {
        const zoneA = ateos.datetime();
        const zoneB = ateos.datetime(zoneA).utcOffset(-720);
        const zoneC = ateos.datetime(zoneA).utcOffset(-360);
        const zoneD = ateos.datetime(zoneA).utcOffset(690);

        assert.equal(zoneA.unix(), zoneB.unix(), "ateos.datetime#unix should be the same in all zones");
        assert.equal(zoneA.unix(), zoneC.unix(), "ateos.datetime#unix should be the same in all zones");
        assert.equal(zoneA.unix(), zoneD.unix(), "ateos.datetime#unix should be the same in all zones");

        assert.equal(Number(zoneA), Number(zoneB), "ateos.datetime#valueOf should be the same in all zones");
        assert.equal(Number(zoneA), Number(zoneC), "ateos.datetime#valueOf should be the same in all zones");
        assert.equal(Number(zoneA), Number(zoneD), "ateos.datetime#valueOf should be the same in all zones");
    });

    it("cloning", () => {
        assert.equal(ateos.datetime().utcOffset(-120).clone().utcOffset(), -120,
                "explicit cloning should retain the offset");
        assert.equal(ateos.datetime().utcOffset(120).clone().utcOffset(), 120,
                "explicit cloning should retain the offset");
        assert.equal(ateos.datetime(ateos.datetime().utcOffset(-120)).utcOffset(), -120,
                "implicit cloning should retain the offset");
        assert.equal(ateos.datetime(ateos.datetime().utcOffset(120)).utcOffset(), 120,
                "implicit cloning should retain the offset");
    });

    it("start of / end of", () => {
        const a = ateos.datetime.utc([2010, 1, 2, 0, 0, 0]).utcOffset(-450);

        assert.equal(a.clone().startOf("day").hour(), 0,
                "start of day should work on moments with utc offset");
        assert.equal(a.clone().startOf("day").minute(), 0,
                "start of day should work on moments with utc offset");
        assert.equal(a.clone().startOf("hour").minute(), 0,
                "start of hour should work on moments with utc offset");

        assert.equal(a.clone().endOf("day").hour(), 23,
                "end of day should work on moments with utc offset");
        assert.equal(a.clone().endOf("day").minute(), 59,
                "end of day should work on moments with utc offset");
        assert.equal(a.clone().endOf("hour").minute(), 59,
                "end of hour should work on moments with utc offset");
    });

    it("reset offset with ateos.datetime#utc", () => {
        const a = ateos.datetime.utc([2012]).utcOffset(-480);

        assert.equal(a.clone().hour(), 16, "different utc offset should have different hour");
        assert.equal(a.clone().utc().hour(), 0, "calling ateos.datetime#utc should reset the offset");
    });

    it("reset offset with ateos.datetime#local", () => {
        const a = ateos.datetime([2012]).utcOffset(-480);

        assert.equal(a.clone().local().hour(), 0, "calling ateos.datetime#local should reset the offset");
    });

    it("toDate", () => {
        const zoneA = new Date();
        const zoneB = ateos.datetime(zoneA).utcOffset(-720).toDate();
        const zoneC = ateos.datetime(zoneA).utcOffset(-360).toDate();
        const zoneD = ateos.datetime(zoneA).utcOffset(690).toDate();

        assert.equal(Number(zoneA), Number(zoneB), "ateos.datetime#toDate should output a date with the right unix timestamp");
        assert.equal(Number(zoneA), Number(zoneC), "ateos.datetime#toDate should output a date with the right unix timestamp");
        assert.equal(Number(zoneA), Number(zoneD), "ateos.datetime#toDate should output a date with the right unix timestamp");
    });

    it("same / before / after", () => {
        const zoneA = ateos.datetime().utc();
        const zoneB = ateos.datetime(zoneA).utcOffset(-120);
        const zoneC = ateos.datetime(zoneA).utcOffset(120);

        assert.ok(zoneA.isSame(zoneB), "two moments with different offsets should be the same");
        assert.ok(zoneA.isSame(zoneC), "two moments with different offsets should be the same");

        assert.ok(zoneA.isSame(zoneB, "hour"), "two moments with different offsets should be the same hour");
        assert.ok(zoneA.isSame(zoneC, "hour"), "two moments with different offsets should be the same hour");

        zoneA.add(1, "hour");

        assert.ok(zoneA.isAfter(zoneB), "isAfter should work with two moments with different offsets");
        assert.ok(zoneA.isAfter(zoneC), "isAfter should work with two moments with different offsets");

        assert.ok(zoneA.isAfter(zoneB, "hour"), "isAfter:hour should work with two moments with different offsets");
        assert.ok(zoneA.isAfter(zoneC, "hour"), "isAfter:hour should work with two moments with different offsets");

        zoneA.subtract(2, "hour");

        assert.ok(zoneA.isBefore(zoneB), "isBefore should work with two moments with different offsets");
        assert.ok(zoneA.isBefore(zoneC), "isBefore should work with two moments with different offsets");

        assert.ok(zoneA.isBefore(zoneB, "hour"), "isBefore:hour should work with two moments with different offsets");
        assert.ok(zoneA.isBefore(zoneC, "hour"), "isBefore:hour should work with two moments with different offsets");
    });

    it("add / subtract over dst", () => {
        const oldOffset = ateos.datetime.updateOffset;
        const m = ateos.datetime.utc([2000, 2, 31, 3]);

        ateos.datetime.updateOffset = function (mom, keepTime) {
            if (mom.clone().utc().month() > 2) {
                mom.utcOffset(60, keepTime);
            } else {
                mom.utcOffset(0, keepTime);
            }
        };

        assert.equal(m.hour(), 3, "should start at 00:00");

        m.add(24, "hour");

        assert.equal(m.hour(), 4, "adding 24 hours should disregard dst");

        m.subtract(24, "hour");

        assert.equal(m.hour(), 3, "subtracting 24 hours should disregard dst");

        m.add(1, "day");

        assert.equal(m.hour(), 3, "adding 1 day should have the same hour");

        m.subtract(1, "day");

        assert.equal(m.hour(), 3, "subtracting 1 day should have the same hour");

        m.add(1, "month");

        assert.equal(m.hour(), 3, "adding 1 month should have the same hour");

        m.subtract(1, "month");

        assert.equal(m.hour(), 3, "subtracting 1 month should have the same hour");

        ateos.datetime.updateOffset = oldOffset;
    });

    it("isDST", () => {
        const oldOffset = ateos.datetime.updateOffset;

        ateos.datetime.updateOffset = function (mom, keepTime) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.utcOffset(60, keepTime);
            } else {
                mom.utcOffset(0, keepTime);
            }
        };

        assert.ok(!ateos.datetime().month(0).isDST(), "Jan should not be summer dst");
        assert.ok(ateos.datetime().month(6).isDST(), "Jul should be summer dst");
        assert.ok(!ateos.datetime().month(11).isDST(), "Dec should not be summer dst");

        ateos.datetime.updateOffset = function (mom) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.utcOffset(0);
            } else {
                mom.utcOffset(60);
            }
        };

        assert.ok(ateos.datetime().month(0).isDST(), "Jan should be winter dst");
        assert.ok(!ateos.datetime().month(6).isDST(), "Jul should not be winter dst");
        assert.ok(ateos.datetime().month(11).isDST(), "Dec should be winter dst");

        ateos.datetime.updateOffset = oldOffset;
    });

    it("zone names", () => {
        assert.equal(ateos.datetime().zoneAbbr(), "", "Local zone abbr should be empty");
        assert.equal(ateos.datetime().format("z"), "", "Local zone formatted abbr should be empty");
        assert.equal(ateos.datetime().zoneName(), "", "Local zone name should be empty");
        assert.equal(ateos.datetime().format("zz"), "", "Local zone formatted name should be empty");

        assert.equal(ateos.datetime.utc().zoneAbbr(), "UTC", "UTC zone abbr should be UTC");
        assert.equal(ateos.datetime.utc().format("z"), "UTC", "UTC zone formatted abbr should be UTC");
        assert.equal(ateos.datetime.utc().zoneName(), "Coordinated Universal Time", "UTC zone abbr should be Coordinated Universal Time");
        assert.equal(ateos.datetime.utc().format("zz"), "Coordinated Universal Time", "UTC zone formatted abbr should be Coordinated Universal Time");
    });

    it("hours alignment with UTC", () => {
        assert.equal(ateos.datetime().utcOffset(-120).hasAlignedHourOffset(), true);
        assert.equal(ateos.datetime().utcOffset(180).hasAlignedHourOffset(), true);
        assert.equal(ateos.datetime().utcOffset(-90).hasAlignedHourOffset(), false);
        assert.equal(ateos.datetime().utcOffset(90).hasAlignedHourOffset(), false);
    });

    it("hours alignment with other zone", () => {
        let m = ateos.datetime().utcOffset(-120);

        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-180)), true);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(180)), true);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-90)), false);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(90)), false);

        m = ateos.datetime().utcOffset(-90);

        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-180)), false);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(180)), false);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-30)), true);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(30)), true);

        m = ateos.datetime().utcOffset(60);

        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-180)), true);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(180)), true);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-90)), false);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(90)), false);

        m = ateos.datetime().utcOffset(-25);

        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(35)), true);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-85)), true);

        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(-35)), false);
        assert.equal(m.hasAlignedHourOffset(ateos.datetime().utcOffset(85)), false);
    });

    it("parse zone", () => {
        const m = ateos.datetime("2013-01-01T00:00:00-13:00").parseZone();
        assert.equal(m.utcOffset(), -13 * 60);
        assert.equal(m.hours(), 0);
    });

    it("parse UTC zone", () => {
        const m = ateos.datetime("2013-01-01T05:00:00+00:00").parseZone();
        assert.equal(m.utcOffset(), 0);
        assert.equal(m.hours(), 5);
    });

    it("parse zone static", () => {
        const m = ateos.datetime.parseZone("2013-01-01T00:00:00-13:00");
        assert.equal(m.utcOffset(), -13 * 60);
        assert.equal(m.hours(), 0);
    });

    it("parse zone with more arguments", () => {
        let m;
        m = ateos.datetime.parseZone("2013 01 01 05 -13:00", "YYYY MM DD HH ZZ");
        assert.equal(m.format(), "2013-01-01T05:00:00-13:00", "accept input and format");
        m = ateos.datetime.parseZone("2013-01-01-13:00", "YYYY MM DD ZZ", true);
        assert.equal(m.isValid(), false, "accept input, format and strict flag");
        m = ateos.datetime.parseZone("2013-01-01-13:00", ["DD MM YYYY ZZ", "YYYY MM DD ZZ"]);
        assert.equal(m.format(), "2013-01-01T00:00:00-13:00", "accept input and array of formats");
    });

    it("parse zone with a timezone from the format string", () => {
        const m = ateos.datetime("11-12-2013 -0400 +1100", "DD-MM-YYYY ZZ #####").parseZone();

        assert.equal(m.utcOffset(), -4 * 60);
    });

    it("parse zone without a timezone included in the format string", () => {
        const m = ateos.datetime("11-12-2013 -0400 +1100", "DD-MM-YYYY").parseZone();

        assert.equal(m.utcOffset(), 11 * 60);
    });

    it("timezone format", () => {
        assert.equal(ateos.datetime().utcOffset(60).format("ZZ"), "+0100", "-60 -> +0100");
        assert.equal(ateos.datetime().utcOffset(90).format("ZZ"), "+0130", "-90 -> +0130");
        assert.equal(ateos.datetime().utcOffset(120).format("ZZ"), "+0200", "-120 -> +0200");

        assert.equal(ateos.datetime().utcOffset(-60).format("ZZ"), "-0100", "+60 -> -0100");
        assert.equal(ateos.datetime().utcOffset(-90).format("ZZ"), "-0130", "+90 -> -0130");
        assert.equal(ateos.datetime().utcOffset(-120).format("ZZ"), "-0200", "+120 -> -0200");
    });
});
