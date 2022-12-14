

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Thimbu", () => {
        helpers.testYear("Asia/Thimbu", [["1947-08-14T18:01:23+00:00", "23:59:59", "LMT", -21516 / 60], ["1947-08-14T18:01:24+00:00", "23:31:24", "+0530", -330]]);
        helpers.testYear("Asia/Thimbu", [["1987-09-30T18:29:59+00:00", "23:59:59", "+0530", -330], ["1987-09-30T18:30:00+00:00", "00:30:00", "+06", -360]]);
    });
});
