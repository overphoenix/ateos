

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Pacific/Galapagos", () => {
        helpers.testYear("Pacific/Galapagos", [["1931-01-01T05:58:23+00:00", "23:59:59", "LMT", 21504 / 60], ["1931-01-01T05:58:24+00:00", "00:58:24", "-05", 300]]);
        helpers.testYear("Pacific/Galapagos", [["1986-01-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1986-01-01T05:00:00+00:00", "23:00:00", "-06", 360]]);
        helpers.testYear("Pacific/Galapagos", [["1992-11-28T05:59:59+00:00", "23:59:59", "-06", 360], ["1992-11-28T06:00:00+00:00", "01:00:00", "-05", 300]]);
        helpers.testYear("Pacific/Galapagos", [["1993-02-05T04:59:59+00:00", "23:59:59", "-05", 300], ["1993-02-05T05:00:00+00:00", "23:00:00", "-06", 360]]);
    });
});
