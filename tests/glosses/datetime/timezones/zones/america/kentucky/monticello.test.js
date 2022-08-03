

import * as helpers from "../../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Kentucky/Monticello", () => {
        helpers.testYear("America/Kentucky/Monticello", [["1918-03-31T07:59:59+00:00", "01:59:59", "CST", 360], ["1918-03-31T08:00:00+00:00", "03:00:00", "CDT", 300], ["1918-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1918-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1919-03-30T07:59:59+00:00", "01:59:59", "CST", 360], ["1919-03-30T08:00:00+00:00", "03:00:00", "CDT", 300], ["1919-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1919-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1942-02-09T07:59:59+00:00", "01:59:59", "CST", 360], ["1942-02-09T08:00:00+00:00", "03:00:00", "CWT", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["1945-08-14T22:59:59+00:00", "17:59:59", "CWT", 300], ["1945-08-14T23:00:00+00:00", "18:00:00", "CPT", 300], ["1945-09-30T06:59:59+00:00", "01:59:59", "CPT", 300], ["1945-09-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1968-04-28T07:59:59+00:00", "01:59:59", "CST", 360], ["1968-04-28T08:00:00+00:00", "03:00:00", "CDT", 300], ["1968-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1968-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1969-04-27T07:59:59+00:00", "01:59:59", "CST", 360], ["1969-04-27T08:00:00+00:00", "03:00:00", "CDT", 300], ["1969-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1969-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1970-04-26T07:59:59+00:00", "01:59:59", "CST", 360], ["1970-04-26T08:00:00+00:00", "03:00:00", "CDT", 300], ["1970-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["1970-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1971-04-25T07:59:59+00:00", "01:59:59", "CST", 360], ["1971-04-25T08:00:00+00:00", "03:00:00", "CDT", 300], ["1971-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["1971-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1972-04-30T07:59:59+00:00", "01:59:59", "CST", 360], ["1972-04-30T08:00:00+00:00", "03:00:00", "CDT", 300], ["1972-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["1972-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1973-04-29T07:59:59+00:00", "01:59:59", "CST", 360], ["1973-04-29T08:00:00+00:00", "03:00:00", "CDT", 300], ["1973-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["1973-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1974-01-06T07:59:59+00:00", "01:59:59", "CST", 360], ["1974-01-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["1974-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1974-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1975-02-23T07:59:59+00:00", "01:59:59", "CST", 360], ["1975-02-23T08:00:00+00:00", "03:00:00", "CDT", 300], ["1975-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1975-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1976-04-25T07:59:59+00:00", "01:59:59", "CST", 360], ["1976-04-25T08:00:00+00:00", "03:00:00", "CDT", 300], ["1976-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["1976-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1977-04-24T07:59:59+00:00", "01:59:59", "CST", 360], ["1977-04-24T08:00:00+00:00", "03:00:00", "CDT", 300], ["1977-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["1977-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1978-04-30T07:59:59+00:00", "01:59:59", "CST", 360], ["1978-04-30T08:00:00+00:00", "03:00:00", "CDT", 300], ["1978-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["1978-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1979-04-29T07:59:59+00:00", "01:59:59", "CST", 360], ["1979-04-29T08:00:00+00:00", "03:00:00", "CDT", 300], ["1979-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["1979-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1980-04-27T07:59:59+00:00", "01:59:59", "CST", 360], ["1980-04-27T08:00:00+00:00", "03:00:00", "CDT", 300], ["1980-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1980-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1981-04-26T07:59:59+00:00", "01:59:59", "CST", 360], ["1981-04-26T08:00:00+00:00", "03:00:00", "CDT", 300], ["1981-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["1981-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1982-04-25T07:59:59+00:00", "01:59:59", "CST", 360], ["1982-04-25T08:00:00+00:00", "03:00:00", "CDT", 300], ["1982-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["1982-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1983-04-24T07:59:59+00:00", "01:59:59", "CST", 360], ["1983-04-24T08:00:00+00:00", "03:00:00", "CDT", 300], ["1983-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["1983-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1984-04-29T07:59:59+00:00", "01:59:59", "CST", 360], ["1984-04-29T08:00:00+00:00", "03:00:00", "CDT", 300], ["1984-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["1984-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1985-04-28T07:59:59+00:00", "01:59:59", "CST", 360], ["1985-04-28T08:00:00+00:00", "03:00:00", "CDT", 300], ["1985-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1985-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1986-04-27T07:59:59+00:00", "01:59:59", "CST", 360], ["1986-04-27T08:00:00+00:00", "03:00:00", "CDT", 300], ["1986-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1986-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1987-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["1987-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["1987-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["1987-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1988-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["1988-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["1988-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["1988-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1989-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["1989-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["1989-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["1989-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1990-04-01T07:59:59+00:00", "01:59:59", "CST", 360], ["1990-04-01T08:00:00+00:00", "03:00:00", "CDT", 300], ["1990-10-28T06:59:59+00:00", "01:59:59", "CDT", 300], ["1990-10-28T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1991-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["1991-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["1991-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1991-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1992-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["1992-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["1992-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["1992-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1993-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["1993-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["1993-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["1993-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1994-04-03T07:59:59+00:00", "01:59:59", "CST", 360], ["1994-04-03T08:00:00+00:00", "03:00:00", "CDT", 300], ["1994-10-30T06:59:59+00:00", "01:59:59", "CDT", 300], ["1994-10-30T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1995-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["1995-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["1995-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["1995-10-29T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1996-04-07T07:59:59+00:00", "01:59:59", "CST", 360], ["1996-04-07T08:00:00+00:00", "03:00:00", "CDT", 300], ["1996-10-27T06:59:59+00:00", "01:59:59", "CDT", 300], ["1996-10-27T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1997-04-06T07:59:59+00:00", "01:59:59", "CST", 360], ["1997-04-06T08:00:00+00:00", "03:00:00", "CDT", 300], ["1997-10-26T06:59:59+00:00", "01:59:59", "CDT", 300], ["1997-10-26T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1998-04-05T07:59:59+00:00", "01:59:59", "CST", 360], ["1998-04-05T08:00:00+00:00", "03:00:00", "CDT", 300], ["1998-10-25T06:59:59+00:00", "01:59:59", "CDT", 300], ["1998-10-25T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["1999-04-04T07:59:59+00:00", "01:59:59", "CST", 360], ["1999-04-04T08:00:00+00:00", "03:00:00", "CDT", 300], ["1999-10-31T06:59:59+00:00", "01:59:59", "CDT", 300], ["1999-10-31T07:00:00+00:00", "01:00:00", "CST", 360]]);
        helpers.testYear("America/Kentucky/Monticello", [["2000-04-02T07:59:59+00:00", "01:59:59", "CST", 360], ["2000-04-02T08:00:00+00:00", "03:00:00", "CDT", 300], ["2000-10-29T06:59:59+00:00", "01:59:59", "CDT", 300], ["2000-10-29T07:00:00+00:00", "02:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2001-04-01T06:59:59+00:00", "01:59:59", "EST", 300], ["2001-04-01T07:00:00+00:00", "03:00:00", "EDT", 240], ["2001-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["2001-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2002-04-07T06:59:59+00:00", "01:59:59", "EST", 300], ["2002-04-07T07:00:00+00:00", "03:00:00", "EDT", 240], ["2002-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["2002-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2003-04-06T06:59:59+00:00", "01:59:59", "EST", 300], ["2003-04-06T07:00:00+00:00", "03:00:00", "EDT", 240], ["2003-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["2003-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2004-04-04T06:59:59+00:00", "01:59:59", "EST", 300], ["2004-04-04T07:00:00+00:00", "03:00:00", "EDT", 240], ["2004-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["2004-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2005-04-03T06:59:59+00:00", "01:59:59", "EST", 300], ["2005-04-03T07:00:00+00:00", "03:00:00", "EDT", 240], ["2005-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["2005-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2006-04-02T06:59:59+00:00", "01:59:59", "EST", 300], ["2006-04-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["2006-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["2006-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2007-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2007-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2007-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2007-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2008-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2008-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2008-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2008-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2009-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2009-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2009-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2009-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2010-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2010-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2010-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2010-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2011-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2011-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2011-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2011-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2012-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2012-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2012-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2012-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2013-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2013-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2013-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2013-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2014-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2014-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2014-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2014-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2015-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2015-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2015-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2015-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2016-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2016-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2016-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2016-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2017-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2017-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2017-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2017-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2018-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2018-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2018-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2018-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2019-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2019-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2019-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2019-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2020-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2020-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2020-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2020-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2021-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2021-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2021-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2021-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2022-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2022-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2022-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2022-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2023-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2023-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2023-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2023-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2024-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2024-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2024-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2024-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2025-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2025-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2025-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2025-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2026-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2026-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2026-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2026-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2027-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2027-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2027-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2027-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2028-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2028-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2028-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2028-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2029-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2029-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2029-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2029-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2030-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2030-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2030-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2030-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2031-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2031-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2031-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2031-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2032-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2032-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2032-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2032-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2033-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2033-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2033-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2033-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2034-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2034-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2034-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2034-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2035-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2035-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2035-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2035-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2036-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2036-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2036-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2036-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Kentucky/Monticello", [["2037-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2037-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2037-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2037-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
    });
});
