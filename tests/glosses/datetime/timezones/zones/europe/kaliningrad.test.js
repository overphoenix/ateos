

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Europe/Kaliningrad", () => {
        helpers.testYear("Europe/Kaliningrad", [["1916-04-30T21:59:59+00:00", "22:59:59", "CET", -60], ["1916-04-30T22:00:00+00:00", "00:00:00", "CEST", -120], ["1916-09-30T22:59:59+00:00", "00:59:59", "CEST", -120], ["1916-09-30T23:00:00+00:00", "00:00:00", "CET", -60]]);
        helpers.testYear("Europe/Kaliningrad", [["1917-04-16T00:59:59+00:00", "01:59:59", "CET", -60], ["1917-04-16T01:00:00+00:00", "03:00:00", "CEST", -120], ["1917-09-17T00:59:59+00:00", "02:59:59", "CEST", -120], ["1917-09-17T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Kaliningrad", [["1918-04-15T00:59:59+00:00", "01:59:59", "CET", -60], ["1918-04-15T01:00:00+00:00", "03:00:00", "CEST", -120], ["1918-09-16T00:59:59+00:00", "02:59:59", "CEST", -120], ["1918-09-16T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Kaliningrad", [["1940-04-01T00:59:59+00:00", "01:59:59", "CET", -60], ["1940-04-01T01:00:00+00:00", "03:00:00", "CEST", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1942-11-02T00:59:59+00:00", "02:59:59", "CEST", -120], ["1942-11-02T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Kaliningrad", [["1943-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["1943-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["1943-10-04T00:59:59+00:00", "02:59:59", "CEST", -120], ["1943-10-04T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Kaliningrad", [["1944-04-03T00:59:59+00:00", "01:59:59", "CET", -60], ["1944-04-03T01:00:00+00:00", "03:00:00", "CEST", -120], ["1944-10-02T00:59:59+00:00", "02:59:59", "CEST", -120], ["1944-10-02T01:00:00+00:00", "02:00:00", "CET", -60], ["1944-12-31T22:59:59+00:00", "23:59:59", "CET", -60], ["1944-12-31T23:00:00+00:00", "01:00:00", "CET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1945-04-28T21:59:59+00:00", "23:59:59", "CET", -120], ["1945-04-28T22:00:00+00:00", "01:00:00", "CEST", -180], ["1945-10-31T20:59:59+00:00", "23:59:59", "CEST", -180], ["1945-10-31T21:00:00+00:00", "23:00:00", "CET", -120], ["1945-12-31T21:59:59+00:00", "23:59:59", "CET", -120], ["1945-12-31T22:00:00+00:00", "01:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1981-03-31T20:59:59+00:00", "23:59:59", "MSK", -180], ["1981-03-31T21:00:00+00:00", "01:00:00", "MSD", -240], ["1981-09-30T19:59:59+00:00", "23:59:59", "MSD", -240], ["1981-09-30T20:00:00+00:00", "23:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1982-03-31T20:59:59+00:00", "23:59:59", "MSK", -180], ["1982-03-31T21:00:00+00:00", "01:00:00", "MSD", -240], ["1982-09-30T19:59:59+00:00", "23:59:59", "MSD", -240], ["1982-09-30T20:00:00+00:00", "23:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1983-03-31T20:59:59+00:00", "23:59:59", "MSK", -180], ["1983-03-31T21:00:00+00:00", "01:00:00", "MSD", -240], ["1983-09-30T19:59:59+00:00", "23:59:59", "MSD", -240], ["1983-09-30T20:00:00+00:00", "23:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1984-03-31T20:59:59+00:00", "23:59:59", "MSK", -180], ["1984-03-31T21:00:00+00:00", "01:00:00", "MSD", -240], ["1984-09-29T22:59:59+00:00", "02:59:59", "MSD", -240], ["1984-09-29T23:00:00+00:00", "02:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1985-03-30T22:59:59+00:00", "01:59:59", "MSK", -180], ["1985-03-30T23:00:00+00:00", "03:00:00", "MSD", -240], ["1985-09-28T22:59:59+00:00", "02:59:59", "MSD", -240], ["1985-09-28T23:00:00+00:00", "02:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1986-03-29T22:59:59+00:00", "01:59:59", "MSK", -180], ["1986-03-29T23:00:00+00:00", "03:00:00", "MSD", -240], ["1986-09-27T22:59:59+00:00", "02:59:59", "MSD", -240], ["1986-09-27T23:00:00+00:00", "02:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1987-03-28T22:59:59+00:00", "01:59:59", "MSK", -180], ["1987-03-28T23:00:00+00:00", "03:00:00", "MSD", -240], ["1987-09-26T22:59:59+00:00", "02:59:59", "MSD", -240], ["1987-09-26T23:00:00+00:00", "02:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1988-03-26T22:59:59+00:00", "01:59:59", "MSK", -180], ["1988-03-26T23:00:00+00:00", "03:00:00", "MSD", -240], ["1988-09-24T22:59:59+00:00", "02:59:59", "MSD", -240], ["1988-09-24T23:00:00+00:00", "02:00:00", "MSK", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["1989-03-25T22:59:59+00:00", "01:59:59", "MSK", -180], ["1989-03-25T23:00:00+00:00", "02:00:00", "EEST", -180], ["1989-09-23T23:59:59+00:00", "02:59:59", "EEST", -180], ["1989-09-24T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1990-03-24T23:59:59+00:00", "01:59:59", "EET", -120], ["1990-03-25T00:00:00+00:00", "03:00:00", "EEST", -180], ["1990-09-29T23:59:59+00:00", "02:59:59", "EEST", -180], ["1990-09-30T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1991-03-30T23:59:59+00:00", "01:59:59", "EET", -120], ["1991-03-31T00:00:00+00:00", "03:00:00", "EEST", -180], ["1991-09-28T23:59:59+00:00", "02:59:59", "EEST", -180], ["1991-09-29T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1992-03-28T23:59:59+00:00", "01:59:59", "EET", -120], ["1992-03-29T00:00:00+00:00", "03:00:00", "EEST", -180], ["1992-09-26T23:59:59+00:00", "02:59:59", "EEST", -180], ["1992-09-27T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1993-03-27T23:59:59+00:00", "01:59:59", "EET", -120], ["1993-03-28T00:00:00+00:00", "03:00:00", "EEST", -180], ["1993-09-25T23:59:59+00:00", "02:59:59", "EEST", -180], ["1993-09-26T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1994-03-26T23:59:59+00:00", "01:59:59", "EET", -120], ["1994-03-27T00:00:00+00:00", "03:00:00", "EEST", -180], ["1994-09-24T23:59:59+00:00", "02:59:59", "EEST", -180], ["1994-09-25T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1995-03-25T23:59:59+00:00", "01:59:59", "EET", -120], ["1995-03-26T00:00:00+00:00", "03:00:00", "EEST", -180], ["1995-09-23T23:59:59+00:00", "02:59:59", "EEST", -180], ["1995-09-24T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1996-03-30T23:59:59+00:00", "01:59:59", "EET", -120], ["1996-03-31T00:00:00+00:00", "03:00:00", "EEST", -180], ["1996-10-26T23:59:59+00:00", "02:59:59", "EEST", -180], ["1996-10-27T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1997-03-29T23:59:59+00:00", "01:59:59", "EET", -120], ["1997-03-30T00:00:00+00:00", "03:00:00", "EEST", -180], ["1997-10-25T23:59:59+00:00", "02:59:59", "EEST", -180], ["1997-10-26T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1998-03-28T23:59:59+00:00", "01:59:59", "EET", -120], ["1998-03-29T00:00:00+00:00", "03:00:00", "EEST", -180], ["1998-10-24T23:59:59+00:00", "02:59:59", "EEST", -180], ["1998-10-25T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["1999-03-27T23:59:59+00:00", "01:59:59", "EET", -120], ["1999-03-28T00:00:00+00:00", "03:00:00", "EEST", -180], ["1999-10-30T23:59:59+00:00", "02:59:59", "EEST", -180], ["1999-10-31T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2000-03-25T23:59:59+00:00", "01:59:59", "EET", -120], ["2000-03-26T00:00:00+00:00", "03:00:00", "EEST", -180], ["2000-10-28T23:59:59+00:00", "02:59:59", "EEST", -180], ["2000-10-29T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2001-03-24T23:59:59+00:00", "01:59:59", "EET", -120], ["2001-03-25T00:00:00+00:00", "03:00:00", "EEST", -180], ["2001-10-27T23:59:59+00:00", "02:59:59", "EEST", -180], ["2001-10-28T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2002-03-30T23:59:59+00:00", "01:59:59", "EET", -120], ["2002-03-31T00:00:00+00:00", "03:00:00", "EEST", -180], ["2002-10-26T23:59:59+00:00", "02:59:59", "EEST", -180], ["2002-10-27T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2003-03-29T23:59:59+00:00", "01:59:59", "EET", -120], ["2003-03-30T00:00:00+00:00", "03:00:00", "EEST", -180], ["2003-10-25T23:59:59+00:00", "02:59:59", "EEST", -180], ["2003-10-26T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2004-03-27T23:59:59+00:00", "01:59:59", "EET", -120], ["2004-03-28T00:00:00+00:00", "03:00:00", "EEST", -180], ["2004-10-30T23:59:59+00:00", "02:59:59", "EEST", -180], ["2004-10-31T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2005-03-26T23:59:59+00:00", "01:59:59", "EET", -120], ["2005-03-27T00:00:00+00:00", "03:00:00", "EEST", -180], ["2005-10-29T23:59:59+00:00", "02:59:59", "EEST", -180], ["2005-10-30T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2006-03-25T23:59:59+00:00", "01:59:59", "EET", -120], ["2006-03-26T00:00:00+00:00", "03:00:00", "EEST", -180], ["2006-10-28T23:59:59+00:00", "02:59:59", "EEST", -180], ["2006-10-29T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2007-03-24T23:59:59+00:00", "01:59:59", "EET", -120], ["2007-03-25T00:00:00+00:00", "03:00:00", "EEST", -180], ["2007-10-27T23:59:59+00:00", "02:59:59", "EEST", -180], ["2007-10-28T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2008-03-29T23:59:59+00:00", "01:59:59", "EET", -120], ["2008-03-30T00:00:00+00:00", "03:00:00", "EEST", -180], ["2008-10-25T23:59:59+00:00", "02:59:59", "EEST", -180], ["2008-10-26T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2009-03-28T23:59:59+00:00", "01:59:59", "EET", -120], ["2009-03-29T00:00:00+00:00", "03:00:00", "EEST", -180], ["2009-10-24T23:59:59+00:00", "02:59:59", "EEST", -180], ["2009-10-25T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2010-03-27T23:59:59+00:00", "01:59:59", "EET", -120], ["2010-03-28T00:00:00+00:00", "03:00:00", "EEST", -180], ["2010-10-30T23:59:59+00:00", "02:59:59", "EEST", -180], ["2010-10-31T00:00:00+00:00", "02:00:00", "EET", -120]]);
        helpers.testYear("Europe/Kaliningrad", [["2011-03-26T23:59:59+00:00", "01:59:59", "EET", -120], ["2011-03-27T00:00:00+00:00", "03:00:00", "+03", -180]]);
        helpers.testYear("Europe/Kaliningrad", [["2014-10-25T22:59:59+00:00", "01:59:59", "+03", -180], ["2014-10-25T23:00:00+00:00", "01:00:00", "EET", -120]]);
    });
});
