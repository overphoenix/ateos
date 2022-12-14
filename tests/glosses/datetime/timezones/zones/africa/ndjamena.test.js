

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Africa/Ndjamena", () => {
        helpers.testYear("Africa/Ndjamena", [["1911-12-31T22:59:47+00:00", "23:59:59", "LMT", -3612 / 60], ["1911-12-31T22:59:48+00:00", "23:59:48", "WAT", -60]]);
        helpers.testYear("Africa/Ndjamena", [["1979-10-13T22:59:59+00:00", "23:59:59", "WAT", -60], ["1979-10-13T23:00:00+00:00", "01:00:00", "WAST", -120]]);
        helpers.testYear("Africa/Ndjamena", [["1980-03-07T21:59:59+00:00", "23:59:59", "WAST", -120], ["1980-03-07T22:00:00+00:00", "23:00:00", "WAT", -60]]);
    });
});
