

import * as helpers from "../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("PRC", () => {
        helpers.testYear("PRC", [["1940-06-02T15:59:59+00:00", "23:59:59", "CST", -480], ["1940-06-02T16:00:00+00:00", "01:00:00", "CDT", -540], ["1940-09-30T14:59:59+00:00", "23:59:59", "CDT", -540], ["1940-09-30T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1941-03-15T15:59:59+00:00", "23:59:59", "CST", -480], ["1941-03-15T16:00:00+00:00", "01:00:00", "CDT", -540], ["1941-09-30T14:59:59+00:00", "23:59:59", "CDT", -540], ["1941-09-30T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1986-05-03T15:59:59+00:00", "23:59:59", "CST", -480], ["1986-05-03T16:00:00+00:00", "01:00:00", "CDT", -540], ["1986-09-13T14:59:59+00:00", "23:59:59", "CDT", -540], ["1986-09-13T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1987-04-11T15:59:59+00:00", "23:59:59", "CST", -480], ["1987-04-11T16:00:00+00:00", "01:00:00", "CDT", -540], ["1987-09-12T14:59:59+00:00", "23:59:59", "CDT", -540], ["1987-09-12T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1988-04-09T15:59:59+00:00", "23:59:59", "CST", -480], ["1988-04-09T16:00:00+00:00", "01:00:00", "CDT", -540], ["1988-09-10T14:59:59+00:00", "23:59:59", "CDT", -540], ["1988-09-10T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1989-04-15T15:59:59+00:00", "23:59:59", "CST", -480], ["1989-04-15T16:00:00+00:00", "01:00:00", "CDT", -540], ["1989-09-16T14:59:59+00:00", "23:59:59", "CDT", -540], ["1989-09-16T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1990-04-14T15:59:59+00:00", "23:59:59", "CST", -480], ["1990-04-14T16:00:00+00:00", "01:00:00", "CDT", -540], ["1990-09-15T14:59:59+00:00", "23:59:59", "CDT", -540], ["1990-09-15T15:00:00+00:00", "23:00:00", "CST", -480]]);
        helpers.testYear("PRC", [["1991-04-13T15:59:59+00:00", "23:59:59", "CST", -480], ["1991-04-13T16:00:00+00:00", "01:00:00", "CDT", -540], ["1991-09-14T14:59:59+00:00", "23:59:59", "CDT", -540], ["1991-09-14T15:00:00+00:00", "23:00:00", "CST", -480]]);
    });
});
