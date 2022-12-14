

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Barbados", () => {
        helpers.testYear("America/Barbados", [["1924-01-01T03:58:28+00:00", "23:59:59", "LMT", 14309 / 60], ["1924-01-01T03:58:29+00:00", "00:00:00", "BMT", 14309 / 60]]);
        helpers.testYear("America/Barbados", [["1932-01-01T03:58:28+00:00", "23:59:59", "BMT", 14309 / 60], ["1932-01-01T03:58:29+00:00", "23:58:29", "AST", 240]]);
        helpers.testYear("America/Barbados", [["1977-06-12T05:59:59+00:00", "01:59:59", "AST", 240], ["1977-06-12T06:00:00+00:00", "03:00:00", "ADT", 180], ["1977-10-02T04:59:59+00:00", "01:59:59", "ADT", 180], ["1977-10-02T05:00:00+00:00", "01:00:00", "AST", 240]]);
        helpers.testYear("America/Barbados", [["1978-04-16T05:59:59+00:00", "01:59:59", "AST", 240], ["1978-04-16T06:00:00+00:00", "03:00:00", "ADT", 180], ["1978-10-01T04:59:59+00:00", "01:59:59", "ADT", 180], ["1978-10-01T05:00:00+00:00", "01:00:00", "AST", 240]]);
        helpers.testYear("America/Barbados", [["1979-04-15T05:59:59+00:00", "01:59:59", "AST", 240], ["1979-04-15T06:00:00+00:00", "03:00:00", "ADT", 180], ["1979-09-30T04:59:59+00:00", "01:59:59", "ADT", 180], ["1979-09-30T05:00:00+00:00", "01:00:00", "AST", 240]]);
        helpers.testYear("America/Barbados", [["1980-04-20T05:59:59+00:00", "01:59:59", "AST", 240], ["1980-04-20T06:00:00+00:00", "03:00:00", "ADT", 180], ["1980-09-25T04:59:59+00:00", "01:59:59", "ADT", 180], ["1980-09-25T05:00:00+00:00", "01:00:00", "AST", 240]]);
    });
});
