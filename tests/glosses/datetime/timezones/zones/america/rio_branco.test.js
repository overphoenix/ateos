

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Rio_Branco", () => {
        helpers.testYear("America/Rio_Branco", [["1914-01-01T04:31:11+00:00", "23:59:59", "LMT", 16272 / 60], ["1914-01-01T04:31:12+00:00", "23:31:12", "-05", 300]]);
        helpers.testYear("America/Rio_Branco", [["1931-10-03T15:59:59+00:00", "10:59:59", "-05", 300], ["1931-10-03T16:00:00+00:00", "12:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1932-04-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1932-04-01T04:00:00+00:00", "23:00:00", "-05", 300], ["1932-10-03T04:59:59+00:00", "23:59:59", "-05", 300], ["1932-10-03T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1933-04-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1933-04-01T04:00:00+00:00", "23:00:00", "-05", 300]]);
        helpers.testYear("America/Rio_Branco", [["1949-12-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1949-12-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1950-04-16T04:59:59+00:00", "00:59:59", "-04", 240], ["1950-04-16T05:00:00+00:00", "00:00:00", "-05", 300], ["1950-12-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1950-12-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1951-04-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1951-04-01T04:00:00+00:00", "23:00:00", "-05", 300], ["1951-12-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1951-12-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1952-04-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1952-04-01T04:00:00+00:00", "23:00:00", "-05", 300], ["1952-12-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1952-12-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1953-03-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1953-03-01T04:00:00+00:00", "23:00:00", "-05", 300]]);
        helpers.testYear("America/Rio_Branco", [["1963-12-09T04:59:59+00:00", "23:59:59", "-05", 300], ["1963-12-09T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1964-03-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1964-03-01T04:00:00+00:00", "23:00:00", "-05", 300]]);
        helpers.testYear("America/Rio_Branco", [["1965-01-31T04:59:59+00:00", "23:59:59", "-05", 300], ["1965-01-31T05:00:00+00:00", "01:00:00", "-04", 240], ["1965-03-31T03:59:59+00:00", "23:59:59", "-04", 240], ["1965-03-31T04:00:00+00:00", "23:00:00", "-05", 300], ["1965-12-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1965-12-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1966-03-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1966-03-01T04:00:00+00:00", "23:00:00", "-05", 300], ["1966-11-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1966-11-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1967-03-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1967-03-01T04:00:00+00:00", "23:00:00", "-05", 300], ["1967-11-01T04:59:59+00:00", "23:59:59", "-05", 300], ["1967-11-01T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1968-03-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1968-03-01T04:00:00+00:00", "23:00:00", "-05", 300]]);
        helpers.testYear("America/Rio_Branco", [["1985-11-02T04:59:59+00:00", "23:59:59", "-05", 300], ["1985-11-02T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1986-03-15T03:59:59+00:00", "23:59:59", "-04", 240], ["1986-03-15T04:00:00+00:00", "23:00:00", "-05", 300], ["1986-10-25T04:59:59+00:00", "23:59:59", "-05", 300], ["1986-10-25T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1987-02-14T03:59:59+00:00", "23:59:59", "-04", 240], ["1987-02-14T04:00:00+00:00", "23:00:00", "-05", 300], ["1987-10-25T04:59:59+00:00", "23:59:59", "-05", 300], ["1987-10-25T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["1988-02-07T03:59:59+00:00", "23:59:59", "-04", 240], ["1988-02-07T04:00:00+00:00", "23:00:00", "-05", 300]]);
        helpers.testYear("America/Rio_Branco", [["2008-06-24T04:59:59+00:00", "23:59:59", "-05", 300], ["2008-06-24T05:00:00+00:00", "01:00:00", "-04", 240]]);
        helpers.testYear("America/Rio_Branco", [["2013-11-10T03:59:59+00:00", "23:59:59", "-04", 240], ["2013-11-10T04:00:00+00:00", "23:00:00", "-05", 300]]);
    });
});
