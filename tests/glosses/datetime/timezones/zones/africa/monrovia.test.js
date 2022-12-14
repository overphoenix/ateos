

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Africa/Monrovia", () => {
        helpers.testYear("Africa/Monrovia", [["1919-03-01T00:43:07+00:00", "23:59:59", "MMT", 2588 / 60], ["1919-03-01T00:43:08+00:00", "23:58:38", "MMT", 2670 / 60]]);
        helpers.testYear("Africa/Monrovia", [["1972-01-07T00:44:29+00:00", "23:59:59", "MMT", 2670 / 60], ["1972-01-07T00:44:30+00:00", "00:44:30", "GMT", 0]]);
    });
});
