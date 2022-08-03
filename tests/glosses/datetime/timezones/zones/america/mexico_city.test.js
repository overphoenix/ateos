

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Mexico_City", () => {
        helpers.testGuess("America/Mexico_City", {
            offset: true,
            abbr: true
        });
        helpers.testYear("America/Mexico_City", [["1922-01-01T06:59:59+00:00", "00:23:23", "LMT", 23796 / 60], ["1922-01-01T07:00:00+00:00", "00:00:00", "MST", 420]]);
        helpers.testYear("America/Mexico_City", [["1927-06-11T05:59:59+00:00", "22:59:59", "MST", 420], ["1927-06-11T06:00:00+00:00", "00:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1930-11-15T05:59:59+00:00", "23:59:59", "CST", 360], ["1930-11-15T06:00:00+00:00", "23:00:00", "MST", 420]]);
        helpers.testYear("America/Mexico_City", [["1931-05-02T05:59:59+00:00", "22:59:59", "MST", 420], ["1931-05-02T06:00:00+00:00", "00:00:00", "CST", 360], ["1931-10-01T05:59:59+00:00", "23:59:59", "CST", 360], ["1931-10-01T06:00:00+00:00", "23:00:00", "MST", 420]]);
        helpers.testYear("America/Mexico_City", [["1932-04-01T06:59:59+00:00", "23:59:59", "MST", 420], ["1932-04-01T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1939-02-05T05:59:59+00:00", "23:59:59", "CST", 360], ["1939-02-05T06:00:00+00:00", "01:00:00", "CDT", 300], ["1939-06-25T04:59:59+00:00", "23:59:59", "CDT", 300], ["1939-06-25T05:00:00+00:00", "23:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1940-12-09T05:59:59+00:00", "23:59:59", "CST", 360], ["1940-12-09T06:00:00+00:00", "01:00:00", "CDT", 300]]);
        helpers.testYear("America/Mexico_City", [["1941-04-01T04:59:59+00:00", "23:59:59", "CDT", 300], ["1941-04-01T05:00:00+00:00", "23:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1943-12-16T05:59:59+00:00", "23:59:59", "CST", 360], ["1943-12-16T06:00:00+00:00", "01:00:00", "CWT", 300]]);
        helpers.testYear("America/Mexico_City", [["1944-05-01T04:59:59+00:00", "23:59:59", "CWT", 300], ["1944-05-01T05:00:00+00:00", "23:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1950-02-12T05:59:59+00:00", "23:59:59", "CST", 360], ["1950-02-12T06:00:00+00:00", "01:00:00", "CDT", 300], ["1950-07-30T04:59:59+00:00", "23:59:59", "CDT", 300], ["1950-07-30T05:00:00+00:00", "23:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1996-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["1996-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["1996-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1996-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1997-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["1997-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["1997-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1997-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1998-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["1998-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["1998-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["1998-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["1999-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["1999-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["1999-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["1999-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2000-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2000-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2000-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2000-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2001-05-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2001-05-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2001-09-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["2001-09-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2002-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["2002-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["2002-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["2002-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2003-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2003-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2003-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["2003-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2004-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["2004-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["2004-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["2004-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2005-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["2005-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["2005-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["2005-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2006-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2006-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2006-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2006-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2007-04-01T07:59:59+00:00", "01:59:59", "CST", 360], ["2007-04-01T08:00:00+00:00", "03:00:00", "CDT", 300], ["2007-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["2007-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2008-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2008-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2008-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["2008-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2009-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["2009-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["2009-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["2009-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2010-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["2010-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["2010-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["2010-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2011-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["2011-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["2011-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["2011-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2012-04-01T07:59:59+00:00", "01:59:59", "CST", 360], ["2012-04-01T08:00:00+00:00", "03:00:00", "CDT", 300], ["2012-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["2012-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2013-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["2013-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["2013-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["2013-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2014-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2014-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2014-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["2014-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2015-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["2015-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["2015-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["2015-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2016-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["2016-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["2016-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["2016-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2017-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2017-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2017-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2017-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2018-04-01T07:59:59+00:00", "01:59:59", "CST", 360], ["2018-04-01T08:00:00+00:00", "03:00:00", "CDT", 300], ["2018-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["2018-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2019-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["2019-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["2019-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["2019-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2020-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["2020-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["2020-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["2020-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2021-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["2021-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["2021-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["2021-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2022-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["2022-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["2022-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["2022-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2023-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2023-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2023-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2023-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2024-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["2024-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["2024-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["2024-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2025-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2025-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2025-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["2025-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2026-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["2026-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["2026-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["2026-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2027-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["2027-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["2027-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["2027-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2028-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2028-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2028-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2028-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2029-04-01T07:59:59+00:00", "01:59:59", "CST", 360], ["2029-04-01T08:00:00+00:00", "03:00:00", "CDT", 300], ["2029-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["2029-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2030-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["2030-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["2030-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["2030-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2031-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2031-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2031-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["2031-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2032-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["2032-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["2032-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["2032-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2033-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["2033-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["2033-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["2033-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2034-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2034-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2034-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2034-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2035-04-01T07:59:59+00:00", "01:59:59", "CST", 360], ["2035-04-01T08:00:00+00:00", "03:00:00", "CDT", 300], ["2035-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["2035-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2036-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["2036-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["2036-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["2036-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Mexico_City", [["2037-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["2037-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["2037-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["2037-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
    });
});
