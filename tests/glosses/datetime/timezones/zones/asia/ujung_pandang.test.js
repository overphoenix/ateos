

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Ujung_Pandang", () => {
        helpers.testYear("Asia/Ujung_Pandang", [["1919-12-31T16:02:23+00:00", "23:59:59", "LMT", -28656 / 60], ["1919-12-31T16:02:24+00:00", "00:00:00", "MMT", -28656 / 60]]);
        helpers.testYear("Asia/Ujung_Pandang", [["1932-10-31T16:02:23+00:00", "23:59:59", "MMT", -28656 / 60], ["1932-10-31T16:02:24+00:00", "00:02:24", "+08", -480]]);
        helpers.testYear("Asia/Ujung_Pandang", [["1942-02-08T15:59:59+00:00", "23:59:59", "+08", -480], ["1942-02-08T16:00:00+00:00", "01:00:00", "+09", -540]]);
        helpers.testYear("Asia/Ujung_Pandang", [["1945-09-22T14:59:59+00:00", "23:59:59", "+09", -540], ["1945-09-22T15:00:00+00:00", "23:00:00", "WITA", -480]]);
    });
});
