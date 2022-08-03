

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Aden", () => {
        helpers.testYear("Asia/Aden", [["1947-03-13T20:53:07+00:00", "23:59:59", "LMT", -11212 / 60], ["1947-03-13T20:53:08+00:00", "23:53:08", "+03", -180]]);
    });
});
