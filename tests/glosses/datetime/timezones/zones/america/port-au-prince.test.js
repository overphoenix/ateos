

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Port-au-Prince", () => {
        helpers.testYear("America/Port-au-Prince", [["1917-01-24T16:48:59+00:00", "11:59:59", "PPMT", 289], ["1917-01-24T16:49:00+00:00", "11:49:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1983-05-08T04:59:59+00:00", "23:59:59", "EST", 300], ["1983-05-08T05:00:00+00:00", "01:00:00", "EDT", 240], ["1983-10-30T03:59:59+00:00", "23:59:59", "EDT", 240], ["1983-10-30T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1984-04-29T04:59:59+00:00", "23:59:59", "EST", 300], ["1984-04-29T05:00:00+00:00", "01:00:00", "EDT", 240], ["1984-10-28T03:59:59+00:00", "23:59:59", "EDT", 240], ["1984-10-28T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1985-04-28T04:59:59+00:00", "23:59:59", "EST", 300], ["1985-04-28T05:00:00+00:00", "01:00:00", "EDT", 240], ["1985-10-27T03:59:59+00:00", "23:59:59", "EDT", 240], ["1985-10-27T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1986-04-27T04:59:59+00:00", "23:59:59", "EST", 300], ["1986-04-27T05:00:00+00:00", "01:00:00", "EDT", 240], ["1986-10-26T03:59:59+00:00", "23:59:59", "EDT", 240], ["1986-10-26T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1987-04-26T04:59:59+00:00", "23:59:59", "EST", 300], ["1987-04-26T05:00:00+00:00", "01:00:00", "EDT", 240], ["1987-10-25T03:59:59+00:00", "23:59:59", "EDT", 240], ["1987-10-25T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1988-04-03T05:59:59+00:00", "00:59:59", "EST", 300], ["1988-04-03T06:00:00+00:00", "02:00:00", "EDT", 240], ["1988-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1988-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1989-04-02T05:59:59+00:00", "00:59:59", "EST", 300], ["1989-04-02T06:00:00+00:00", "02:00:00", "EDT", 240], ["1989-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1989-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1990-04-01T05:59:59+00:00", "00:59:59", "EST", 300], ["1990-04-01T06:00:00+00:00", "02:00:00", "EDT", 240], ["1990-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1990-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1991-04-07T05:59:59+00:00", "00:59:59", "EST", 300], ["1991-04-07T06:00:00+00:00", "02:00:00", "EDT", 240], ["1991-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1991-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1992-04-05T05:59:59+00:00", "00:59:59", "EST", 300], ["1992-04-05T06:00:00+00:00", "02:00:00", "EDT", 240], ["1992-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1992-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1993-04-04T05:59:59+00:00", "00:59:59", "EST", 300], ["1993-04-04T06:00:00+00:00", "02:00:00", "EDT", 240], ["1993-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1993-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1994-04-03T05:59:59+00:00", "00:59:59", "EST", 300], ["1994-04-03T06:00:00+00:00", "02:00:00", "EDT", 240], ["1994-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1994-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1995-04-02T05:59:59+00:00", "00:59:59", "EST", 300], ["1995-04-02T06:00:00+00:00", "02:00:00", "EDT", 240], ["1995-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1995-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1996-04-07T05:59:59+00:00", "00:59:59", "EST", 300], ["1996-04-07T06:00:00+00:00", "02:00:00", "EDT", 240], ["1996-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1996-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["1997-04-06T05:59:59+00:00", "00:59:59", "EST", 300], ["1997-04-06T06:00:00+00:00", "02:00:00", "EDT", 240], ["1997-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1997-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2005-04-03T04:59:59+00:00", "23:59:59", "EST", 300], ["2005-04-03T05:00:00+00:00", "01:00:00", "EDT", 240], ["2005-10-30T03:59:59+00:00", "23:59:59", "EDT", 240], ["2005-10-30T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2006-04-02T04:59:59+00:00", "23:59:59", "EST", 300], ["2006-04-02T05:00:00+00:00", "01:00:00", "EDT", 240], ["2006-10-29T03:59:59+00:00", "23:59:59", "EDT", 240], ["2006-10-29T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2012-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2012-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2012-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2012-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2013-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2013-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2013-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2013-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2014-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2014-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2014-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2014-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2015-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2015-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2015-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2015-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2017-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2017-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2017-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2017-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2018-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2018-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2018-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2018-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2019-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2019-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2019-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2019-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2020-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2020-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2020-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2020-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2021-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2021-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2021-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2021-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2022-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2022-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2022-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2022-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2023-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2023-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2023-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2023-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2024-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2024-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2024-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2024-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2025-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2025-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2025-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2025-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2026-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2026-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2026-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2026-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2027-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2027-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2027-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2027-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2028-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2028-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2028-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2028-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2029-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2029-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2029-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2029-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2030-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2030-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2030-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2030-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2031-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2031-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2031-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2031-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2032-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2032-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2032-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2032-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2033-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2033-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2033-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2033-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2034-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2034-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2034-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2034-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2035-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2035-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2035-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2035-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2036-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2036-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2036-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2036-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Port-au-Prince", [["2037-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2037-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2037-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2037-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
    });
});
