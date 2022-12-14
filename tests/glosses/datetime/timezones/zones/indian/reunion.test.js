

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Indian/Reunion", () => {
        helpers.testYear("Indian/Reunion", [["1911-05-31T20:18:07+00:00", "23:59:59", "LMT", -13312 / 60], ["1911-05-31T20:18:08+00:00", "00:18:08", "+04", -240]]);
    });
});
