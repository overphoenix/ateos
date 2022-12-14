

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Phnom_Penh", () => {
        helpers.testYear("Asia/Phnom_Penh", [["1920-03-31T17:17:55+00:00", "23:59:59", "BMT", -24124 / 60], ["1920-03-31T17:17:56+00:00", "00:17:56", "+07", -420]]);
    });
});
