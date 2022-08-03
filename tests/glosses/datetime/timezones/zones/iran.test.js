

import * as helpers from "../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Iran", () => {
        helpers.testYear("Iran", [["1915-12-31T20:34:15+00:00", "23:59:59", "LMT", -12344 / 60], ["1915-12-31T20:34:16+00:00", "00:00:00", "TMT", -12344 / 60]]);
        helpers.testYear("Iran", [["1945-12-31T20:34:15+00:00", "23:59:59", "TMT", -12344 / 60], ["1945-12-31T20:34:16+00:00", "00:04:16", "+0330", -210]]);
        helpers.testYear("Iran", [["1977-10-31T20:29:59+00:00", "23:59:59", "+0330", -210], ["1977-10-31T20:30:00+00:00", "00:30:00", "+04", -240]]);
        helpers.testYear("Iran", [["1978-03-20T19:59:59+00:00", "23:59:59", "+04", -240], ["1978-03-20T20:00:00+00:00", "01:00:00", "+05", -300], ["1978-10-20T18:59:59+00:00", "23:59:59", "+05", -300], ["1978-10-20T19:00:00+00:00", "23:00:00", "+04", -240], ["1978-12-31T19:59:59+00:00", "23:59:59", "+04", -240], ["1978-12-31T20:00:00+00:00", "23:30:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1979-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["1979-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["1979-09-18T19:29:59+00:00", "23:59:59", "+0430", -270], ["1979-09-18T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1980-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["1980-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["1980-09-22T19:29:59+00:00", "23:59:59", "+0430", -270], ["1980-09-22T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1991-05-02T20:29:59+00:00", "23:59:59", "+0330", -210], ["1991-05-02T20:30:00+00:00", "01:00:00", "+0430", -270], ["1991-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1991-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1992-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1992-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1992-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1992-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1993-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1993-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1993-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1993-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1994-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1994-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1994-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1994-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1995-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1995-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1995-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1995-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1996-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["1996-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["1996-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["1996-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1997-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1997-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1997-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1997-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1998-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1998-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1998-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1998-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["1999-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["1999-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["1999-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["1999-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2000-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2000-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2000-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2000-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2001-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2001-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2001-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2001-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2002-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2002-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2002-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2002-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2003-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2003-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2003-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2003-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2004-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2004-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2004-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2004-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2005-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2005-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2005-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2005-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2008-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2008-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2008-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2008-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2009-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2009-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2009-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2009-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2010-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2010-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2010-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2010-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2011-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2011-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2011-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2011-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2012-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2012-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2012-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2012-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2013-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2013-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2013-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2013-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2014-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2014-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2014-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2014-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2015-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2015-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2015-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2015-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2016-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2016-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2016-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2016-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2017-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2017-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2017-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2017-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2018-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2018-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2018-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2018-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2019-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2019-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2019-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2019-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2020-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2020-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2020-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2020-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2021-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2021-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2021-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2021-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2022-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2022-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2022-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2022-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2023-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2023-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2023-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2023-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2024-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2024-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2024-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2024-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2025-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2025-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2025-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2025-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2026-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2026-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2026-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2026-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2027-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2027-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2027-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2027-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2028-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2028-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2028-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2028-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2029-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2029-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2029-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2029-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2030-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2030-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2030-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2030-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2031-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2031-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2031-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2031-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2032-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2032-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2032-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2032-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2033-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2033-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2033-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2033-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2034-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2034-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2034-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2034-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2035-03-21T20:29:59+00:00", "23:59:59", "+0330", -210], ["2035-03-21T20:30:00+00:00", "01:00:00", "+0430", -270], ["2035-09-21T19:29:59+00:00", "23:59:59", "+0430", -270], ["2035-09-21T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2036-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2036-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2036-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2036-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
        helpers.testYear("Iran", [["2037-03-20T20:29:59+00:00", "23:59:59", "+0330", -210], ["2037-03-20T20:30:00+00:00", "01:00:00", "+0430", -270], ["2037-09-20T19:29:59+00:00", "23:59:59", "+0430", -270], ["2037-09-20T19:30:00+00:00", "23:00:00", "+0330", -210]]);
    });
});
