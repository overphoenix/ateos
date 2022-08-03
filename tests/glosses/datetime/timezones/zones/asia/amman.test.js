

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Asia/Amman", () => {
        helpers.testYear("Asia/Amman", [["1930-12-31T21:36:15+00:00", "23:59:59", "LMT", -8624 / 60], ["1930-12-31T21:36:16+00:00", "23:36:16", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1973-06-05T21:59:59+00:00", "23:59:59", "EET", -120], ["1973-06-05T22:00:00+00:00", "01:00:00", "EEST", -180], ["1973-09-30T20:59:59+00:00", "23:59:59", "EEST", -180], ["1973-09-30T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1974-04-30T21:59:59+00:00", "23:59:59", "EET", -120], ["1974-04-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["1974-09-30T20:59:59+00:00", "23:59:59", "EEST", -180], ["1974-09-30T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1975-04-30T21:59:59+00:00", "23:59:59", "EET", -120], ["1975-04-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["1975-09-30T20:59:59+00:00", "23:59:59", "EEST", -180], ["1975-09-30T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1976-04-30T21:59:59+00:00", "23:59:59", "EET", -120], ["1976-04-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["1976-10-31T20:59:59+00:00", "23:59:59", "EEST", -180], ["1976-10-31T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1977-04-30T21:59:59+00:00", "23:59:59", "EET", -120], ["1977-04-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["1977-09-30T20:59:59+00:00", "23:59:59", "EEST", -180], ["1977-09-30T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1978-04-29T21:59:59+00:00", "23:59:59", "EET", -120], ["1978-04-29T22:00:00+00:00", "01:00:00", "EEST", -180], ["1978-09-29T20:59:59+00:00", "23:59:59", "EEST", -180], ["1978-09-29T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1985-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["1985-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["1985-09-30T20:59:59+00:00", "23:59:59", "EEST", -180], ["1985-09-30T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1986-04-03T21:59:59+00:00", "23:59:59", "EET", -120], ["1986-04-03T22:00:00+00:00", "01:00:00", "EEST", -180], ["1986-10-02T20:59:59+00:00", "23:59:59", "EEST", -180], ["1986-10-02T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1987-04-02T21:59:59+00:00", "23:59:59", "EET", -120], ["1987-04-02T22:00:00+00:00", "01:00:00", "EEST", -180], ["1987-10-01T20:59:59+00:00", "23:59:59", "EEST", -180], ["1987-10-01T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1988-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["1988-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["1988-10-06T20:59:59+00:00", "23:59:59", "EEST", -180], ["1988-10-06T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1989-05-07T21:59:59+00:00", "23:59:59", "EET", -120], ["1989-05-07T22:00:00+00:00", "01:00:00", "EEST", -180], ["1989-10-05T20:59:59+00:00", "23:59:59", "EEST", -180], ["1989-10-05T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1990-04-26T21:59:59+00:00", "23:59:59", "EET", -120], ["1990-04-26T22:00:00+00:00", "01:00:00", "EEST", -180], ["1990-10-04T20:59:59+00:00", "23:59:59", "EEST", -180], ["1990-10-04T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1991-04-16T21:59:59+00:00", "23:59:59", "EET", -120], ["1991-04-16T22:00:00+00:00", "01:00:00", "EEST", -180], ["1991-09-26T20:59:59+00:00", "23:59:59", "EEST", -180], ["1991-09-26T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1992-04-09T21:59:59+00:00", "23:59:59", "EET", -120], ["1992-04-09T22:00:00+00:00", "01:00:00", "EEST", -180], ["1992-10-01T20:59:59+00:00", "23:59:59", "EEST", -180], ["1992-10-01T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1993-04-01T21:59:59+00:00", "23:59:59", "EET", -120], ["1993-04-01T22:00:00+00:00", "01:00:00", "EEST", -180], ["1993-09-30T20:59:59+00:00", "23:59:59", "EEST", -180], ["1993-09-30T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1994-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["1994-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["1994-09-15T20:59:59+00:00", "23:59:59", "EEST", -180], ["1994-09-15T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1995-04-06T21:59:59+00:00", "23:59:59", "EET", -120], ["1995-04-06T22:00:00+00:00", "01:00:00", "EEST", -180], ["1995-09-14T21:59:59+00:00", "00:59:59", "EEST", -180], ["1995-09-14T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1996-04-04T21:59:59+00:00", "23:59:59", "EET", -120], ["1996-04-04T22:00:00+00:00", "01:00:00", "EEST", -180], ["1996-09-19T21:59:59+00:00", "00:59:59", "EEST", -180], ["1996-09-19T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1997-04-03T21:59:59+00:00", "23:59:59", "EET", -120], ["1997-04-03T22:00:00+00:00", "01:00:00", "EEST", -180], ["1997-09-18T21:59:59+00:00", "00:59:59", "EEST", -180], ["1997-09-18T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1998-04-02T21:59:59+00:00", "23:59:59", "EET", -120], ["1998-04-02T22:00:00+00:00", "01:00:00", "EEST", -180], ["1998-09-17T21:59:59+00:00", "00:59:59", "EEST", -180], ["1998-09-17T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["1999-06-30T21:59:59+00:00", "23:59:59", "EET", -120], ["1999-06-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["1999-09-23T21:59:59+00:00", "00:59:59", "EEST", -180], ["1999-09-23T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2000-03-29T21:59:59+00:00", "23:59:59", "EET", -120], ["2000-03-29T22:00:00+00:00", "01:00:00", "EEST", -180], ["2000-09-28T21:59:59+00:00", "00:59:59", "EEST", -180], ["2000-09-28T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2001-03-28T21:59:59+00:00", "23:59:59", "EET", -120], ["2001-03-28T22:00:00+00:00", "01:00:00", "EEST", -180], ["2001-09-27T21:59:59+00:00", "00:59:59", "EEST", -180], ["2001-09-27T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2002-03-28T21:59:59+00:00", "23:59:59", "EET", -120], ["2002-03-28T22:00:00+00:00", "01:00:00", "EEST", -180], ["2002-09-26T21:59:59+00:00", "00:59:59", "EEST", -180], ["2002-09-26T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2003-03-27T21:59:59+00:00", "23:59:59", "EET", -120], ["2003-03-27T22:00:00+00:00", "01:00:00", "EEST", -180], ["2003-10-23T21:59:59+00:00", "00:59:59", "EEST", -180], ["2003-10-23T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2004-03-25T21:59:59+00:00", "23:59:59", "EET", -120], ["2004-03-25T22:00:00+00:00", "01:00:00", "EEST", -180], ["2004-10-14T21:59:59+00:00", "00:59:59", "EEST", -180], ["2004-10-14T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2005-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["2005-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["2005-09-29T21:59:59+00:00", "00:59:59", "EEST", -180], ["2005-09-29T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2006-03-30T21:59:59+00:00", "23:59:59", "EET", -120], ["2006-03-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["2006-10-26T21:59:59+00:00", "00:59:59", "EEST", -180], ["2006-10-26T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2007-03-29T21:59:59+00:00", "23:59:59", "EET", -120], ["2007-03-29T22:00:00+00:00", "01:00:00", "EEST", -180], ["2007-10-25T21:59:59+00:00", "00:59:59", "EEST", -180], ["2007-10-25T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2008-03-27T21:59:59+00:00", "23:59:59", "EET", -120], ["2008-03-27T22:00:00+00:00", "01:00:00", "EEST", -180], ["2008-10-30T21:59:59+00:00", "00:59:59", "EEST", -180], ["2008-10-30T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2009-03-26T21:59:59+00:00", "23:59:59", "EET", -120], ["2009-03-26T22:00:00+00:00", "01:00:00", "EEST", -180], ["2009-10-29T21:59:59+00:00", "00:59:59", "EEST", -180], ["2009-10-29T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2010-03-25T21:59:59+00:00", "23:59:59", "EET", -120], ["2010-03-25T22:00:00+00:00", "01:00:00", "EEST", -180], ["2010-10-28T21:59:59+00:00", "00:59:59", "EEST", -180], ["2010-10-28T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2011-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["2011-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["2011-10-27T21:59:59+00:00", "00:59:59", "EEST", -180], ["2011-10-27T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2012-03-29T21:59:59+00:00", "23:59:59", "EET", -120], ["2012-03-29T22:00:00+00:00", "01:00:00", "EEST", -180]]);
        helpers.testYear("Asia/Amman", [["2013-12-19T20:59:59+00:00", "23:59:59", "EEST", -180], ["2013-12-19T21:00:00+00:00", "23:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2014-03-27T21:59:59+00:00", "23:59:59", "EET", -120], ["2014-03-27T22:00:00+00:00", "01:00:00", "EEST", -180], ["2014-10-30T21:59:59+00:00", "00:59:59", "EEST", -180], ["2014-10-30T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2015-03-26T21:59:59+00:00", "23:59:59", "EET", -120], ["2015-03-26T22:00:00+00:00", "01:00:00", "EEST", -180], ["2015-10-29T21:59:59+00:00", "00:59:59", "EEST", -180], ["2015-10-29T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2016-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["2016-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["2016-10-27T21:59:59+00:00", "00:59:59", "EEST", -180], ["2016-10-27T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2017-03-30T21:59:59+00:00", "23:59:59", "EET", -120], ["2017-03-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["2017-10-26T21:59:59+00:00", "00:59:59", "EEST", -180], ["2017-10-26T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2018-03-29T21:59:59+00:00", "23:59:59", "EET", -120], ["2018-03-29T22:00:00+00:00", "01:00:00", "EEST", -180], ["2018-10-25T21:59:59+00:00", "00:59:59", "EEST", -180], ["2018-10-25T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2019-03-28T21:59:59+00:00", "23:59:59", "EET", -120], ["2019-03-28T22:00:00+00:00", "01:00:00", "EEST", -180], ["2019-10-24T21:59:59+00:00", "00:59:59", "EEST", -180], ["2019-10-24T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2020-03-26T21:59:59+00:00", "23:59:59", "EET", -120], ["2020-03-26T22:00:00+00:00", "01:00:00", "EEST", -180], ["2020-10-29T21:59:59+00:00", "00:59:59", "EEST", -180], ["2020-10-29T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2021-03-25T21:59:59+00:00", "23:59:59", "EET", -120], ["2021-03-25T22:00:00+00:00", "01:00:00", "EEST", -180], ["2021-10-28T21:59:59+00:00", "00:59:59", "EEST", -180], ["2021-10-28T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2022-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["2022-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["2022-10-27T21:59:59+00:00", "00:59:59", "EEST", -180], ["2022-10-27T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2023-03-30T21:59:59+00:00", "23:59:59", "EET", -120], ["2023-03-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["2023-10-26T21:59:59+00:00", "00:59:59", "EEST", -180], ["2023-10-26T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2024-03-28T21:59:59+00:00", "23:59:59", "EET", -120], ["2024-03-28T22:00:00+00:00", "01:00:00", "EEST", -180], ["2024-10-24T21:59:59+00:00", "00:59:59", "EEST", -180], ["2024-10-24T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2025-03-27T21:59:59+00:00", "23:59:59", "EET", -120], ["2025-03-27T22:00:00+00:00", "01:00:00", "EEST", -180], ["2025-10-30T21:59:59+00:00", "00:59:59", "EEST", -180], ["2025-10-30T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2026-03-26T21:59:59+00:00", "23:59:59", "EET", -120], ["2026-03-26T22:00:00+00:00", "01:00:00", "EEST", -180], ["2026-10-29T21:59:59+00:00", "00:59:59", "EEST", -180], ["2026-10-29T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2027-03-25T21:59:59+00:00", "23:59:59", "EET", -120], ["2027-03-25T22:00:00+00:00", "01:00:00", "EEST", -180], ["2027-10-28T21:59:59+00:00", "00:59:59", "EEST", -180], ["2027-10-28T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2028-03-30T21:59:59+00:00", "23:59:59", "EET", -120], ["2028-03-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["2028-10-26T21:59:59+00:00", "00:59:59", "EEST", -180], ["2028-10-26T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2029-03-29T21:59:59+00:00", "23:59:59", "EET", -120], ["2029-03-29T22:00:00+00:00", "01:00:00", "EEST", -180], ["2029-10-25T21:59:59+00:00", "00:59:59", "EEST", -180], ["2029-10-25T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2030-03-28T21:59:59+00:00", "23:59:59", "EET", -120], ["2030-03-28T22:00:00+00:00", "01:00:00", "EEST", -180], ["2030-10-24T21:59:59+00:00", "00:59:59", "EEST", -180], ["2030-10-24T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2031-03-27T21:59:59+00:00", "23:59:59", "EET", -120], ["2031-03-27T22:00:00+00:00", "01:00:00", "EEST", -180], ["2031-10-30T21:59:59+00:00", "00:59:59", "EEST", -180], ["2031-10-30T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2032-03-25T21:59:59+00:00", "23:59:59", "EET", -120], ["2032-03-25T22:00:00+00:00", "01:00:00", "EEST", -180], ["2032-10-28T21:59:59+00:00", "00:59:59", "EEST", -180], ["2032-10-28T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2033-03-31T21:59:59+00:00", "23:59:59", "EET", -120], ["2033-03-31T22:00:00+00:00", "01:00:00", "EEST", -180], ["2033-10-27T21:59:59+00:00", "00:59:59", "EEST", -180], ["2033-10-27T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2034-03-30T21:59:59+00:00", "23:59:59", "EET", -120], ["2034-03-30T22:00:00+00:00", "01:00:00", "EEST", -180], ["2034-10-26T21:59:59+00:00", "00:59:59", "EEST", -180], ["2034-10-26T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2035-03-29T21:59:59+00:00", "23:59:59", "EET", -120], ["2035-03-29T22:00:00+00:00", "01:00:00", "EEST", -180], ["2035-10-25T21:59:59+00:00", "00:59:59", "EEST", -180], ["2035-10-25T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2036-03-27T21:59:59+00:00", "23:59:59", "EET", -120], ["2036-03-27T22:00:00+00:00", "01:00:00", "EEST", -180], ["2036-10-30T21:59:59+00:00", "00:59:59", "EEST", -180], ["2036-10-30T22:00:00+00:00", "00:00:00", "EET", -120]]);
        helpers.testYear("Asia/Amman", [["2037-03-26T21:59:59+00:00", "23:59:59", "EET", -120], ["2037-03-26T22:00:00+00:00", "01:00:00", "EEST", -180], ["2037-10-29T21:59:59+00:00", "00:59:59", "EEST", -180], ["2037-10-29T22:00:00+00:00", "00:00:00", "EET", -120]]);
    });
});
