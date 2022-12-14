

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/La_Paz", () => {
        helpers.testYear("America/La_Paz", [["1931-10-15T04:32:35+00:00", "23:59:59", "CMT", 16356 / 60], ["1931-10-15T04:32:36+00:00", "01:00:00", "BOST", 12756 / 60]]);
        helpers.testYear("America/La_Paz", [["1932-03-21T03:32:35+00:00", "23:59:59", "BOST", 12756 / 60], ["1932-03-21T03:32:36+00:00", "23:32:36", "-04", 240]]);
    });
});
