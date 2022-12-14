

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Rangoon", () => {
        helpers.testYear("Asia/Rangoon", [["1919-12-31T17:35:12+00:00", "23:59:59", "RMT", -23087 / 60], ["1919-12-31T17:35:13+00:00", "00:05:13", "+0630", -390]]);
        helpers.testYear("Asia/Rangoon", [["1942-04-30T17:29:59+00:00", "23:59:59", "+0630", -390], ["1942-04-30T17:30:00+00:00", "02:30:00", "+09", -540]]);
        helpers.testYear("Asia/Rangoon", [["1945-05-02T14:59:59+00:00", "23:59:59", "+09", -540], ["1945-05-02T15:00:00+00:00", "21:30:00", "+0630", -390]]);
    });
});
