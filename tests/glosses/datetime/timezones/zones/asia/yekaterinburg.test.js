

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Yekaterinburg", () => {
        helpers.testYear("Asia/Yekaterinburg", [["1916-07-02T19:57:26+00:00", "23:59:59", "LMT", -14553 / 60], ["1916-07-02T19:57:27+00:00", "23:42:32", "PMT", -13505 / 60]]);
        helpers.testYear("Asia/Yekaterinburg", [["1919-07-15T00:14:54+00:00", "03:59:59", "PMT", -13505 / 60], ["1919-07-15T00:14:55+00:00", "04:14:55", "+04", -240]]);
        helpers.testYear("Asia/Yekaterinburg", [["1930-06-20T19:59:59+00:00", "23:59:59", "+04", -240], ["1930-06-20T20:00:00+00:00", "01:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1981-03-31T18:59:59+00:00", "23:59:59", "+05", -300], ["1981-03-31T19:00:00+00:00", "01:00:00", "+06", -360], ["1981-09-30T17:59:59+00:00", "23:59:59", "+06", -360], ["1981-09-30T18:00:00+00:00", "23:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1982-03-31T18:59:59+00:00", "23:59:59", "+05", -300], ["1982-03-31T19:00:00+00:00", "01:00:00", "+06", -360], ["1982-09-30T17:59:59+00:00", "23:59:59", "+06", -360], ["1982-09-30T18:00:00+00:00", "23:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1983-03-31T18:59:59+00:00", "23:59:59", "+05", -300], ["1983-03-31T19:00:00+00:00", "01:00:00", "+06", -360], ["1983-09-30T17:59:59+00:00", "23:59:59", "+06", -360], ["1983-09-30T18:00:00+00:00", "23:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1984-03-31T18:59:59+00:00", "23:59:59", "+05", -300], ["1984-03-31T19:00:00+00:00", "01:00:00", "+06", -360], ["1984-09-29T20:59:59+00:00", "02:59:59", "+06", -360], ["1984-09-29T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1985-03-30T20:59:59+00:00", "01:59:59", "+05", -300], ["1985-03-30T21:00:00+00:00", "03:00:00", "+06", -360], ["1985-09-28T20:59:59+00:00", "02:59:59", "+06", -360], ["1985-09-28T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1986-03-29T20:59:59+00:00", "01:59:59", "+05", -300], ["1986-03-29T21:00:00+00:00", "03:00:00", "+06", -360], ["1986-09-27T20:59:59+00:00", "02:59:59", "+06", -360], ["1986-09-27T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1987-03-28T20:59:59+00:00", "01:59:59", "+05", -300], ["1987-03-28T21:00:00+00:00", "03:00:00", "+06", -360], ["1987-09-26T20:59:59+00:00", "02:59:59", "+06", -360], ["1987-09-26T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1988-03-26T20:59:59+00:00", "01:59:59", "+05", -300], ["1988-03-26T21:00:00+00:00", "03:00:00", "+06", -360], ["1988-09-24T20:59:59+00:00", "02:59:59", "+06", -360], ["1988-09-24T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1989-03-25T20:59:59+00:00", "01:59:59", "+05", -300], ["1989-03-25T21:00:00+00:00", "03:00:00", "+06", -360], ["1989-09-23T20:59:59+00:00", "02:59:59", "+06", -360], ["1989-09-23T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1990-03-24T20:59:59+00:00", "01:59:59", "+05", -300], ["1990-03-24T21:00:00+00:00", "03:00:00", "+06", -360], ["1990-09-29T20:59:59+00:00", "02:59:59", "+06", -360], ["1990-09-29T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1991-03-30T20:59:59+00:00", "01:59:59", "+05", -300], ["1991-03-30T21:00:00+00:00", "02:00:00", "+05", -300], ["1991-09-28T21:59:59+00:00", "02:59:59", "+05", -300], ["1991-09-28T22:00:00+00:00", "02:00:00", "+04", -240]]);
        helpers.testYear("Asia/Yekaterinburg", [["1992-01-18T21:59:59+00:00", "01:59:59", "+04", -240], ["1992-01-18T22:00:00+00:00", "03:00:00", "+05", -300], ["1992-03-28T20:59:59+00:00", "01:59:59", "+05", -300], ["1992-03-28T21:00:00+00:00", "03:00:00", "+06", -360], ["1992-09-26T20:59:59+00:00", "02:59:59", "+06", -360], ["1992-09-26T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1993-03-27T20:59:59+00:00", "01:59:59", "+05", -300], ["1993-03-27T21:00:00+00:00", "03:00:00", "+06", -360], ["1993-09-25T20:59:59+00:00", "02:59:59", "+06", -360], ["1993-09-25T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1994-03-26T20:59:59+00:00", "01:59:59", "+05", -300], ["1994-03-26T21:00:00+00:00", "03:00:00", "+06", -360], ["1994-09-24T20:59:59+00:00", "02:59:59", "+06", -360], ["1994-09-24T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1995-03-25T20:59:59+00:00", "01:59:59", "+05", -300], ["1995-03-25T21:00:00+00:00", "03:00:00", "+06", -360], ["1995-09-23T20:59:59+00:00", "02:59:59", "+06", -360], ["1995-09-23T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1996-03-30T20:59:59+00:00", "01:59:59", "+05", -300], ["1996-03-30T21:00:00+00:00", "03:00:00", "+06", -360], ["1996-10-26T20:59:59+00:00", "02:59:59", "+06", -360], ["1996-10-26T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1997-03-29T20:59:59+00:00", "01:59:59", "+05", -300], ["1997-03-29T21:00:00+00:00", "03:00:00", "+06", -360], ["1997-10-25T20:59:59+00:00", "02:59:59", "+06", -360], ["1997-10-25T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1998-03-28T20:59:59+00:00", "01:59:59", "+05", -300], ["1998-03-28T21:00:00+00:00", "03:00:00", "+06", -360], ["1998-10-24T20:59:59+00:00", "02:59:59", "+06", -360], ["1998-10-24T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["1999-03-27T20:59:59+00:00", "01:59:59", "+05", -300], ["1999-03-27T21:00:00+00:00", "03:00:00", "+06", -360], ["1999-10-30T20:59:59+00:00", "02:59:59", "+06", -360], ["1999-10-30T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2000-03-25T20:59:59+00:00", "01:59:59", "+05", -300], ["2000-03-25T21:00:00+00:00", "03:00:00", "+06", -360], ["2000-10-28T20:59:59+00:00", "02:59:59", "+06", -360], ["2000-10-28T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2001-03-24T20:59:59+00:00", "01:59:59", "+05", -300], ["2001-03-24T21:00:00+00:00", "03:00:00", "+06", -360], ["2001-10-27T20:59:59+00:00", "02:59:59", "+06", -360], ["2001-10-27T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2002-03-30T20:59:59+00:00", "01:59:59", "+05", -300], ["2002-03-30T21:00:00+00:00", "03:00:00", "+06", -360], ["2002-10-26T20:59:59+00:00", "02:59:59", "+06", -360], ["2002-10-26T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2003-03-29T20:59:59+00:00", "01:59:59", "+05", -300], ["2003-03-29T21:00:00+00:00", "03:00:00", "+06", -360], ["2003-10-25T20:59:59+00:00", "02:59:59", "+06", -360], ["2003-10-25T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2004-03-27T20:59:59+00:00", "01:59:59", "+05", -300], ["2004-03-27T21:00:00+00:00", "03:00:00", "+06", -360], ["2004-10-30T20:59:59+00:00", "02:59:59", "+06", -360], ["2004-10-30T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2005-03-26T20:59:59+00:00", "01:59:59", "+05", -300], ["2005-03-26T21:00:00+00:00", "03:00:00", "+06", -360], ["2005-10-29T20:59:59+00:00", "02:59:59", "+06", -360], ["2005-10-29T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2006-03-25T20:59:59+00:00", "01:59:59", "+05", -300], ["2006-03-25T21:00:00+00:00", "03:00:00", "+06", -360], ["2006-10-28T20:59:59+00:00", "02:59:59", "+06", -360], ["2006-10-28T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2007-03-24T20:59:59+00:00", "01:59:59", "+05", -300], ["2007-03-24T21:00:00+00:00", "03:00:00", "+06", -360], ["2007-10-27T20:59:59+00:00", "02:59:59", "+06", -360], ["2007-10-27T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2008-03-29T20:59:59+00:00", "01:59:59", "+05", -300], ["2008-03-29T21:00:00+00:00", "03:00:00", "+06", -360], ["2008-10-25T20:59:59+00:00", "02:59:59", "+06", -360], ["2008-10-25T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2009-03-28T20:59:59+00:00", "01:59:59", "+05", -300], ["2009-03-28T21:00:00+00:00", "03:00:00", "+06", -360], ["2009-10-24T20:59:59+00:00", "02:59:59", "+06", -360], ["2009-10-24T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2010-03-27T20:59:59+00:00", "01:59:59", "+05", -300], ["2010-03-27T21:00:00+00:00", "03:00:00", "+06", -360], ["2010-10-30T20:59:59+00:00", "02:59:59", "+06", -360], ["2010-10-30T21:00:00+00:00", "02:00:00", "+05", -300]]);
        helpers.testYear("Asia/Yekaterinburg", [["2011-03-26T20:59:59+00:00", "01:59:59", "+05", -300], ["2011-03-26T21:00:00+00:00", "03:00:00", "+06", -360]]);
        helpers.testYear("Asia/Yekaterinburg", [["2014-10-25T19:59:59+00:00", "01:59:59", "+06", -360], ["2014-10-25T20:00:00+00:00", "01:00:00", "+05", -300]]);
    });
});
