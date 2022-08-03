

import * as helpers from "../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("PST8PDT", () => {
        helpers.testYear("PST8PDT", [["1918-03-31T09:59:59+00:00", "01:59:59", "PST", 480], ["1918-03-31T10:00:00+00:00", "03:00:00", "PDT", 420], ["1918-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["1918-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1919-03-30T09:59:59+00:00", "01:59:59", "PST", 480], ["1919-03-30T10:00:00+00:00", "03:00:00", "PDT", 420], ["1919-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["1919-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1942-02-09T09:59:59+00:00", "01:59:59", "PST", 480], ["1942-02-09T10:00:00+00:00", "03:00:00", "PWT", 420]]);
        helpers.testYear("PST8PDT", [["1945-08-14T22:59:59+00:00", "15:59:59", "PWT", 420], ["1945-08-14T23:00:00+00:00", "16:00:00", "PPT", 420], ["1945-09-30T08:59:59+00:00", "01:59:59", "PPT", 420], ["1945-09-30T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1967-04-30T09:59:59+00:00", "01:59:59", "PST", 480], ["1967-04-30T10:00:00+00:00", "03:00:00", "PDT", 420], ["1967-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["1967-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1968-04-28T09:59:59+00:00", "01:59:59", "PST", 480], ["1968-04-28T10:00:00+00:00", "03:00:00", "PDT", 420], ["1968-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["1968-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1969-04-27T09:59:59+00:00", "01:59:59", "PST", 480], ["1969-04-27T10:00:00+00:00", "03:00:00", "PDT", 420], ["1969-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["1969-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1970-04-26T09:59:59+00:00", "01:59:59", "PST", 480], ["1970-04-26T10:00:00+00:00", "03:00:00", "PDT", 420], ["1970-10-25T08:59:59+00:00", "01:59:59", "PDT", 420], ["1970-10-25T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1971-04-25T09:59:59+00:00", "01:59:59", "PST", 480], ["1971-04-25T10:00:00+00:00", "03:00:00", "PDT", 420], ["1971-10-31T08:59:59+00:00", "01:59:59", "PDT", 420], ["1971-10-31T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1972-04-30T09:59:59+00:00", "01:59:59", "PST", 480], ["1972-04-30T10:00:00+00:00", "03:00:00", "PDT", 420], ["1972-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["1972-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1973-04-29T09:59:59+00:00", "01:59:59", "PST", 480], ["1973-04-29T10:00:00+00:00", "03:00:00", "PDT", 420], ["1973-10-28T08:59:59+00:00", "01:59:59", "PDT", 420], ["1973-10-28T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1974-01-06T09:59:59+00:00", "01:59:59", "PST", 480], ["1974-01-06T10:00:00+00:00", "03:00:00", "PDT", 420], ["1974-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["1974-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1975-02-23T09:59:59+00:00", "01:59:59", "PST", 480], ["1975-02-23T10:00:00+00:00", "03:00:00", "PDT", 420], ["1975-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["1975-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1976-04-25T09:59:59+00:00", "01:59:59", "PST", 480], ["1976-04-25T10:00:00+00:00", "03:00:00", "PDT", 420], ["1976-10-31T08:59:59+00:00", "01:59:59", "PDT", 420], ["1976-10-31T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1977-04-24T09:59:59+00:00", "01:59:59", "PST", 480], ["1977-04-24T10:00:00+00:00", "03:00:00", "PDT", 420], ["1977-10-30T08:59:59+00:00", "01:59:59", "PDT", 420], ["1977-10-30T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1978-04-30T09:59:59+00:00", "01:59:59", "PST", 480], ["1978-04-30T10:00:00+00:00", "03:00:00", "PDT", 420], ["1978-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["1978-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1979-04-29T09:59:59+00:00", "01:59:59", "PST", 480], ["1979-04-29T10:00:00+00:00", "03:00:00", "PDT", 420], ["1979-10-28T08:59:59+00:00", "01:59:59", "PDT", 420], ["1979-10-28T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1980-04-27T09:59:59+00:00", "01:59:59", "PST", 480], ["1980-04-27T10:00:00+00:00", "03:00:00", "PDT", 420], ["1980-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["1980-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1981-04-26T09:59:59+00:00", "01:59:59", "PST", 480], ["1981-04-26T10:00:00+00:00", "03:00:00", "PDT", 420], ["1981-10-25T08:59:59+00:00", "01:59:59", "PDT", 420], ["1981-10-25T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1982-04-25T09:59:59+00:00", "01:59:59", "PST", 480], ["1982-04-25T10:00:00+00:00", "03:00:00", "PDT", 420], ["1982-10-31T08:59:59+00:00", "01:59:59", "PDT", 420], ["1982-10-31T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1983-04-24T09:59:59+00:00", "01:59:59", "PST", 480], ["1983-04-24T10:00:00+00:00", "03:00:00", "PDT", 420], ["1983-10-30T08:59:59+00:00", "01:59:59", "PDT", 420], ["1983-10-30T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1984-04-29T09:59:59+00:00", "01:59:59", "PST", 480], ["1984-04-29T10:00:00+00:00", "03:00:00", "PDT", 420], ["1984-10-28T08:59:59+00:00", "01:59:59", "PDT", 420], ["1984-10-28T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1985-04-28T09:59:59+00:00", "01:59:59", "PST", 480], ["1985-04-28T10:00:00+00:00", "03:00:00", "PDT", 420], ["1985-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["1985-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1986-04-27T09:59:59+00:00", "01:59:59", "PST", 480], ["1986-04-27T10:00:00+00:00", "03:00:00", "PDT", 420], ["1986-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["1986-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1987-04-05T09:59:59+00:00", "01:59:59", "PST", 480], ["1987-04-05T10:00:00+00:00", "03:00:00", "PDT", 420], ["1987-10-25T08:59:59+00:00", "01:59:59", "PDT", 420], ["1987-10-25T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1988-04-03T09:59:59+00:00", "01:59:59", "PST", 480], ["1988-04-03T10:00:00+00:00", "03:00:00", "PDT", 420], ["1988-10-30T08:59:59+00:00", "01:59:59", "PDT", 420], ["1988-10-30T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1989-04-02T09:59:59+00:00", "01:59:59", "PST", 480], ["1989-04-02T10:00:00+00:00", "03:00:00", "PDT", 420], ["1989-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["1989-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1990-04-01T09:59:59+00:00", "01:59:59", "PST", 480], ["1990-04-01T10:00:00+00:00", "03:00:00", "PDT", 420], ["1990-10-28T08:59:59+00:00", "01:59:59", "PDT", 420], ["1990-10-28T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1991-04-07T09:59:59+00:00", "01:59:59", "PST", 480], ["1991-04-07T10:00:00+00:00", "03:00:00", "PDT", 420], ["1991-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["1991-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1992-04-05T09:59:59+00:00", "01:59:59", "PST", 480], ["1992-04-05T10:00:00+00:00", "03:00:00", "PDT", 420], ["1992-10-25T08:59:59+00:00", "01:59:59", "PDT", 420], ["1992-10-25T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1993-04-04T09:59:59+00:00", "01:59:59", "PST", 480], ["1993-04-04T10:00:00+00:00", "03:00:00", "PDT", 420], ["1993-10-31T08:59:59+00:00", "01:59:59", "PDT", 420], ["1993-10-31T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1994-04-03T09:59:59+00:00", "01:59:59", "PST", 480], ["1994-04-03T10:00:00+00:00", "03:00:00", "PDT", 420], ["1994-10-30T08:59:59+00:00", "01:59:59", "PDT", 420], ["1994-10-30T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1995-04-02T09:59:59+00:00", "01:59:59", "PST", 480], ["1995-04-02T10:00:00+00:00", "03:00:00", "PDT", 420], ["1995-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["1995-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1996-04-07T09:59:59+00:00", "01:59:59", "PST", 480], ["1996-04-07T10:00:00+00:00", "03:00:00", "PDT", 420], ["1996-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["1996-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1997-04-06T09:59:59+00:00", "01:59:59", "PST", 480], ["1997-04-06T10:00:00+00:00", "03:00:00", "PDT", 420], ["1997-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["1997-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1998-04-05T09:59:59+00:00", "01:59:59", "PST", 480], ["1998-04-05T10:00:00+00:00", "03:00:00", "PDT", 420], ["1998-10-25T08:59:59+00:00", "01:59:59", "PDT", 420], ["1998-10-25T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["1999-04-04T09:59:59+00:00", "01:59:59", "PST", 480], ["1999-04-04T10:00:00+00:00", "03:00:00", "PDT", 420], ["1999-10-31T08:59:59+00:00", "01:59:59", "PDT", 420], ["1999-10-31T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2000-04-02T09:59:59+00:00", "01:59:59", "PST", 480], ["2000-04-02T10:00:00+00:00", "03:00:00", "PDT", 420], ["2000-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["2000-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2001-04-01T09:59:59+00:00", "01:59:59", "PST", 480], ["2001-04-01T10:00:00+00:00", "03:00:00", "PDT", 420], ["2001-10-28T08:59:59+00:00", "01:59:59", "PDT", 420], ["2001-10-28T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2002-04-07T09:59:59+00:00", "01:59:59", "PST", 480], ["2002-04-07T10:00:00+00:00", "03:00:00", "PDT", 420], ["2002-10-27T08:59:59+00:00", "01:59:59", "PDT", 420], ["2002-10-27T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2003-04-06T09:59:59+00:00", "01:59:59", "PST", 480], ["2003-04-06T10:00:00+00:00", "03:00:00", "PDT", 420], ["2003-10-26T08:59:59+00:00", "01:59:59", "PDT", 420], ["2003-10-26T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2004-04-04T09:59:59+00:00", "01:59:59", "PST", 480], ["2004-04-04T10:00:00+00:00", "03:00:00", "PDT", 420], ["2004-10-31T08:59:59+00:00", "01:59:59", "PDT", 420], ["2004-10-31T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2005-04-03T09:59:59+00:00", "01:59:59", "PST", 480], ["2005-04-03T10:00:00+00:00", "03:00:00", "PDT", 420], ["2005-10-30T08:59:59+00:00", "01:59:59", "PDT", 420], ["2005-10-30T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2006-04-02T09:59:59+00:00", "01:59:59", "PST", 480], ["2006-04-02T10:00:00+00:00", "03:00:00", "PDT", 420], ["2006-10-29T08:59:59+00:00", "01:59:59", "PDT", 420], ["2006-10-29T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2007-03-11T09:59:59+00:00", "01:59:59", "PST", 480], ["2007-03-11T10:00:00+00:00", "03:00:00", "PDT", 420], ["2007-11-04T08:59:59+00:00", "01:59:59", "PDT", 420], ["2007-11-04T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2008-03-09T09:59:59+00:00", "01:59:59", "PST", 480], ["2008-03-09T10:00:00+00:00", "03:00:00", "PDT", 420], ["2008-11-02T08:59:59+00:00", "01:59:59", "PDT", 420], ["2008-11-02T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2009-03-08T09:59:59+00:00", "01:59:59", "PST", 480], ["2009-03-08T10:00:00+00:00", "03:00:00", "PDT", 420], ["2009-11-01T08:59:59+00:00", "01:59:59", "PDT", 420], ["2009-11-01T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2010-03-14T09:59:59+00:00", "01:59:59", "PST", 480], ["2010-03-14T10:00:00+00:00", "03:00:00", "PDT", 420], ["2010-11-07T08:59:59+00:00", "01:59:59", "PDT", 420], ["2010-11-07T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2011-03-13T09:59:59+00:00", "01:59:59", "PST", 480], ["2011-03-13T10:00:00+00:00", "03:00:00", "PDT", 420], ["2011-11-06T08:59:59+00:00", "01:59:59", "PDT", 420], ["2011-11-06T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2012-03-11T09:59:59+00:00", "01:59:59", "PST", 480], ["2012-03-11T10:00:00+00:00", "03:00:00", "PDT", 420], ["2012-11-04T08:59:59+00:00", "01:59:59", "PDT", 420], ["2012-11-04T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2013-03-10T09:59:59+00:00", "01:59:59", "PST", 480], ["2013-03-10T10:00:00+00:00", "03:00:00", "PDT", 420], ["2013-11-03T08:59:59+00:00", "01:59:59", "PDT", 420], ["2013-11-03T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2014-03-09T09:59:59+00:00", "01:59:59", "PST", 480], ["2014-03-09T10:00:00+00:00", "03:00:00", "PDT", 420], ["2014-11-02T08:59:59+00:00", "01:59:59", "PDT", 420], ["2014-11-02T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2015-03-08T09:59:59+00:00", "01:59:59", "PST", 480], ["2015-03-08T10:00:00+00:00", "03:00:00", "PDT", 420], ["2015-11-01T08:59:59+00:00", "01:59:59", "PDT", 420], ["2015-11-01T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2016-03-13T09:59:59+00:00", "01:59:59", "PST", 480], ["2016-03-13T10:00:00+00:00", "03:00:00", "PDT", 420], ["2016-11-06T08:59:59+00:00", "01:59:59", "PDT", 420], ["2016-11-06T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2017-03-12T09:59:59+00:00", "01:59:59", "PST", 480], ["2017-03-12T10:00:00+00:00", "03:00:00", "PDT", 420], ["2017-11-05T08:59:59+00:00", "01:59:59", "PDT", 420], ["2017-11-05T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2018-03-11T09:59:59+00:00", "01:59:59", "PST", 480], ["2018-03-11T10:00:00+00:00", "03:00:00", "PDT", 420], ["2018-11-04T08:59:59+00:00", "01:59:59", "PDT", 420], ["2018-11-04T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2019-03-10T09:59:59+00:00", "01:59:59", "PST", 480], ["2019-03-10T10:00:00+00:00", "03:00:00", "PDT", 420], ["2019-11-03T08:59:59+00:00", "01:59:59", "PDT", 420], ["2019-11-03T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2020-03-08T09:59:59+00:00", "01:59:59", "PST", 480], ["2020-03-08T10:00:00+00:00", "03:00:00", "PDT", 420], ["2020-11-01T08:59:59+00:00", "01:59:59", "PDT", 420], ["2020-11-01T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2021-03-14T09:59:59+00:00", "01:59:59", "PST", 480], ["2021-03-14T10:00:00+00:00", "03:00:00", "PDT", 420], ["2021-11-07T08:59:59+00:00", "01:59:59", "PDT", 420], ["2021-11-07T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2022-03-13T09:59:59+00:00", "01:59:59", "PST", 480], ["2022-03-13T10:00:00+00:00", "03:00:00", "PDT", 420], ["2022-11-06T08:59:59+00:00", "01:59:59", "PDT", 420], ["2022-11-06T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2023-03-12T09:59:59+00:00", "01:59:59", "PST", 480], ["2023-03-12T10:00:00+00:00", "03:00:00", "PDT", 420], ["2023-11-05T08:59:59+00:00", "01:59:59", "PDT", 420], ["2023-11-05T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2024-03-10T09:59:59+00:00", "01:59:59", "PST", 480], ["2024-03-10T10:00:00+00:00", "03:00:00", "PDT", 420], ["2024-11-03T08:59:59+00:00", "01:59:59", "PDT", 420], ["2024-11-03T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2025-03-09T09:59:59+00:00", "01:59:59", "PST", 480], ["2025-03-09T10:00:00+00:00", "03:00:00", "PDT", 420], ["2025-11-02T08:59:59+00:00", "01:59:59", "PDT", 420], ["2025-11-02T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2026-03-08T09:59:59+00:00", "01:59:59", "PST", 480], ["2026-03-08T10:00:00+00:00", "03:00:00", "PDT", 420], ["2026-11-01T08:59:59+00:00", "01:59:59", "PDT", 420], ["2026-11-01T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2027-03-14T09:59:59+00:00", "01:59:59", "PST", 480], ["2027-03-14T10:00:00+00:00", "03:00:00", "PDT", 420], ["2027-11-07T08:59:59+00:00", "01:59:59", "PDT", 420], ["2027-11-07T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2028-03-12T09:59:59+00:00", "01:59:59", "PST", 480], ["2028-03-12T10:00:00+00:00", "03:00:00", "PDT", 420], ["2028-11-05T08:59:59+00:00", "01:59:59", "PDT", 420], ["2028-11-05T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2029-03-11T09:59:59+00:00", "01:59:59", "PST", 480], ["2029-03-11T10:00:00+00:00", "03:00:00", "PDT", 420], ["2029-11-04T08:59:59+00:00", "01:59:59", "PDT", 420], ["2029-11-04T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2030-03-10T09:59:59+00:00", "01:59:59", "PST", 480], ["2030-03-10T10:00:00+00:00", "03:00:00", "PDT", 420], ["2030-11-03T08:59:59+00:00", "01:59:59", "PDT", 420], ["2030-11-03T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2031-03-09T09:59:59+00:00", "01:59:59", "PST", 480], ["2031-03-09T10:00:00+00:00", "03:00:00", "PDT", 420], ["2031-11-02T08:59:59+00:00", "01:59:59", "PDT", 420], ["2031-11-02T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2032-03-14T09:59:59+00:00", "01:59:59", "PST", 480], ["2032-03-14T10:00:00+00:00", "03:00:00", "PDT", 420], ["2032-11-07T08:59:59+00:00", "01:59:59", "PDT", 420], ["2032-11-07T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2033-03-13T09:59:59+00:00", "01:59:59", "PST", 480], ["2033-03-13T10:00:00+00:00", "03:00:00", "PDT", 420], ["2033-11-06T08:59:59+00:00", "01:59:59", "PDT", 420], ["2033-11-06T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2034-03-12T09:59:59+00:00", "01:59:59", "PST", 480], ["2034-03-12T10:00:00+00:00", "03:00:00", "PDT", 420], ["2034-11-05T08:59:59+00:00", "01:59:59", "PDT", 420], ["2034-11-05T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2035-03-11T09:59:59+00:00", "01:59:59", "PST", 480], ["2035-03-11T10:00:00+00:00", "03:00:00", "PDT", 420], ["2035-11-04T08:59:59+00:00", "01:59:59", "PDT", 420], ["2035-11-04T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2036-03-09T09:59:59+00:00", "01:59:59", "PST", 480], ["2036-03-09T10:00:00+00:00", "03:00:00", "PDT", 420], ["2036-11-02T08:59:59+00:00", "01:59:59", "PDT", 420], ["2036-11-02T09:00:00+00:00", "01:00:00", "PST", 480]]);
        helpers.testYear("PST8PDT", [["2037-03-08T09:59:59+00:00", "01:59:59", "PST", 480], ["2037-03-08T10:00:00+00:00", "03:00:00", "PDT", 420], ["2037-11-01T08:59:59+00:00", "01:59:59", "PDT", 420], ["2037-11-01T09:00:00+00:00", "01:00:00", "PST", 480]]);
    });
});
