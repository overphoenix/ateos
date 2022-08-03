

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Europe/Gibraltar", () => {
        helpers.testYear("Europe/Gibraltar", [["1916-05-21T01:59:59+00:00", "01:59:59", "GMT", 0], ["1916-05-21T02:00:00+00:00", "03:00:00", "BST", -60], ["1916-10-01T01:59:59+00:00", "02:59:59", "BST", -60], ["1916-10-01T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1917-04-08T01:59:59+00:00", "01:59:59", "GMT", 0], ["1917-04-08T02:00:00+00:00", "03:00:00", "BST", -60], ["1917-09-17T01:59:59+00:00", "02:59:59", "BST", -60], ["1917-09-17T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1918-03-24T01:59:59+00:00", "01:59:59", "GMT", 0], ["1918-03-24T02:00:00+00:00", "03:00:00", "BST", -60], ["1918-09-30T01:59:59+00:00", "02:59:59", "BST", -60], ["1918-09-30T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1919-03-30T01:59:59+00:00", "01:59:59", "GMT", 0], ["1919-03-30T02:00:00+00:00", "03:00:00", "BST", -60], ["1919-09-29T01:59:59+00:00", "02:59:59", "BST", -60], ["1919-09-29T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1920-03-28T01:59:59+00:00", "01:59:59", "GMT", 0], ["1920-03-28T02:00:00+00:00", "03:00:00", "BST", -60], ["1920-10-25T01:59:59+00:00", "02:59:59", "BST", -60], ["1920-10-25T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1921-04-03T01:59:59+00:00", "01:59:59", "GMT", 0], ["1921-04-03T02:00:00+00:00", "03:00:00", "BST", -60], ["1921-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1921-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1922-03-26T01:59:59+00:00", "01:59:59", "GMT", 0], ["1922-03-26T02:00:00+00:00", "03:00:00", "BST", -60], ["1922-10-08T01:59:59+00:00", "02:59:59", "BST", -60], ["1922-10-08T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1923-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1923-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1923-09-16T01:59:59+00:00", "02:59:59", "BST", -60], ["1923-09-16T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1924-04-13T01:59:59+00:00", "01:59:59", "GMT", 0], ["1924-04-13T02:00:00+00:00", "03:00:00", "BST", -60], ["1924-09-21T01:59:59+00:00", "02:59:59", "BST", -60], ["1924-09-21T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1925-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1925-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1925-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1925-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1926-04-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1926-04-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1926-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1926-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1927-04-10T01:59:59+00:00", "01:59:59", "GMT", 0], ["1927-04-10T02:00:00+00:00", "03:00:00", "BST", -60], ["1927-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1927-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1928-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1928-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1928-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1928-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1929-04-21T01:59:59+00:00", "01:59:59", "GMT", 0], ["1929-04-21T02:00:00+00:00", "03:00:00", "BST", -60], ["1929-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1929-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1930-04-13T01:59:59+00:00", "01:59:59", "GMT", 0], ["1930-04-13T02:00:00+00:00", "03:00:00", "BST", -60], ["1930-10-05T01:59:59+00:00", "02:59:59", "BST", -60], ["1930-10-05T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1931-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1931-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1931-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1931-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1932-04-17T01:59:59+00:00", "01:59:59", "GMT", 0], ["1932-04-17T02:00:00+00:00", "03:00:00", "BST", -60], ["1932-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1932-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1933-04-09T01:59:59+00:00", "01:59:59", "GMT", 0], ["1933-04-09T02:00:00+00:00", "03:00:00", "BST", -60], ["1933-10-08T01:59:59+00:00", "02:59:59", "BST", -60], ["1933-10-08T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1934-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1934-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1934-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1934-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1935-04-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1935-04-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1935-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1935-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1936-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1936-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1936-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1936-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1937-04-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1937-04-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1937-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1937-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1938-04-10T01:59:59+00:00", "01:59:59", "GMT", 0], ["1938-04-10T02:00:00+00:00", "03:00:00", "BST", -60], ["1938-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1938-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1939-04-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1939-04-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1939-11-19T01:59:59+00:00", "02:59:59", "BST", -60], ["1939-11-19T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1940-02-25T01:59:59+00:00", "01:59:59", "GMT", 0], ["1940-02-25T02:00:00+00:00", "03:00:00", "BST", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1941-05-04T00:59:59+00:00", "01:59:59", "BST", -60], ["1941-05-04T01:00:00+00:00", "03:00:00", "BDST", -120], ["1941-08-10T00:59:59+00:00", "02:59:59", "BDST", -120], ["1941-08-10T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1942-04-05T00:59:59+00:00", "01:59:59", "BST", -60], ["1942-04-05T01:00:00+00:00", "03:00:00", "BDST", -120], ["1942-08-09T00:59:59+00:00", "02:59:59", "BDST", -120], ["1942-08-09T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1943-04-04T00:59:59+00:00", "01:59:59", "BST", -60], ["1943-04-04T01:00:00+00:00", "03:00:00", "BDST", -120], ["1943-08-15T00:59:59+00:00", "02:59:59", "BDST", -120], ["1943-08-15T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1944-04-02T00:59:59+00:00", "01:59:59", "BST", -60], ["1944-04-02T01:00:00+00:00", "03:00:00", "BDST", -120], ["1944-09-17T00:59:59+00:00", "02:59:59", "BDST", -120], ["1944-09-17T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1945-04-02T00:59:59+00:00", "01:59:59", "BST", -60], ["1945-04-02T01:00:00+00:00", "03:00:00", "BDST", -120], ["1945-07-15T00:59:59+00:00", "02:59:59", "BDST", -120], ["1945-07-15T01:00:00+00:00", "02:00:00", "BST", -60], ["1945-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1945-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1946-04-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1946-04-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1946-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1946-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1947-03-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1947-03-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1947-04-13T00:59:59+00:00", "01:59:59", "BST", -60], ["1947-04-13T01:00:00+00:00", "03:00:00", "BDST", -120], ["1947-08-10T00:59:59+00:00", "02:59:59", "BDST", -120], ["1947-08-10T01:00:00+00:00", "02:00:00", "BST", -60], ["1947-11-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1947-11-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1948-03-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1948-03-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1948-10-31T01:59:59+00:00", "02:59:59", "BST", -60], ["1948-10-31T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1949-04-03T01:59:59+00:00", "01:59:59", "GMT", 0], ["1949-04-03T02:00:00+00:00", "03:00:00", "BST", -60], ["1949-10-30T01:59:59+00:00", "02:59:59", "BST", -60], ["1949-10-30T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1950-04-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1950-04-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1950-10-22T01:59:59+00:00", "02:59:59", "BST", -60], ["1950-10-22T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1951-04-15T01:59:59+00:00", "01:59:59", "GMT", 0], ["1951-04-15T02:00:00+00:00", "03:00:00", "BST", -60], ["1951-10-21T01:59:59+00:00", "02:59:59", "BST", -60], ["1951-10-21T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1952-04-20T01:59:59+00:00", "01:59:59", "GMT", 0], ["1952-04-20T02:00:00+00:00", "03:00:00", "BST", -60], ["1952-10-26T01:59:59+00:00", "02:59:59", "BST", -60], ["1952-10-26T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1953-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1953-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1953-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1953-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1954-04-11T01:59:59+00:00", "01:59:59", "GMT", 0], ["1954-04-11T02:00:00+00:00", "03:00:00", "BST", -60], ["1954-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1954-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1955-04-17T01:59:59+00:00", "01:59:59", "GMT", 0], ["1955-04-17T02:00:00+00:00", "03:00:00", "BST", -60], ["1955-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1955-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1956-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1956-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1956-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1956-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Gibraltar", [["1957-04-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1957-04-14T02:00:00+00:00", "03:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1982-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["1982-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["1982-09-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["1982-09-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1983-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["1983-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["1983-09-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["1983-09-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1984-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["1984-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["1984-09-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["1984-09-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1985-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["1985-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["1985-09-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["1985-09-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1986-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["1986-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["1986-09-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["1986-09-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1987-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["1987-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["1987-09-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["1987-09-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1988-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["1988-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["1988-09-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["1988-09-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1989-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["1989-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["1989-09-24T00:59:59+00:00", "02:59:59", "CEST", -120], ["1989-09-24T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1990-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["1990-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["1990-09-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["1990-09-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1991-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["1991-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["1991-09-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["1991-09-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1992-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["1992-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["1992-09-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["1992-09-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1993-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["1993-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["1993-09-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["1993-09-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1994-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["1994-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["1994-09-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["1994-09-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1995-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["1995-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["1995-09-24T00:59:59+00:00", "02:59:59", "CEST", -120], ["1995-09-24T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1996-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["1996-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["1996-10-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["1996-10-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1997-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["1997-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["1997-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["1997-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1998-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["1998-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["1998-10-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["1998-10-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["1999-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["1999-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["1999-10-31T00:59:59+00:00", "02:59:59", "CEST", -120], ["1999-10-31T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2000-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["2000-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["2000-10-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["2000-10-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2001-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["2001-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["2001-10-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["2001-10-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2002-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["2002-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["2002-10-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["2002-10-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2003-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["2003-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["2003-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["2003-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2004-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["2004-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["2004-10-31T00:59:59+00:00", "02:59:59", "CEST", -120], ["2004-10-31T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2005-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["2005-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["2005-10-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["2005-10-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2006-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["2006-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["2006-10-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["2006-10-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2007-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["2007-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["2007-10-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["2007-10-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2008-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["2008-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["2008-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["2008-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2009-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["2009-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["2009-10-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["2009-10-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2010-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["2010-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["2010-10-31T00:59:59+00:00", "02:59:59", "CEST", -120], ["2010-10-31T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2011-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["2011-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["2011-10-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["2011-10-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2012-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["2012-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["2012-10-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["2012-10-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2013-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["2013-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["2013-10-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["2013-10-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2014-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["2014-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["2014-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["2014-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2015-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["2015-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["2015-10-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["2015-10-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2016-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["2016-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["2016-10-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["2016-10-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2017-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["2017-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["2017-10-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["2017-10-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2018-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["2018-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["2018-10-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["2018-10-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2019-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["2019-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["2019-10-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["2019-10-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2020-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["2020-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["2020-10-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["2020-10-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2021-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["2021-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["2021-10-31T00:59:59+00:00", "02:59:59", "CEST", -120], ["2021-10-31T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2022-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["2022-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["2022-10-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["2022-10-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2023-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["2023-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["2023-10-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["2023-10-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2024-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["2024-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["2024-10-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["2024-10-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2025-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["2025-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["2025-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["2025-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2026-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["2026-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["2026-10-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["2026-10-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2027-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["2027-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["2027-10-31T00:59:59+00:00", "02:59:59", "CEST", -120], ["2027-10-31T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2028-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["2028-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["2028-10-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["2028-10-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2029-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["2029-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["2029-10-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["2029-10-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2030-03-31T00:59:59+00:00", "01:59:59", "CET", -60], ["2030-03-31T01:00:00+00:00", "03:00:00", "CEST", -120], ["2030-10-27T00:59:59+00:00", "02:59:59", "CEST", -120], ["2030-10-27T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2031-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["2031-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["2031-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["2031-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2032-03-28T00:59:59+00:00", "01:59:59", "CET", -60], ["2032-03-28T01:00:00+00:00", "03:00:00", "CEST", -120], ["2032-10-31T00:59:59+00:00", "02:59:59", "CEST", -120], ["2032-10-31T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2033-03-27T00:59:59+00:00", "01:59:59", "CET", -60], ["2033-03-27T01:00:00+00:00", "03:00:00", "CEST", -120], ["2033-10-30T00:59:59+00:00", "02:59:59", "CEST", -120], ["2033-10-30T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2034-03-26T00:59:59+00:00", "01:59:59", "CET", -60], ["2034-03-26T01:00:00+00:00", "03:00:00", "CEST", -120], ["2034-10-29T00:59:59+00:00", "02:59:59", "CEST", -120], ["2034-10-29T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2035-03-25T00:59:59+00:00", "01:59:59", "CET", -60], ["2035-03-25T01:00:00+00:00", "03:00:00", "CEST", -120], ["2035-10-28T00:59:59+00:00", "02:59:59", "CEST", -120], ["2035-10-28T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2036-03-30T00:59:59+00:00", "01:59:59", "CET", -60], ["2036-03-30T01:00:00+00:00", "03:00:00", "CEST", -120], ["2036-10-26T00:59:59+00:00", "02:59:59", "CEST", -120], ["2036-10-26T01:00:00+00:00", "02:00:00", "CET", -60]]);
        helpers.testYear("Europe/Gibraltar", [["2037-03-29T00:59:59+00:00", "01:59:59", "CET", -60], ["2037-03-29T01:00:00+00:00", "03:00:00", "CEST", -120], ["2037-10-25T00:59:59+00:00", "02:59:59", "CEST", -120], ["2037-10-25T01:00:00+00:00", "02:00:00", "CET", -60]]);
    });
});
