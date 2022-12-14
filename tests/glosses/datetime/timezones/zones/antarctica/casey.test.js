

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Antarctica/Casey", () => {
        helpers.testYear("Antarctica/Casey", [["1968-12-31T23:59:59+00:00", "23:59:59", "-00", 0]]);
        helpers.testYear("Antarctica/Casey", [["1969-01-01T00:00:00+00:00", "08:00:00", "+08", -480]]);
        helpers.testYear("Antarctica/Casey", [["2009-10-17T17:59:59+00:00", "01:59:59", "+08", -480], ["2009-10-17T18:00:00+00:00", "05:00:00", "+11", -660]]);
        helpers.testYear("Antarctica/Casey", [["2010-03-04T14:59:59+00:00", "01:59:59", "+11", -660], ["2010-03-04T15:00:00+00:00", "23:00:00", "+08", -480]]);
        helpers.testYear("Antarctica/Casey", [["2011-10-27T17:59:59+00:00", "01:59:59", "+08", -480], ["2011-10-27T18:00:00+00:00", "05:00:00", "+11", -660]]);
        helpers.testYear("Antarctica/Casey", [["2012-02-21T16:59:59+00:00", "03:59:59", "+11", -660], ["2012-02-21T17:00:00+00:00", "01:00:00", "+08", -480]]);
        helpers.testYear("Antarctica/Casey", [["2016-10-21T15:59:59+00:00", "23:59:59", "+08", -480], ["2016-10-21T16:00:00+00:00", "03:00:00", "+11", -660]]);
    });
});
