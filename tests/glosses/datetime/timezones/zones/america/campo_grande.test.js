

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Campo_Grande", () => {
        helpers.testYear("America/Campo_Grande", [["1914-01-01T03:38:27+00:00", "23:59:59", "LMT", 13108 / 60], ["1914-01-01T03:38:28+00:00", "23:38:28", "-04", 240]]);
        helpers.testYear("America/Campo_Grande", [["1931-10-03T14:59:59+00:00", "10:59:59", "-04", 240], ["1931-10-03T15:00:00+00:00", "12:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1932-04-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1932-04-01T03:00:00+00:00", "23:00:00", "-04", 240], ["1932-10-03T03:59:59+00:00", "23:59:59", "-04", 240], ["1932-10-03T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1933-04-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1933-04-01T03:00:00+00:00", "23:00:00", "-04", 240]]);
        helpers.testYear("America/Campo_Grande", [["1949-12-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1949-12-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1950-04-16T03:59:59+00:00", "00:59:59", "-03", 180], ["1950-04-16T04:00:00+00:00", "00:00:00", "-04", 240], ["1950-12-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1950-12-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1951-04-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1951-04-01T03:00:00+00:00", "23:00:00", "-04", 240], ["1951-12-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1951-12-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1952-04-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1952-04-01T03:00:00+00:00", "23:00:00", "-04", 240], ["1952-12-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1952-12-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1953-03-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1953-03-01T03:00:00+00:00", "23:00:00", "-04", 240]]);
        helpers.testYear("America/Campo_Grande", [["1963-12-09T03:59:59+00:00", "23:59:59", "-04", 240], ["1963-12-09T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1964-03-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1964-03-01T03:00:00+00:00", "23:00:00", "-04", 240]]);
        helpers.testYear("America/Campo_Grande", [["1965-01-31T03:59:59+00:00", "23:59:59", "-04", 240], ["1965-01-31T04:00:00+00:00", "01:00:00", "-03", 180], ["1965-03-31T02:59:59+00:00", "23:59:59", "-03", 180], ["1965-03-31T03:00:00+00:00", "23:00:00", "-04", 240], ["1965-12-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1965-12-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1966-03-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1966-03-01T03:00:00+00:00", "23:00:00", "-04", 240], ["1966-11-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1966-11-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1967-03-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1967-03-01T03:00:00+00:00", "23:00:00", "-04", 240], ["1967-11-01T03:59:59+00:00", "23:59:59", "-04", 240], ["1967-11-01T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1968-03-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1968-03-01T03:00:00+00:00", "23:00:00", "-04", 240]]);
        helpers.testYear("America/Campo_Grande", [["1985-11-02T03:59:59+00:00", "23:59:59", "-04", 240], ["1985-11-02T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1986-03-15T02:59:59+00:00", "23:59:59", "-03", 180], ["1986-03-15T03:00:00+00:00", "23:00:00", "-04", 240], ["1986-10-25T03:59:59+00:00", "23:59:59", "-04", 240], ["1986-10-25T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1987-02-14T02:59:59+00:00", "23:59:59", "-03", 180], ["1987-02-14T03:00:00+00:00", "23:00:00", "-04", 240], ["1987-10-25T03:59:59+00:00", "23:59:59", "-04", 240], ["1987-10-25T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1988-02-07T02:59:59+00:00", "23:59:59", "-03", 180], ["1988-02-07T03:00:00+00:00", "23:00:00", "-04", 240], ["1988-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["1988-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1989-01-29T02:59:59+00:00", "23:59:59", "-03", 180], ["1989-01-29T03:00:00+00:00", "23:00:00", "-04", 240], ["1989-10-15T03:59:59+00:00", "23:59:59", "-04", 240], ["1989-10-15T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1990-02-11T02:59:59+00:00", "23:59:59", "-03", 180], ["1990-02-11T03:00:00+00:00", "23:00:00", "-04", 240], ["1990-10-21T03:59:59+00:00", "23:59:59", "-04", 240], ["1990-10-21T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1991-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["1991-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["1991-10-20T03:59:59+00:00", "23:59:59", "-04", 240], ["1991-10-20T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1992-02-09T02:59:59+00:00", "23:59:59", "-03", 180], ["1992-02-09T03:00:00+00:00", "23:00:00", "-04", 240], ["1992-10-25T03:59:59+00:00", "23:59:59", "-04", 240], ["1992-10-25T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1993-01-31T02:59:59+00:00", "23:59:59", "-03", 180], ["1993-01-31T03:00:00+00:00", "23:00:00", "-04", 240], ["1993-10-17T03:59:59+00:00", "23:59:59", "-04", 240], ["1993-10-17T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1994-02-20T02:59:59+00:00", "23:59:59", "-03", 180], ["1994-02-20T03:00:00+00:00", "23:00:00", "-04", 240], ["1994-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["1994-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1995-02-19T02:59:59+00:00", "23:59:59", "-03", 180], ["1995-02-19T03:00:00+00:00", "23:00:00", "-04", 240], ["1995-10-15T03:59:59+00:00", "23:59:59", "-04", 240], ["1995-10-15T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1996-02-11T02:59:59+00:00", "23:59:59", "-03", 180], ["1996-02-11T03:00:00+00:00", "23:00:00", "-04", 240], ["1996-10-06T03:59:59+00:00", "23:59:59", "-04", 240], ["1996-10-06T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1997-02-16T02:59:59+00:00", "23:59:59", "-03", 180], ["1997-02-16T03:00:00+00:00", "23:00:00", "-04", 240], ["1997-10-06T03:59:59+00:00", "23:59:59", "-04", 240], ["1997-10-06T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1998-03-01T02:59:59+00:00", "23:59:59", "-03", 180], ["1998-03-01T03:00:00+00:00", "23:00:00", "-04", 240], ["1998-10-11T03:59:59+00:00", "23:59:59", "-04", 240], ["1998-10-11T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["1999-02-21T02:59:59+00:00", "23:59:59", "-03", 180], ["1999-02-21T03:00:00+00:00", "23:00:00", "-04", 240], ["1999-10-03T03:59:59+00:00", "23:59:59", "-04", 240], ["1999-10-03T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2000-02-27T02:59:59+00:00", "23:59:59", "-03", 180], ["2000-02-27T03:00:00+00:00", "23:00:00", "-04", 240], ["2000-10-08T03:59:59+00:00", "23:59:59", "-04", 240], ["2000-10-08T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2001-02-18T02:59:59+00:00", "23:59:59", "-03", 180], ["2001-02-18T03:00:00+00:00", "23:00:00", "-04", 240], ["2001-10-14T03:59:59+00:00", "23:59:59", "-04", 240], ["2001-10-14T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2002-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["2002-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["2002-11-03T03:59:59+00:00", "23:59:59", "-04", 240], ["2002-11-03T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2003-02-16T02:59:59+00:00", "23:59:59", "-03", 180], ["2003-02-16T03:00:00+00:00", "23:00:00", "-04", 240], ["2003-10-19T03:59:59+00:00", "23:59:59", "-04", 240], ["2003-10-19T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2004-02-15T02:59:59+00:00", "23:59:59", "-03", 180], ["2004-02-15T03:00:00+00:00", "23:00:00", "-04", 240], ["2004-11-02T03:59:59+00:00", "23:59:59", "-04", 240], ["2004-11-02T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2005-02-20T02:59:59+00:00", "23:59:59", "-03", 180], ["2005-02-20T03:00:00+00:00", "23:00:00", "-04", 240], ["2005-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["2005-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2006-02-19T02:59:59+00:00", "23:59:59", "-03", 180], ["2006-02-19T03:00:00+00:00", "23:00:00", "-04", 240], ["2006-11-05T03:59:59+00:00", "23:59:59", "-04", 240], ["2006-11-05T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2007-02-25T02:59:59+00:00", "23:59:59", "-03", 180], ["2007-02-25T03:00:00+00:00", "23:00:00", "-04", 240], ["2007-10-14T03:59:59+00:00", "23:59:59", "-04", 240], ["2007-10-14T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2008-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["2008-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["2008-10-19T03:59:59+00:00", "23:59:59", "-04", 240], ["2008-10-19T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2009-02-15T02:59:59+00:00", "23:59:59", "-03", 180], ["2009-02-15T03:00:00+00:00", "23:00:00", "-04", 240], ["2009-10-18T03:59:59+00:00", "23:59:59", "-04", 240], ["2009-10-18T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2010-02-21T02:59:59+00:00", "23:59:59", "-03", 180], ["2010-02-21T03:00:00+00:00", "23:00:00", "-04", 240], ["2010-10-17T03:59:59+00:00", "23:59:59", "-04", 240], ["2010-10-17T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2011-02-20T02:59:59+00:00", "23:59:59", "-03", 180], ["2011-02-20T03:00:00+00:00", "23:00:00", "-04", 240], ["2011-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["2011-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2012-02-26T02:59:59+00:00", "23:59:59", "-03", 180], ["2012-02-26T03:00:00+00:00", "23:00:00", "-04", 240], ["2012-10-21T03:59:59+00:00", "23:59:59", "-04", 240], ["2012-10-21T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2013-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["2013-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["2013-10-20T03:59:59+00:00", "23:59:59", "-04", 240], ["2013-10-20T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2014-02-16T02:59:59+00:00", "23:59:59", "-03", 180], ["2014-02-16T03:00:00+00:00", "23:00:00", "-04", 240], ["2014-10-19T03:59:59+00:00", "23:59:59", "-04", 240], ["2014-10-19T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2015-02-22T02:59:59+00:00", "23:59:59", "-03", 180], ["2015-02-22T03:00:00+00:00", "23:00:00", "-04", 240], ["2015-10-18T03:59:59+00:00", "23:59:59", "-04", 240], ["2015-10-18T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2016-02-21T02:59:59+00:00", "23:59:59", "-03", 180], ["2016-02-21T03:00:00+00:00", "23:00:00", "-04", 240], ["2016-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["2016-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2017-02-19T02:59:59+00:00", "23:59:59", "-03", 180], ["2017-02-19T03:00:00+00:00", "23:00:00", "-04", 240], ["2017-10-15T03:59:59+00:00", "23:59:59", "-04", 240], ["2017-10-15T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2018-02-18T02:59:59+00:00", "23:59:59", "-03", 180], ["2018-02-18T03:00:00+00:00", "23:00:00", "-04", 240], ["2018-10-21T03:59:59+00:00", "23:59:59", "-04", 240], ["2018-10-21T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2019-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["2019-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["2019-10-20T03:59:59+00:00", "23:59:59", "-04", 240], ["2019-10-20T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2020-02-16T02:59:59+00:00", "23:59:59", "-03", 180], ["2020-02-16T03:00:00+00:00", "23:00:00", "-04", 240], ["2020-10-18T03:59:59+00:00", "23:59:59", "-04", 240], ["2020-10-18T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2021-02-21T02:59:59+00:00", "23:59:59", "-03", 180], ["2021-02-21T03:00:00+00:00", "23:00:00", "-04", 240], ["2021-10-17T03:59:59+00:00", "23:59:59", "-04", 240], ["2021-10-17T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2022-02-20T02:59:59+00:00", "23:59:59", "-03", 180], ["2022-02-20T03:00:00+00:00", "23:00:00", "-04", 240], ["2022-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["2022-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2023-02-26T02:59:59+00:00", "23:59:59", "-03", 180], ["2023-02-26T03:00:00+00:00", "23:00:00", "-04", 240], ["2023-10-15T03:59:59+00:00", "23:59:59", "-04", 240], ["2023-10-15T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2024-02-18T02:59:59+00:00", "23:59:59", "-03", 180], ["2024-02-18T03:00:00+00:00", "23:00:00", "-04", 240], ["2024-10-20T03:59:59+00:00", "23:59:59", "-04", 240], ["2024-10-20T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2025-02-16T02:59:59+00:00", "23:59:59", "-03", 180], ["2025-02-16T03:00:00+00:00", "23:00:00", "-04", 240], ["2025-10-19T03:59:59+00:00", "23:59:59", "-04", 240], ["2025-10-19T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2026-02-22T02:59:59+00:00", "23:59:59", "-03", 180], ["2026-02-22T03:00:00+00:00", "23:00:00", "-04", 240], ["2026-10-18T03:59:59+00:00", "23:59:59", "-04", 240], ["2026-10-18T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2027-02-21T02:59:59+00:00", "23:59:59", "-03", 180], ["2027-02-21T03:00:00+00:00", "23:00:00", "-04", 240], ["2027-10-17T03:59:59+00:00", "23:59:59", "-04", 240], ["2027-10-17T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2028-02-20T02:59:59+00:00", "23:59:59", "-03", 180], ["2028-02-20T03:00:00+00:00", "23:00:00", "-04", 240], ["2028-10-15T03:59:59+00:00", "23:59:59", "-04", 240], ["2028-10-15T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2029-02-18T02:59:59+00:00", "23:59:59", "-03", 180], ["2029-02-18T03:00:00+00:00", "23:00:00", "-04", 240], ["2029-10-21T03:59:59+00:00", "23:59:59", "-04", 240], ["2029-10-21T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2030-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["2030-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["2030-10-20T03:59:59+00:00", "23:59:59", "-04", 240], ["2030-10-20T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2031-02-16T02:59:59+00:00", "23:59:59", "-03", 180], ["2031-02-16T03:00:00+00:00", "23:00:00", "-04", 240], ["2031-10-19T03:59:59+00:00", "23:59:59", "-04", 240], ["2031-10-19T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2032-02-15T02:59:59+00:00", "23:59:59", "-03", 180], ["2032-02-15T03:00:00+00:00", "23:00:00", "-04", 240], ["2032-10-17T03:59:59+00:00", "23:59:59", "-04", 240], ["2032-10-17T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2033-02-20T02:59:59+00:00", "23:59:59", "-03", 180], ["2033-02-20T03:00:00+00:00", "23:00:00", "-04", 240], ["2033-10-16T03:59:59+00:00", "23:59:59", "-04", 240], ["2033-10-16T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2034-02-26T02:59:59+00:00", "23:59:59", "-03", 180], ["2034-02-26T03:00:00+00:00", "23:00:00", "-04", 240], ["2034-10-15T03:59:59+00:00", "23:59:59", "-04", 240], ["2034-10-15T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2035-02-18T02:59:59+00:00", "23:59:59", "-03", 180], ["2035-02-18T03:00:00+00:00", "23:00:00", "-04", 240], ["2035-10-21T03:59:59+00:00", "23:59:59", "-04", 240], ["2035-10-21T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2036-02-17T02:59:59+00:00", "23:59:59", "-03", 180], ["2036-02-17T03:00:00+00:00", "23:00:00", "-04", 240], ["2036-10-19T03:59:59+00:00", "23:59:59", "-04", 240], ["2036-10-19T04:00:00+00:00", "01:00:00", "-03", 180]]);
        helpers.testYear("America/Campo_Grande", [["2037-02-22T02:59:59+00:00", "23:59:59", "-03", 180], ["2037-02-22T03:00:00+00:00", "23:00:00", "-04", 240], ["2037-10-18T03:59:59+00:00", "23:59:59", "-04", 240], ["2037-10-18T04:00:00+00:00", "01:00:00", "-03", 180]]);
    });
});
