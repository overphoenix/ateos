

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Guyana", () => {
        helpers.testYear("America/Guyana", [["1915-03-01T03:52:39+00:00", "23:59:59", "LMT", 13960 / 60], ["1915-03-01T03:52:40+00:00", "00:07:40", "-0345", 225]]);
        helpers.testYear("America/Guyana", [["1975-07-31T03:44:59+00:00", "23:59:59", "-0345", 225], ["1975-07-31T03:45:00+00:00", "00:45:00", "-03", 180]]);
        helpers.testYear("America/Guyana", [["1991-01-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1991-01-01T03:00:00+00:00", "23:00:00", "-04", 240]]);
    });
});
