

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Pacific/Kwajalein", () => {
        helpers.testYear("Pacific/Kwajalein", [["1969-09-30T12:59:59+00:00", "23:59:59", "+11", -660], ["1969-09-30T13:00:00+00:00", "01:00:00", "-12", 720]]);
        helpers.testYear("Pacific/Kwajalein", [["1993-08-20T11:59:59+00:00", "23:59:59", "-12", 720], ["1993-08-20T12:00:00+00:00", "00:00:00", "+12", -720]]);
    });
});
