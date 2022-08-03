

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("America/Montreal", () => {
        helpers.testYear("America/Montreal", [["1918-04-14T06:59:59+00:00", "01:59:59", "EST", 300], ["1918-04-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["1918-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1918-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1919-03-31T04:29:59+00:00", "23:29:59", "EST", 300], ["1919-03-31T04:30:00+00:00", "00:30:00", "EDT", 240], ["1919-10-26T03:59:59+00:00", "23:59:59", "EDT", 240], ["1919-10-26T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1920-05-02T06:59:59+00:00", "01:59:59", "EST", 300], ["1920-05-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["1920-09-26T03:59:59+00:00", "23:59:59", "EDT", 240], ["1920-09-26T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1921-05-15T06:59:59+00:00", "01:59:59", "EST", 300], ["1921-05-15T07:00:00+00:00", "03:00:00", "EDT", 240], ["1921-09-15T05:59:59+00:00", "01:59:59", "EDT", 240], ["1921-09-15T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1922-05-14T06:59:59+00:00", "01:59:59", "EST", 300], ["1922-05-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["1922-09-17T05:59:59+00:00", "01:59:59", "EDT", 240], ["1922-09-17T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1923-05-13T06:59:59+00:00", "01:59:59", "EST", 300], ["1923-05-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["1923-09-16T05:59:59+00:00", "01:59:59", "EDT", 240], ["1923-09-16T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1924-05-04T06:59:59+00:00", "01:59:59", "EST", 300], ["1924-05-04T07:00:00+00:00", "03:00:00", "EDT", 240], ["1924-09-21T05:59:59+00:00", "01:59:59", "EDT", 240], ["1924-09-21T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1925-05-03T06:59:59+00:00", "01:59:59", "EST", 300], ["1925-05-03T07:00:00+00:00", "03:00:00", "EDT", 240], ["1925-09-20T05:59:59+00:00", "01:59:59", "EDT", 240], ["1925-09-20T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1926-05-02T06:59:59+00:00", "01:59:59", "EST", 300], ["1926-05-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["1926-09-19T05:59:59+00:00", "01:59:59", "EDT", 240], ["1926-09-19T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1927-05-01T06:59:59+00:00", "01:59:59", "EST", 300], ["1927-05-01T07:00:00+00:00", "03:00:00", "EDT", 240], ["1927-09-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1927-09-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1928-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1928-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1928-09-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1928-09-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1929-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1929-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1929-09-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1929-09-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1930-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1930-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1930-09-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1930-09-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1931-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1931-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1931-09-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1931-09-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1932-05-01T06:59:59+00:00", "01:59:59", "EST", 300], ["1932-05-01T07:00:00+00:00", "03:00:00", "EDT", 240], ["1932-09-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1932-09-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1933-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1933-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1933-10-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["1933-10-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1934-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1934-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1934-09-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1934-09-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1935-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1935-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1935-09-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1935-09-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1936-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1936-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1936-09-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1936-09-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1937-04-25T06:59:59+00:00", "01:59:59", "EST", 300], ["1937-04-25T07:00:00+00:00", "03:00:00", "EDT", 240], ["1937-09-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1937-09-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1938-04-24T06:59:59+00:00", "01:59:59", "EST", 300], ["1938-04-24T07:00:00+00:00", "03:00:00", "EDT", 240], ["1938-09-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1938-09-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1939-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1939-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1939-09-24T05:59:59+00:00", "01:59:59", "EDT", 240], ["1939-09-24T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1940-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1940-04-28T07:00:00+00:00", "03:00:00", "EDT", 240]]);
        helpers.testYear("America/Montreal", [["1942-02-09T06:59:59+00:00", "02:59:59", "EDT", 240], ["1942-02-09T07:00:00+00:00", "03:00:00", "EWT", 240]]);
        helpers.testYear("America/Montreal", [["1945-08-14T22:59:59+00:00", "18:59:59", "EWT", 240], ["1945-08-14T23:00:00+00:00", "19:00:00", "EPT", 240], ["1945-09-30T05:59:59+00:00", "01:59:59", "EPT", 240], ["1945-09-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1946-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1946-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1946-09-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1946-09-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1947-04-27T04:59:59+00:00", "23:59:59", "EST", 300], ["1947-04-27T05:00:00+00:00", "01:00:00", "EDT", 240], ["1947-09-28T03:59:59+00:00", "23:59:59", "EDT", 240], ["1947-09-28T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1948-04-25T04:59:59+00:00", "23:59:59", "EST", 300], ["1948-04-25T05:00:00+00:00", "01:00:00", "EDT", 240], ["1948-09-26T03:59:59+00:00", "23:59:59", "EDT", 240], ["1948-09-26T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1949-04-24T04:59:59+00:00", "23:59:59", "EST", 300], ["1949-04-24T05:00:00+00:00", "01:00:00", "EDT", 240], ["1949-11-27T03:59:59+00:00", "23:59:59", "EDT", 240], ["1949-11-27T04:00:00+00:00", "23:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1950-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1950-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1950-11-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1950-11-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1951-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1951-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1951-09-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1951-09-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1952-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1952-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1952-09-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1952-09-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1953-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1953-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1953-09-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1953-09-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1954-04-25T06:59:59+00:00", "01:59:59", "EST", 300], ["1954-04-25T07:00:00+00:00", "03:00:00", "EDT", 240], ["1954-09-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1954-09-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1955-04-24T06:59:59+00:00", "01:59:59", "EST", 300], ["1955-04-24T07:00:00+00:00", "03:00:00", "EDT", 240], ["1955-09-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1955-09-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1956-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1956-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1956-09-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1956-09-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1957-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1957-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1957-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1957-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1958-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1958-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1958-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1958-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1959-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1959-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1959-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1959-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1960-04-24T06:59:59+00:00", "01:59:59", "EST", 300], ["1960-04-24T07:00:00+00:00", "03:00:00", "EDT", 240], ["1960-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1960-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1961-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1961-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1961-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1961-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1962-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1962-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1962-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1962-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1963-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1963-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1963-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1963-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1964-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1964-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1964-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1964-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1965-04-25T06:59:59+00:00", "01:59:59", "EST", 300], ["1965-04-25T07:00:00+00:00", "03:00:00", "EDT", 240], ["1965-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1965-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1966-04-24T06:59:59+00:00", "01:59:59", "EST", 300], ["1966-04-24T07:00:00+00:00", "03:00:00", "EDT", 240], ["1966-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1966-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1967-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1967-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1967-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1967-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1968-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1968-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1968-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1968-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1969-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1969-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1969-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1969-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1970-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1970-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1970-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1970-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1971-04-25T06:59:59+00:00", "01:59:59", "EST", 300], ["1971-04-25T07:00:00+00:00", "03:00:00", "EDT", 240], ["1971-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1971-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1972-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1972-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1972-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1972-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1973-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1973-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1973-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1973-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1974-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1974-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1974-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1974-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1975-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1975-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1975-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1975-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1976-04-25T06:59:59+00:00", "01:59:59", "EST", 300], ["1976-04-25T07:00:00+00:00", "03:00:00", "EDT", 240], ["1976-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1976-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1977-04-24T06:59:59+00:00", "01:59:59", "EST", 300], ["1977-04-24T07:00:00+00:00", "03:00:00", "EDT", 240], ["1977-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1977-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1978-04-30T06:59:59+00:00", "01:59:59", "EST", 300], ["1978-04-30T07:00:00+00:00", "03:00:00", "EDT", 240], ["1978-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1978-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1979-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1979-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1979-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1979-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1980-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1980-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1980-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1980-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1981-04-26T06:59:59+00:00", "01:59:59", "EST", 300], ["1981-04-26T07:00:00+00:00", "03:00:00", "EDT", 240], ["1981-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1981-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1982-04-25T06:59:59+00:00", "01:59:59", "EST", 300], ["1982-04-25T07:00:00+00:00", "03:00:00", "EDT", 240], ["1982-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1982-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1983-04-24T06:59:59+00:00", "01:59:59", "EST", 300], ["1983-04-24T07:00:00+00:00", "03:00:00", "EDT", 240], ["1983-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1983-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1984-04-29T06:59:59+00:00", "01:59:59", "EST", 300], ["1984-04-29T07:00:00+00:00", "03:00:00", "EDT", 240], ["1984-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1984-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1985-04-28T06:59:59+00:00", "01:59:59", "EST", 300], ["1985-04-28T07:00:00+00:00", "03:00:00", "EDT", 240], ["1985-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1985-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1986-04-27T06:59:59+00:00", "01:59:59", "EST", 300], ["1986-04-27T07:00:00+00:00", "03:00:00", "EDT", 240], ["1986-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1986-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1987-04-05T06:59:59+00:00", "01:59:59", "EST", 300], ["1987-04-05T07:00:00+00:00", "03:00:00", "EDT", 240], ["1987-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1987-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1988-04-03T06:59:59+00:00", "01:59:59", "EST", 300], ["1988-04-03T07:00:00+00:00", "03:00:00", "EDT", 240], ["1988-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1988-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1989-04-02T06:59:59+00:00", "01:59:59", "EST", 300], ["1989-04-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["1989-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1989-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1990-04-01T06:59:59+00:00", "01:59:59", "EST", 300], ["1990-04-01T07:00:00+00:00", "03:00:00", "EDT", 240], ["1990-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["1990-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1991-04-07T06:59:59+00:00", "01:59:59", "EST", 300], ["1991-04-07T07:00:00+00:00", "03:00:00", "EDT", 240], ["1991-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1991-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1992-04-05T06:59:59+00:00", "01:59:59", "EST", 300], ["1992-04-05T07:00:00+00:00", "03:00:00", "EDT", 240], ["1992-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1992-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1993-04-04T06:59:59+00:00", "01:59:59", "EST", 300], ["1993-04-04T07:00:00+00:00", "03:00:00", "EDT", 240], ["1993-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1993-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1994-04-03T06:59:59+00:00", "01:59:59", "EST", 300], ["1994-04-03T07:00:00+00:00", "03:00:00", "EDT", 240], ["1994-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["1994-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1995-04-02T06:59:59+00:00", "01:59:59", "EST", 300], ["1995-04-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["1995-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["1995-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1996-04-07T06:59:59+00:00", "01:59:59", "EST", 300], ["1996-04-07T07:00:00+00:00", "03:00:00", "EDT", 240], ["1996-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["1996-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1997-04-06T06:59:59+00:00", "01:59:59", "EST", 300], ["1997-04-06T07:00:00+00:00", "03:00:00", "EDT", 240], ["1997-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["1997-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1998-04-05T06:59:59+00:00", "01:59:59", "EST", 300], ["1998-04-05T07:00:00+00:00", "03:00:00", "EDT", 240], ["1998-10-25T05:59:59+00:00", "01:59:59", "EDT", 240], ["1998-10-25T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["1999-04-04T06:59:59+00:00", "01:59:59", "EST", 300], ["1999-04-04T07:00:00+00:00", "03:00:00", "EDT", 240], ["1999-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["1999-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2000-04-02T06:59:59+00:00", "01:59:59", "EST", 300], ["2000-04-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["2000-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["2000-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2001-04-01T06:59:59+00:00", "01:59:59", "EST", 300], ["2001-04-01T07:00:00+00:00", "03:00:00", "EDT", 240], ["2001-10-28T05:59:59+00:00", "01:59:59", "EDT", 240], ["2001-10-28T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2002-04-07T06:59:59+00:00", "01:59:59", "EST", 300], ["2002-04-07T07:00:00+00:00", "03:00:00", "EDT", 240], ["2002-10-27T05:59:59+00:00", "01:59:59", "EDT", 240], ["2002-10-27T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2003-04-06T06:59:59+00:00", "01:59:59", "EST", 300], ["2003-04-06T07:00:00+00:00", "03:00:00", "EDT", 240], ["2003-10-26T05:59:59+00:00", "01:59:59", "EDT", 240], ["2003-10-26T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2004-04-04T06:59:59+00:00", "01:59:59", "EST", 300], ["2004-04-04T07:00:00+00:00", "03:00:00", "EDT", 240], ["2004-10-31T05:59:59+00:00", "01:59:59", "EDT", 240], ["2004-10-31T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2005-04-03T06:59:59+00:00", "01:59:59", "EST", 300], ["2005-04-03T07:00:00+00:00", "03:00:00", "EDT", 240], ["2005-10-30T05:59:59+00:00", "01:59:59", "EDT", 240], ["2005-10-30T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2006-04-02T06:59:59+00:00", "01:59:59", "EST", 300], ["2006-04-02T07:00:00+00:00", "03:00:00", "EDT", 240], ["2006-10-29T05:59:59+00:00", "01:59:59", "EDT", 240], ["2006-10-29T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2007-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2007-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2007-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2007-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2008-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2008-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2008-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2008-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2009-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2009-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2009-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2009-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2010-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2010-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2010-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2010-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2011-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2011-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2011-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2011-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2012-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2012-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2012-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2012-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2013-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2013-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2013-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2013-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2014-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2014-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2014-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2014-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2015-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2015-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2015-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2015-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2016-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2016-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2016-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2016-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2017-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2017-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2017-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2017-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2018-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2018-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2018-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2018-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2019-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2019-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2019-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2019-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2020-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2020-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2020-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2020-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2021-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2021-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2021-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2021-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2022-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2022-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2022-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2022-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2023-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2023-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2023-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2023-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2024-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2024-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2024-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2024-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2025-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2025-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2025-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2025-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2026-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2026-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2026-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2026-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2027-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2027-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2027-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2027-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2028-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2028-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2028-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2028-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2029-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2029-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2029-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2029-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2030-03-10T06:59:59+00:00", "01:59:59", "EST", 300], ["2030-03-10T07:00:00+00:00", "03:00:00", "EDT", 240], ["2030-11-03T05:59:59+00:00", "01:59:59", "EDT", 240], ["2030-11-03T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2031-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2031-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2031-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2031-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2032-03-14T06:59:59+00:00", "01:59:59", "EST", 300], ["2032-03-14T07:00:00+00:00", "03:00:00", "EDT", 240], ["2032-11-07T05:59:59+00:00", "01:59:59", "EDT", 240], ["2032-11-07T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2033-03-13T06:59:59+00:00", "01:59:59", "EST", 300], ["2033-03-13T07:00:00+00:00", "03:00:00", "EDT", 240], ["2033-11-06T05:59:59+00:00", "01:59:59", "EDT", 240], ["2033-11-06T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2034-03-12T06:59:59+00:00", "01:59:59", "EST", 300], ["2034-03-12T07:00:00+00:00", "03:00:00", "EDT", 240], ["2034-11-05T05:59:59+00:00", "01:59:59", "EDT", 240], ["2034-11-05T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2035-03-11T06:59:59+00:00", "01:59:59", "EST", 300], ["2035-03-11T07:00:00+00:00", "03:00:00", "EDT", 240], ["2035-11-04T05:59:59+00:00", "01:59:59", "EDT", 240], ["2035-11-04T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2036-03-09T06:59:59+00:00", "01:59:59", "EST", 300], ["2036-03-09T07:00:00+00:00", "03:00:00", "EDT", 240], ["2036-11-02T05:59:59+00:00", "01:59:59", "EDT", 240], ["2036-11-02T06:00:00+00:00", "01:00:00", "EST", 300]]);
        helpers.testYear("America/Montreal", [["2037-03-08T06:59:59+00:00", "01:59:59", "EST", 300], ["2037-03-08T07:00:00+00:00", "03:00:00", "EDT", 240], ["2037-11-01T05:59:59+00:00", "01:59:59", "EDT", 240], ["2037-11-01T06:00:00+00:00", "01:00:00", "EST", 300]]);
    });
});
