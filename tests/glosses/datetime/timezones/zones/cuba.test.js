

import * as helpers from "../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Cuba", () => {
        helpers.testYear("Cuba", [["1925-07-19T17:29:35+00:00", "11:59:59", "HMT", 19776 / 60], ["1925-07-19T17:29:36+00:00", "12:29:36", "CST", 300]]);
        helpers.testYear("Cuba", [["1928-06-10T04:59:59+00:00", "23:59:59", "CST", 300], ["1928-06-10T05:00:00+00:00", "01:00:00", "CDT", 240], ["1928-10-10T03:59:59+00:00", "23:59:59", "CDT", 240], ["1928-10-10T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1940-06-02T04:59:59+00:00", "23:59:59", "CST", 300], ["1940-06-02T05:00:00+00:00", "01:00:00", "CDT", 240], ["1940-09-01T03:59:59+00:00", "23:59:59", "CDT", 240], ["1940-09-01T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1941-06-01T04:59:59+00:00", "23:59:59", "CST", 300], ["1941-06-01T05:00:00+00:00", "01:00:00", "CDT", 240], ["1941-09-07T03:59:59+00:00", "23:59:59", "CDT", 240], ["1941-09-07T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1942-06-07T04:59:59+00:00", "23:59:59", "CST", 300], ["1942-06-07T05:00:00+00:00", "01:00:00", "CDT", 240], ["1942-09-06T03:59:59+00:00", "23:59:59", "CDT", 240], ["1942-09-06T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1945-06-03T04:59:59+00:00", "23:59:59", "CST", 300], ["1945-06-03T05:00:00+00:00", "01:00:00", "CDT", 240], ["1945-09-02T03:59:59+00:00", "23:59:59", "CDT", 240], ["1945-09-02T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1946-06-02T04:59:59+00:00", "23:59:59", "CST", 300], ["1946-06-02T05:00:00+00:00", "01:00:00", "CDT", 240], ["1946-09-01T03:59:59+00:00", "23:59:59", "CDT", 240], ["1946-09-01T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1965-06-01T04:59:59+00:00", "23:59:59", "CST", 300], ["1965-06-01T05:00:00+00:00", "01:00:00", "CDT", 240], ["1965-09-30T03:59:59+00:00", "23:59:59", "CDT", 240], ["1965-09-30T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1966-05-29T04:59:59+00:00", "23:59:59", "CST", 300], ["1966-05-29T05:00:00+00:00", "01:00:00", "CDT", 240], ["1966-10-02T03:59:59+00:00", "23:59:59", "CDT", 240], ["1966-10-02T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1967-04-08T04:59:59+00:00", "23:59:59", "CST", 300], ["1967-04-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["1967-09-10T03:59:59+00:00", "23:59:59", "CDT", 240], ["1967-09-10T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1968-04-14T04:59:59+00:00", "23:59:59", "CST", 300], ["1968-04-14T05:00:00+00:00", "01:00:00", "CDT", 240], ["1968-09-08T03:59:59+00:00", "23:59:59", "CDT", 240], ["1968-09-08T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1969-04-27T04:59:59+00:00", "23:59:59", "CST", 300], ["1969-04-27T05:00:00+00:00", "01:00:00", "CDT", 240], ["1969-10-26T03:59:59+00:00", "23:59:59", "CDT", 240], ["1969-10-26T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1970-04-26T04:59:59+00:00", "23:59:59", "CST", 300], ["1970-04-26T05:00:00+00:00", "01:00:00", "CDT", 240], ["1970-10-25T03:59:59+00:00", "23:59:59", "CDT", 240], ["1970-10-25T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1971-04-25T04:59:59+00:00", "23:59:59", "CST", 300], ["1971-04-25T05:00:00+00:00", "01:00:00", "CDT", 240], ["1971-10-31T03:59:59+00:00", "23:59:59", "CDT", 240], ["1971-10-31T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1972-04-30T04:59:59+00:00", "23:59:59", "CST", 300], ["1972-04-30T05:00:00+00:00", "01:00:00", "CDT", 240], ["1972-10-08T03:59:59+00:00", "23:59:59", "CDT", 240], ["1972-10-08T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1973-04-29T04:59:59+00:00", "23:59:59", "CST", 300], ["1973-04-29T05:00:00+00:00", "01:00:00", "CDT", 240], ["1973-10-08T03:59:59+00:00", "23:59:59", "CDT", 240], ["1973-10-08T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1974-04-28T04:59:59+00:00", "23:59:59", "CST", 300], ["1974-04-28T05:00:00+00:00", "01:00:00", "CDT", 240], ["1974-10-08T03:59:59+00:00", "23:59:59", "CDT", 240], ["1974-10-08T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1975-04-27T04:59:59+00:00", "23:59:59", "CST", 300], ["1975-04-27T05:00:00+00:00", "01:00:00", "CDT", 240], ["1975-10-26T03:59:59+00:00", "23:59:59", "CDT", 240], ["1975-10-26T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1976-04-25T04:59:59+00:00", "23:59:59", "CST", 300], ["1976-04-25T05:00:00+00:00", "01:00:00", "CDT", 240], ["1976-10-31T03:59:59+00:00", "23:59:59", "CDT", 240], ["1976-10-31T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1977-04-24T04:59:59+00:00", "23:59:59", "CST", 300], ["1977-04-24T05:00:00+00:00", "01:00:00", "CDT", 240], ["1977-10-30T03:59:59+00:00", "23:59:59", "CDT", 240], ["1977-10-30T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1978-05-07T04:59:59+00:00", "23:59:59", "CST", 300], ["1978-05-07T05:00:00+00:00", "01:00:00", "CDT", 240], ["1978-10-08T03:59:59+00:00", "23:59:59", "CDT", 240], ["1978-10-08T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1979-03-18T04:59:59+00:00", "23:59:59", "CST", 300], ["1979-03-18T05:00:00+00:00", "01:00:00", "CDT", 240], ["1979-10-14T03:59:59+00:00", "23:59:59", "CDT", 240], ["1979-10-14T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1980-03-16T04:59:59+00:00", "23:59:59", "CST", 300], ["1980-03-16T05:00:00+00:00", "01:00:00", "CDT", 240], ["1980-10-12T03:59:59+00:00", "23:59:59", "CDT", 240], ["1980-10-12T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1981-05-10T04:59:59+00:00", "23:59:59", "CST", 300], ["1981-05-10T05:00:00+00:00", "01:00:00", "CDT", 240], ["1981-10-11T03:59:59+00:00", "23:59:59", "CDT", 240], ["1981-10-11T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1982-05-09T04:59:59+00:00", "23:59:59", "CST", 300], ["1982-05-09T05:00:00+00:00", "01:00:00", "CDT", 240], ["1982-10-10T03:59:59+00:00", "23:59:59", "CDT", 240], ["1982-10-10T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1983-05-08T04:59:59+00:00", "23:59:59", "CST", 300], ["1983-05-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["1983-10-09T03:59:59+00:00", "23:59:59", "CDT", 240], ["1983-10-09T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1984-05-06T04:59:59+00:00", "23:59:59", "CST", 300], ["1984-05-06T05:00:00+00:00", "01:00:00", "CDT", 240], ["1984-10-14T03:59:59+00:00", "23:59:59", "CDT", 240], ["1984-10-14T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1985-05-05T04:59:59+00:00", "23:59:59", "CST", 300], ["1985-05-05T05:00:00+00:00", "01:00:00", "CDT", 240], ["1985-10-13T03:59:59+00:00", "23:59:59", "CDT", 240], ["1985-10-13T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1986-03-16T04:59:59+00:00", "23:59:59", "CST", 300], ["1986-03-16T05:00:00+00:00", "01:00:00", "CDT", 240], ["1986-10-12T03:59:59+00:00", "23:59:59", "CDT", 240], ["1986-10-12T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1987-03-15T04:59:59+00:00", "23:59:59", "CST", 300], ["1987-03-15T05:00:00+00:00", "01:00:00", "CDT", 240], ["1987-10-11T03:59:59+00:00", "23:59:59", "CDT", 240], ["1987-10-11T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1988-03-20T04:59:59+00:00", "23:59:59", "CST", 300], ["1988-03-20T05:00:00+00:00", "01:00:00", "CDT", 240], ["1988-10-09T03:59:59+00:00", "23:59:59", "CDT", 240], ["1988-10-09T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1989-03-19T04:59:59+00:00", "23:59:59", "CST", 300], ["1989-03-19T05:00:00+00:00", "01:00:00", "CDT", 240], ["1989-10-08T03:59:59+00:00", "23:59:59", "CDT", 240], ["1989-10-08T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1990-04-01T04:59:59+00:00", "23:59:59", "CST", 300], ["1990-04-01T05:00:00+00:00", "01:00:00", "CDT", 240], ["1990-10-14T03:59:59+00:00", "23:59:59", "CDT", 240], ["1990-10-14T04:00:00+00:00", "23:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1991-04-07T04:59:59+00:00", "23:59:59", "CST", 300], ["1991-04-07T05:00:00+00:00", "01:00:00", "CDT", 240], ["1991-10-13T04:59:59+00:00", "00:59:59", "CDT", 240], ["1991-10-13T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1992-04-05T04:59:59+00:00", "23:59:59", "CST", 300], ["1992-04-05T05:00:00+00:00", "01:00:00", "CDT", 240], ["1992-10-11T04:59:59+00:00", "00:59:59", "CDT", 240], ["1992-10-11T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1993-04-04T04:59:59+00:00", "23:59:59", "CST", 300], ["1993-04-04T05:00:00+00:00", "01:00:00", "CDT", 240], ["1993-10-10T04:59:59+00:00", "00:59:59", "CDT", 240], ["1993-10-10T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1994-04-03T04:59:59+00:00", "23:59:59", "CST", 300], ["1994-04-03T05:00:00+00:00", "01:00:00", "CDT", 240], ["1994-10-09T04:59:59+00:00", "00:59:59", "CDT", 240], ["1994-10-09T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1995-04-02T04:59:59+00:00", "23:59:59", "CST", 300], ["1995-04-02T05:00:00+00:00", "01:00:00", "CDT", 240], ["1995-10-08T04:59:59+00:00", "00:59:59", "CDT", 240], ["1995-10-08T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1996-04-07T04:59:59+00:00", "23:59:59", "CST", 300], ["1996-04-07T05:00:00+00:00", "01:00:00", "CDT", 240], ["1996-10-06T04:59:59+00:00", "00:59:59", "CDT", 240], ["1996-10-06T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1997-04-06T04:59:59+00:00", "23:59:59", "CST", 300], ["1997-04-06T05:00:00+00:00", "01:00:00", "CDT", 240], ["1997-10-12T04:59:59+00:00", "00:59:59", "CDT", 240], ["1997-10-12T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1998-03-29T04:59:59+00:00", "23:59:59", "CST", 300], ["1998-03-29T05:00:00+00:00", "01:00:00", "CDT", 240], ["1998-10-25T04:59:59+00:00", "00:59:59", "CDT", 240], ["1998-10-25T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["1999-03-28T04:59:59+00:00", "23:59:59", "CST", 300], ["1999-03-28T05:00:00+00:00", "01:00:00", "CDT", 240], ["1999-10-31T04:59:59+00:00", "00:59:59", "CDT", 240], ["1999-10-31T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2000-04-02T04:59:59+00:00", "23:59:59", "CST", 300], ["2000-04-02T05:00:00+00:00", "01:00:00", "CDT", 240], ["2000-10-29T04:59:59+00:00", "00:59:59", "CDT", 240], ["2000-10-29T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2001-04-01T04:59:59+00:00", "23:59:59", "CST", 300], ["2001-04-01T05:00:00+00:00", "01:00:00", "CDT", 240], ["2001-10-28T04:59:59+00:00", "00:59:59", "CDT", 240], ["2001-10-28T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2002-04-07T04:59:59+00:00", "23:59:59", "CST", 300], ["2002-04-07T05:00:00+00:00", "01:00:00", "CDT", 240], ["2002-10-27T04:59:59+00:00", "00:59:59", "CDT", 240], ["2002-10-27T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2003-04-06T04:59:59+00:00", "23:59:59", "CST", 300], ["2003-04-06T05:00:00+00:00", "01:00:00", "CDT", 240], ["2003-10-26T04:59:59+00:00", "00:59:59", "CDT", 240], ["2003-10-26T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2004-03-28T04:59:59+00:00", "23:59:59", "CST", 300], ["2004-03-28T05:00:00+00:00", "01:00:00", "CDT", 240]]);
        helpers.testYear("Cuba", [["2006-10-29T04:59:59+00:00", "00:59:59", "CDT", 240], ["2006-10-29T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2007-03-11T04:59:59+00:00", "23:59:59", "CST", 300], ["2007-03-11T05:00:00+00:00", "01:00:00", "CDT", 240], ["2007-10-28T04:59:59+00:00", "00:59:59", "CDT", 240], ["2007-10-28T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2008-03-16T04:59:59+00:00", "23:59:59", "CST", 300], ["2008-03-16T05:00:00+00:00", "01:00:00", "CDT", 240], ["2008-10-26T04:59:59+00:00", "00:59:59", "CDT", 240], ["2008-10-26T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2009-03-08T04:59:59+00:00", "23:59:59", "CST", 300], ["2009-03-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["2009-10-25T04:59:59+00:00", "00:59:59", "CDT", 240], ["2009-10-25T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2010-03-14T04:59:59+00:00", "23:59:59", "CST", 300], ["2010-03-14T05:00:00+00:00", "01:00:00", "CDT", 240], ["2010-10-31T04:59:59+00:00", "00:59:59", "CDT", 240], ["2010-10-31T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2011-03-20T04:59:59+00:00", "23:59:59", "CST", 300], ["2011-03-20T05:00:00+00:00", "01:00:00", "CDT", 240], ["2011-11-13T04:59:59+00:00", "00:59:59", "CDT", 240], ["2011-11-13T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2012-04-01T04:59:59+00:00", "23:59:59", "CST", 300], ["2012-04-01T05:00:00+00:00", "01:00:00", "CDT", 240], ["2012-11-04T04:59:59+00:00", "00:59:59", "CDT", 240], ["2012-11-04T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2013-03-10T04:59:59+00:00", "23:59:59", "CST", 300], ["2013-03-10T05:00:00+00:00", "01:00:00", "CDT", 240], ["2013-11-03T04:59:59+00:00", "00:59:59", "CDT", 240], ["2013-11-03T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2014-03-09T04:59:59+00:00", "23:59:59", "CST", 300], ["2014-03-09T05:00:00+00:00", "01:00:00", "CDT", 240], ["2014-11-02T04:59:59+00:00", "00:59:59", "CDT", 240], ["2014-11-02T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2015-03-08T04:59:59+00:00", "23:59:59", "CST", 300], ["2015-03-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["2015-11-01T04:59:59+00:00", "00:59:59", "CDT", 240], ["2015-11-01T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2016-03-13T04:59:59+00:00", "23:59:59", "CST", 300], ["2016-03-13T05:00:00+00:00", "01:00:00", "CDT", 240], ["2016-11-06T04:59:59+00:00", "00:59:59", "CDT", 240], ["2016-11-06T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2017-03-12T04:59:59+00:00", "23:59:59", "CST", 300], ["2017-03-12T05:00:00+00:00", "01:00:00", "CDT", 240], ["2017-11-05T04:59:59+00:00", "00:59:59", "CDT", 240], ["2017-11-05T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2018-03-11T04:59:59+00:00", "23:59:59", "CST", 300], ["2018-03-11T05:00:00+00:00", "01:00:00", "CDT", 240], ["2018-11-04T04:59:59+00:00", "00:59:59", "CDT", 240], ["2018-11-04T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2019-03-10T04:59:59+00:00", "23:59:59", "CST", 300], ["2019-03-10T05:00:00+00:00", "01:00:00", "CDT", 240], ["2019-11-03T04:59:59+00:00", "00:59:59", "CDT", 240], ["2019-11-03T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2020-03-08T04:59:59+00:00", "23:59:59", "CST", 300], ["2020-03-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["2020-11-01T04:59:59+00:00", "00:59:59", "CDT", 240], ["2020-11-01T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2021-03-14T04:59:59+00:00", "23:59:59", "CST", 300], ["2021-03-14T05:00:00+00:00", "01:00:00", "CDT", 240], ["2021-11-07T04:59:59+00:00", "00:59:59", "CDT", 240], ["2021-11-07T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2022-03-13T04:59:59+00:00", "23:59:59", "CST", 300], ["2022-03-13T05:00:00+00:00", "01:00:00", "CDT", 240], ["2022-11-06T04:59:59+00:00", "00:59:59", "CDT", 240], ["2022-11-06T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2023-03-12T04:59:59+00:00", "23:59:59", "CST", 300], ["2023-03-12T05:00:00+00:00", "01:00:00", "CDT", 240], ["2023-11-05T04:59:59+00:00", "00:59:59", "CDT", 240], ["2023-11-05T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2024-03-10T04:59:59+00:00", "23:59:59", "CST", 300], ["2024-03-10T05:00:00+00:00", "01:00:00", "CDT", 240], ["2024-11-03T04:59:59+00:00", "00:59:59", "CDT", 240], ["2024-11-03T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2025-03-09T04:59:59+00:00", "23:59:59", "CST", 300], ["2025-03-09T05:00:00+00:00", "01:00:00", "CDT", 240], ["2025-11-02T04:59:59+00:00", "00:59:59", "CDT", 240], ["2025-11-02T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2026-03-08T04:59:59+00:00", "23:59:59", "CST", 300], ["2026-03-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["2026-11-01T04:59:59+00:00", "00:59:59", "CDT", 240], ["2026-11-01T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2027-03-14T04:59:59+00:00", "23:59:59", "CST", 300], ["2027-03-14T05:00:00+00:00", "01:00:00", "CDT", 240], ["2027-11-07T04:59:59+00:00", "00:59:59", "CDT", 240], ["2027-11-07T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2028-03-12T04:59:59+00:00", "23:59:59", "CST", 300], ["2028-03-12T05:00:00+00:00", "01:00:00", "CDT", 240], ["2028-11-05T04:59:59+00:00", "00:59:59", "CDT", 240], ["2028-11-05T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2029-03-11T04:59:59+00:00", "23:59:59", "CST", 300], ["2029-03-11T05:00:00+00:00", "01:00:00", "CDT", 240], ["2029-11-04T04:59:59+00:00", "00:59:59", "CDT", 240], ["2029-11-04T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2030-03-10T04:59:59+00:00", "23:59:59", "CST", 300], ["2030-03-10T05:00:00+00:00", "01:00:00", "CDT", 240], ["2030-11-03T04:59:59+00:00", "00:59:59", "CDT", 240], ["2030-11-03T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2031-03-09T04:59:59+00:00", "23:59:59", "CST", 300], ["2031-03-09T05:00:00+00:00", "01:00:00", "CDT", 240], ["2031-11-02T04:59:59+00:00", "00:59:59", "CDT", 240], ["2031-11-02T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2032-03-14T04:59:59+00:00", "23:59:59", "CST", 300], ["2032-03-14T05:00:00+00:00", "01:00:00", "CDT", 240], ["2032-11-07T04:59:59+00:00", "00:59:59", "CDT", 240], ["2032-11-07T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2033-03-13T04:59:59+00:00", "23:59:59", "CST", 300], ["2033-03-13T05:00:00+00:00", "01:00:00", "CDT", 240], ["2033-11-06T04:59:59+00:00", "00:59:59", "CDT", 240], ["2033-11-06T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2034-03-12T04:59:59+00:00", "23:59:59", "CST", 300], ["2034-03-12T05:00:00+00:00", "01:00:00", "CDT", 240], ["2034-11-05T04:59:59+00:00", "00:59:59", "CDT", 240], ["2034-11-05T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2035-03-11T04:59:59+00:00", "23:59:59", "CST", 300], ["2035-03-11T05:00:00+00:00", "01:00:00", "CDT", 240], ["2035-11-04T04:59:59+00:00", "00:59:59", "CDT", 240], ["2035-11-04T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2036-03-09T04:59:59+00:00", "23:59:59", "CST", 300], ["2036-03-09T05:00:00+00:00", "01:00:00", "CDT", 240], ["2036-11-02T04:59:59+00:00", "00:59:59", "CDT", 240], ["2036-11-02T05:00:00+00:00", "00:00:00", "CST", 300]]);
        helpers.testYear("Cuba", [["2037-03-08T04:59:59+00:00", "23:59:59", "CST", 300], ["2037-03-08T05:00:00+00:00", "01:00:00", "CDT", 240], ["2037-11-01T04:59:59+00:00", "00:59:59", "CDT", 240], ["2037-11-01T05:00:00+00:00", "00:00:00", "CST", 300]]);
    });
});
