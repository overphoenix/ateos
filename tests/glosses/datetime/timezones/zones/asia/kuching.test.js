

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Kuching", () => {
        helpers.testYear("Asia/Kuching", [["1926-02-28T16:38:39+00:00", "23:59:59", "LMT", -26480 / 60], ["1926-02-28T16:38:40+00:00", "00:08:40", "+0730", -450]]);
        helpers.testYear("Asia/Kuching", [["1932-12-31T16:29:59+00:00", "23:59:59", "+0730", -450], ["1932-12-31T16:30:00+00:00", "00:30:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1935-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1935-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1935-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1935-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1936-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1936-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1936-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1936-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1937-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1937-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1937-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1937-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1938-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1938-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1938-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1938-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1939-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1939-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1939-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1939-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1940-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1940-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1940-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1940-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1941-09-13T15:59:59+00:00", "23:59:59", "+08", -480], ["1941-09-13T16:00:00+00:00", "00:20:00", "+0820", -500], ["1941-12-13T15:39:59+00:00", "23:59:59", "+0820", -500], ["1941-12-13T15:40:00+00:00", "23:40:00", "+08", -480]]);
        helpers.testYear("Asia/Kuching", [["1942-02-15T15:59:59+00:00", "23:59:59", "+08", -480], ["1942-02-15T16:00:00+00:00", "01:00:00", "+09", -540]]);
        helpers.testYear("Asia/Kuching", [["1945-09-11T14:59:59+00:00", "23:59:59", "+09", -540], ["1945-09-11T15:00:00+00:00", "23:00:00", "+08", -480]]);
    });
});
