

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Pontianak", () => {
        helpers.testYear("Asia/Pontianak", [["1908-04-30T16:42:39+00:00", "23:59:59", "LMT", -26240 / 60], ["1908-04-30T16:42:40+00:00", "00:00:00", "PMT", -26240 / 60]]);
        helpers.testYear("Asia/Pontianak", [["1932-10-31T16:42:39+00:00", "23:59:59", "PMT", -26240 / 60], ["1932-10-31T16:42:40+00:00", "00:12:40", "+0730", -450]]);
        helpers.testYear("Asia/Pontianak", [["1942-01-28T16:29:59+00:00", "23:59:59", "+0730", -450], ["1942-01-28T16:30:00+00:00", "01:30:00", "+09", -540]]);
        helpers.testYear("Asia/Pontianak", [["1945-09-22T14:59:59+00:00", "23:59:59", "+09", -540], ["1945-09-22T15:00:00+00:00", "22:30:00", "+0730", -450]]);
        helpers.testYear("Asia/Pontianak", [["1948-04-30T16:29:59+00:00", "23:59:59", "+0730", -450], ["1948-04-30T16:30:00+00:00", "00:30:00", "+08", -480]]);
        helpers.testYear("Asia/Pontianak", [["1950-04-30T15:59:59+00:00", "23:59:59", "+08", -480], ["1950-04-30T16:00:00+00:00", "23:30:00", "+0730", -450]]);
        helpers.testYear("Asia/Pontianak", [["1963-12-31T16:29:59+00:00", "23:59:59", "+0730", -450], ["1963-12-31T16:30:00+00:00", "00:30:00", "WITA", -480]]);
        helpers.testYear("Asia/Pontianak", [["1987-12-31T15:59:59+00:00", "23:59:59", "WITA", -480], ["1987-12-31T16:00:00+00:00", "23:00:00", "WIB", -420]]);
    });
});
