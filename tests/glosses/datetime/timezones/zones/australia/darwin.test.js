

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Australia/Darwin", () => {
        helpers.testGuess("Australia/Darwin", {
            offset: true,
            abbr: true
        });
        helpers.testYear("Australia/Darwin", [["1916-12-31T14:30:59+00:00", "00:00:59", "ACST", -570], ["1916-12-31T14:31:00+00:00", "01:01:00", "ACDT", -630]]);
        helpers.testYear("Australia/Darwin", [["1917-03-24T15:29:59+00:00", "01:59:59", "ACDT", -630], ["1917-03-24T15:30:00+00:00", "01:00:00", "ACST", -570]]);
        helpers.testYear("Australia/Darwin", [["1941-12-31T16:29:59+00:00", "01:59:59", "ACST", -570], ["1941-12-31T16:30:00+00:00", "03:00:00", "ACDT", -630]]);
        helpers.testYear("Australia/Darwin", [["1942-03-28T15:29:59+00:00", "01:59:59", "ACDT", -630], ["1942-03-28T15:30:00+00:00", "01:00:00", "ACST", -570], ["1942-09-26T16:29:59+00:00", "01:59:59", "ACST", -570], ["1942-09-26T16:30:00+00:00", "03:00:00", "ACDT", -630]]);
        helpers.testYear("Australia/Darwin", [["1943-03-27T15:29:59+00:00", "01:59:59", "ACDT", -630], ["1943-03-27T15:30:00+00:00", "01:00:00", "ACST", -570], ["1943-10-02T16:29:59+00:00", "01:59:59", "ACST", -570], ["1943-10-02T16:30:00+00:00", "03:00:00", "ACDT", -630]]);
        helpers.testYear("Australia/Darwin", [["1944-03-25T15:29:59+00:00", "01:59:59", "ACDT", -630], ["1944-03-25T15:30:00+00:00", "01:00:00", "ACST", -570]]);
    });
});
