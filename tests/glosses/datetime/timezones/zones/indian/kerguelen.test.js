

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Indian/Kerguelen", () => {
        helpers.testYear("Indian/Kerguelen", [["1949-12-31T23:59:59+00:00", "23:59:59", "-00", 0]]);
        helpers.testYear("Indian/Kerguelen", [["1950-01-01T00:00:00+00:00", "05:00:00", "+05", -300]]);
    });
});
