

import * as helpers from "../../helpers.js";
describe("datetime", "timezone", "zones", () => {
    before(() => {
        ateos.datetime.tz.reload();
    });
    specify("Europe/Isle_of_Man", () => {
        helpers.testYear("Europe/Isle_of_Man", [["1916-05-21T01:59:59+00:00", "01:59:59", "GMT", 0], ["1916-05-21T02:00:00+00:00", "03:00:00", "BST", -60], ["1916-10-01T01:59:59+00:00", "02:59:59", "BST", -60], ["1916-10-01T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1917-04-08T01:59:59+00:00", "01:59:59", "GMT", 0], ["1917-04-08T02:00:00+00:00", "03:00:00", "BST", -60], ["1917-09-17T01:59:59+00:00", "02:59:59", "BST", -60], ["1917-09-17T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1918-03-24T01:59:59+00:00", "01:59:59", "GMT", 0], ["1918-03-24T02:00:00+00:00", "03:00:00", "BST", -60], ["1918-09-30T01:59:59+00:00", "02:59:59", "BST", -60], ["1918-09-30T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1919-03-30T01:59:59+00:00", "01:59:59", "GMT", 0], ["1919-03-30T02:00:00+00:00", "03:00:00", "BST", -60], ["1919-09-29T01:59:59+00:00", "02:59:59", "BST", -60], ["1919-09-29T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1920-03-28T01:59:59+00:00", "01:59:59", "GMT", 0], ["1920-03-28T02:00:00+00:00", "03:00:00", "BST", -60], ["1920-10-25T01:59:59+00:00", "02:59:59", "BST", -60], ["1920-10-25T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1921-04-03T01:59:59+00:00", "01:59:59", "GMT", 0], ["1921-04-03T02:00:00+00:00", "03:00:00", "BST", -60], ["1921-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1921-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1922-03-26T01:59:59+00:00", "01:59:59", "GMT", 0], ["1922-03-26T02:00:00+00:00", "03:00:00", "BST", -60], ["1922-10-08T01:59:59+00:00", "02:59:59", "BST", -60], ["1922-10-08T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1923-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1923-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1923-09-16T01:59:59+00:00", "02:59:59", "BST", -60], ["1923-09-16T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1924-04-13T01:59:59+00:00", "01:59:59", "GMT", 0], ["1924-04-13T02:00:00+00:00", "03:00:00", "BST", -60], ["1924-09-21T01:59:59+00:00", "02:59:59", "BST", -60], ["1924-09-21T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1925-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1925-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1925-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1925-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1926-04-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1926-04-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1926-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1926-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1927-04-10T01:59:59+00:00", "01:59:59", "GMT", 0], ["1927-04-10T02:00:00+00:00", "03:00:00", "BST", -60], ["1927-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1927-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1928-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1928-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1928-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1928-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1929-04-21T01:59:59+00:00", "01:59:59", "GMT", 0], ["1929-04-21T02:00:00+00:00", "03:00:00", "BST", -60], ["1929-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1929-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1930-04-13T01:59:59+00:00", "01:59:59", "GMT", 0], ["1930-04-13T02:00:00+00:00", "03:00:00", "BST", -60], ["1930-10-05T01:59:59+00:00", "02:59:59", "BST", -60], ["1930-10-05T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1931-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1931-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1931-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1931-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1932-04-17T01:59:59+00:00", "01:59:59", "GMT", 0], ["1932-04-17T02:00:00+00:00", "03:00:00", "BST", -60], ["1932-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1932-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1933-04-09T01:59:59+00:00", "01:59:59", "GMT", 0], ["1933-04-09T02:00:00+00:00", "03:00:00", "BST", -60], ["1933-10-08T01:59:59+00:00", "02:59:59", "BST", -60], ["1933-10-08T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1934-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1934-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1934-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1934-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1935-04-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1935-04-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1935-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1935-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1936-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1936-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1936-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1936-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1937-04-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1937-04-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1937-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1937-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1938-04-10T01:59:59+00:00", "01:59:59", "GMT", 0], ["1938-04-10T02:00:00+00:00", "03:00:00", "BST", -60], ["1938-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1938-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1939-04-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1939-04-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1939-11-19T01:59:59+00:00", "02:59:59", "BST", -60], ["1939-11-19T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1940-02-25T01:59:59+00:00", "01:59:59", "GMT", 0], ["1940-02-25T02:00:00+00:00", "03:00:00", "BST", -60]]);
        helpers.testYear("Europe/Isle_of_Man", [["1941-05-04T00:59:59+00:00", "01:59:59", "BST", -60], ["1941-05-04T01:00:00+00:00", "03:00:00", "BDST", -120], ["1941-08-10T00:59:59+00:00", "02:59:59", "BDST", -120], ["1941-08-10T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Isle_of_Man", [["1942-04-05T00:59:59+00:00", "01:59:59", "BST", -60], ["1942-04-05T01:00:00+00:00", "03:00:00", "BDST", -120], ["1942-08-09T00:59:59+00:00", "02:59:59", "BDST", -120], ["1942-08-09T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Isle_of_Man", [["1943-04-04T00:59:59+00:00", "01:59:59", "BST", -60], ["1943-04-04T01:00:00+00:00", "03:00:00", "BDST", -120], ["1943-08-15T00:59:59+00:00", "02:59:59", "BDST", -120], ["1943-08-15T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Isle_of_Man", [["1944-04-02T00:59:59+00:00", "01:59:59", "BST", -60], ["1944-04-02T01:00:00+00:00", "03:00:00", "BDST", -120], ["1944-09-17T00:59:59+00:00", "02:59:59", "BDST", -120], ["1944-09-17T01:00:00+00:00", "02:00:00", "BST", -60]]);
        helpers.testYear("Europe/Isle_of_Man", [["1945-04-02T00:59:59+00:00", "01:59:59", "BST", -60], ["1945-04-02T01:00:00+00:00", "03:00:00", "BDST", -120], ["1945-07-15T00:59:59+00:00", "02:59:59", "BDST", -120], ["1945-07-15T01:00:00+00:00", "02:00:00", "BST", -60], ["1945-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1945-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1946-04-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1946-04-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1946-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1946-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1947-03-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1947-03-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1947-04-13T00:59:59+00:00", "01:59:59", "BST", -60], ["1947-04-13T01:00:00+00:00", "03:00:00", "BDST", -120], ["1947-08-10T00:59:59+00:00", "02:59:59", "BDST", -120], ["1947-08-10T01:00:00+00:00", "02:00:00", "BST", -60], ["1947-11-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1947-11-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1948-03-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1948-03-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1948-10-31T01:59:59+00:00", "02:59:59", "BST", -60], ["1948-10-31T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1949-04-03T01:59:59+00:00", "01:59:59", "GMT", 0], ["1949-04-03T02:00:00+00:00", "03:00:00", "BST", -60], ["1949-10-30T01:59:59+00:00", "02:59:59", "BST", -60], ["1949-10-30T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1950-04-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1950-04-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1950-10-22T01:59:59+00:00", "02:59:59", "BST", -60], ["1950-10-22T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1951-04-15T01:59:59+00:00", "01:59:59", "GMT", 0], ["1951-04-15T02:00:00+00:00", "03:00:00", "BST", -60], ["1951-10-21T01:59:59+00:00", "02:59:59", "BST", -60], ["1951-10-21T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1952-04-20T01:59:59+00:00", "01:59:59", "GMT", 0], ["1952-04-20T02:00:00+00:00", "03:00:00", "BST", -60], ["1952-10-26T01:59:59+00:00", "02:59:59", "BST", -60], ["1952-10-26T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1953-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1953-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1953-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1953-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1954-04-11T01:59:59+00:00", "01:59:59", "GMT", 0], ["1954-04-11T02:00:00+00:00", "03:00:00", "BST", -60], ["1954-10-03T01:59:59+00:00", "02:59:59", "BST", -60], ["1954-10-03T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1955-04-17T01:59:59+00:00", "01:59:59", "GMT", 0], ["1955-04-17T02:00:00+00:00", "03:00:00", "BST", -60], ["1955-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1955-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1956-04-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1956-04-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1956-10-07T01:59:59+00:00", "02:59:59", "BST", -60], ["1956-10-07T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1957-04-14T01:59:59+00:00", "01:59:59", "GMT", 0], ["1957-04-14T02:00:00+00:00", "03:00:00", "BST", -60], ["1957-10-06T01:59:59+00:00", "02:59:59", "BST", -60], ["1957-10-06T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1958-04-20T01:59:59+00:00", "01:59:59", "GMT", 0], ["1958-04-20T02:00:00+00:00", "03:00:00", "BST", -60], ["1958-10-05T01:59:59+00:00", "02:59:59", "BST", -60], ["1958-10-05T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1959-04-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1959-04-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1959-10-04T01:59:59+00:00", "02:59:59", "BST", -60], ["1959-10-04T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1960-04-10T01:59:59+00:00", "01:59:59", "GMT", 0], ["1960-04-10T02:00:00+00:00", "03:00:00", "BST", -60], ["1960-10-02T01:59:59+00:00", "02:59:59", "BST", -60], ["1960-10-02T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1961-03-26T01:59:59+00:00", "01:59:59", "GMT", 0], ["1961-03-26T02:00:00+00:00", "03:00:00", "BST", -60], ["1961-10-29T01:59:59+00:00", "02:59:59", "BST", -60], ["1961-10-29T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1962-03-25T01:59:59+00:00", "01:59:59", "GMT", 0], ["1962-03-25T02:00:00+00:00", "03:00:00", "BST", -60], ["1962-10-28T01:59:59+00:00", "02:59:59", "BST", -60], ["1962-10-28T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1963-03-31T01:59:59+00:00", "01:59:59", "GMT", 0], ["1963-03-31T02:00:00+00:00", "03:00:00", "BST", -60], ["1963-10-27T01:59:59+00:00", "02:59:59", "BST", -60], ["1963-10-27T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1964-03-22T01:59:59+00:00", "01:59:59", "GMT", 0], ["1964-03-22T02:00:00+00:00", "03:00:00", "BST", -60], ["1964-10-25T01:59:59+00:00", "02:59:59", "BST", -60], ["1964-10-25T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1965-03-21T01:59:59+00:00", "01:59:59", "GMT", 0], ["1965-03-21T02:00:00+00:00", "03:00:00", "BST", -60], ["1965-10-24T01:59:59+00:00", "02:59:59", "BST", -60], ["1965-10-24T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1966-03-20T01:59:59+00:00", "01:59:59", "GMT", 0], ["1966-03-20T02:00:00+00:00", "03:00:00", "BST", -60], ["1966-10-23T01:59:59+00:00", "02:59:59", "BST", -60], ["1966-10-23T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1967-03-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1967-03-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1967-10-29T01:59:59+00:00", "02:59:59", "BST", -60], ["1967-10-29T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1968-02-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1968-02-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1968-10-26T22:59:59+00:00", "23:59:59", "BST", -60], ["1968-10-26T23:00:00+00:00", "00:00:00", "BST", -60]]);
        helpers.testYear("Europe/Isle_of_Man", [["1971-10-31T01:59:59+00:00", "02:59:59", "BST", -60], ["1971-10-31T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1972-03-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1972-03-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1972-10-29T01:59:59+00:00", "02:59:59", "BST", -60], ["1972-10-29T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1973-03-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1973-03-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1973-10-28T01:59:59+00:00", "02:59:59", "BST", -60], ["1973-10-28T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1974-03-17T01:59:59+00:00", "01:59:59", "GMT", 0], ["1974-03-17T02:00:00+00:00", "03:00:00", "BST", -60], ["1974-10-27T01:59:59+00:00", "02:59:59", "BST", -60], ["1974-10-27T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1975-03-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1975-03-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1975-10-26T01:59:59+00:00", "02:59:59", "BST", -60], ["1975-10-26T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1976-03-21T01:59:59+00:00", "01:59:59", "GMT", 0], ["1976-03-21T02:00:00+00:00", "03:00:00", "BST", -60], ["1976-10-24T01:59:59+00:00", "02:59:59", "BST", -60], ["1976-10-24T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1977-03-20T01:59:59+00:00", "01:59:59", "GMT", 0], ["1977-03-20T02:00:00+00:00", "03:00:00", "BST", -60], ["1977-10-23T01:59:59+00:00", "02:59:59", "BST", -60], ["1977-10-23T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1978-03-19T01:59:59+00:00", "01:59:59", "GMT", 0], ["1978-03-19T02:00:00+00:00", "03:00:00", "BST", -60], ["1978-10-29T01:59:59+00:00", "02:59:59", "BST", -60], ["1978-10-29T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1979-03-18T01:59:59+00:00", "01:59:59", "GMT", 0], ["1979-03-18T02:00:00+00:00", "03:00:00", "BST", -60], ["1979-10-28T01:59:59+00:00", "02:59:59", "BST", -60], ["1979-10-28T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1980-03-16T01:59:59+00:00", "01:59:59", "GMT", 0], ["1980-03-16T02:00:00+00:00", "03:00:00", "BST", -60], ["1980-10-26T01:59:59+00:00", "02:59:59", "BST", -60], ["1980-10-26T02:00:00+00:00", "02:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1981-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["1981-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["1981-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["1981-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1982-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["1982-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["1982-10-24T00:59:59+00:00", "01:59:59", "BST", -60], ["1982-10-24T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1983-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["1983-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["1983-10-23T00:59:59+00:00", "01:59:59", "BST", -60], ["1983-10-23T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1984-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["1984-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["1984-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["1984-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1985-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["1985-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["1985-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["1985-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1986-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["1986-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["1986-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["1986-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1987-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["1987-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["1987-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["1987-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1988-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["1988-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["1988-10-23T00:59:59+00:00", "01:59:59", "BST", -60], ["1988-10-23T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1989-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["1989-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["1989-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["1989-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1990-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["1990-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["1990-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["1990-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1991-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["1991-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["1991-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["1991-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1992-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["1992-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["1992-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["1992-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1993-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["1993-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["1993-10-24T00:59:59+00:00", "01:59:59", "BST", -60], ["1993-10-24T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1994-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["1994-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["1994-10-23T00:59:59+00:00", "01:59:59", "BST", -60], ["1994-10-23T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1995-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["1995-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["1995-10-22T00:59:59+00:00", "01:59:59", "BST", -60], ["1995-10-22T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1996-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["1996-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["1996-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["1996-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1997-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["1997-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["1997-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["1997-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1998-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["1998-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["1998-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["1998-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["1999-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["1999-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["1999-10-31T00:59:59+00:00", "01:59:59", "BST", -60], ["1999-10-31T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2000-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["2000-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["2000-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["2000-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2001-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["2001-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["2001-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["2001-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2002-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["2002-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["2002-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["2002-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2003-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["2003-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["2003-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["2003-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2004-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["2004-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["2004-10-31T00:59:59+00:00", "01:59:59", "BST", -60], ["2004-10-31T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2005-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["2005-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["2005-10-30T00:59:59+00:00", "01:59:59", "BST", -60], ["2005-10-30T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2006-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["2006-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["2006-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["2006-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2007-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["2007-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["2007-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["2007-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2008-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["2008-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["2008-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["2008-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2009-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["2009-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["2009-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["2009-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2010-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["2010-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["2010-10-31T00:59:59+00:00", "01:59:59", "BST", -60], ["2010-10-31T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2011-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["2011-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["2011-10-30T00:59:59+00:00", "01:59:59", "BST", -60], ["2011-10-30T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2012-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["2012-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["2012-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["2012-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2013-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["2013-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["2013-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["2013-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2014-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["2014-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["2014-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["2014-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2015-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["2015-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["2015-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["2015-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2016-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["2016-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["2016-10-30T00:59:59+00:00", "01:59:59", "BST", -60], ["2016-10-30T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2017-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["2017-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["2017-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["2017-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2018-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["2018-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["2018-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["2018-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2019-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["2019-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["2019-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["2019-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2020-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["2020-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["2020-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["2020-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2021-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["2021-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["2021-10-31T00:59:59+00:00", "01:59:59", "BST", -60], ["2021-10-31T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2022-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["2022-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["2022-10-30T00:59:59+00:00", "01:59:59", "BST", -60], ["2022-10-30T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2023-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["2023-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["2023-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["2023-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2024-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["2024-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["2024-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["2024-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2025-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["2025-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["2025-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["2025-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2026-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["2026-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["2026-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["2026-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2027-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["2027-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["2027-10-31T00:59:59+00:00", "01:59:59", "BST", -60], ["2027-10-31T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2028-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["2028-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["2028-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["2028-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2029-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["2029-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["2029-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["2029-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2030-03-31T00:59:59+00:00", "00:59:59", "GMT", 0], ["2030-03-31T01:00:00+00:00", "02:00:00", "BST", -60], ["2030-10-27T00:59:59+00:00", "01:59:59", "BST", -60], ["2030-10-27T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2031-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["2031-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["2031-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["2031-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2032-03-28T00:59:59+00:00", "00:59:59", "GMT", 0], ["2032-03-28T01:00:00+00:00", "02:00:00", "BST", -60], ["2032-10-31T00:59:59+00:00", "01:59:59", "BST", -60], ["2032-10-31T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2033-03-27T00:59:59+00:00", "00:59:59", "GMT", 0], ["2033-03-27T01:00:00+00:00", "02:00:00", "BST", -60], ["2033-10-30T00:59:59+00:00", "01:59:59", "BST", -60], ["2033-10-30T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2034-03-26T00:59:59+00:00", "00:59:59", "GMT", 0], ["2034-03-26T01:00:00+00:00", "02:00:00", "BST", -60], ["2034-10-29T00:59:59+00:00", "01:59:59", "BST", -60], ["2034-10-29T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2035-03-25T00:59:59+00:00", "00:59:59", "GMT", 0], ["2035-03-25T01:00:00+00:00", "02:00:00", "BST", -60], ["2035-10-28T00:59:59+00:00", "01:59:59", "BST", -60], ["2035-10-28T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2036-03-30T00:59:59+00:00", "00:59:59", "GMT", 0], ["2036-03-30T01:00:00+00:00", "02:00:00", "BST", -60], ["2036-10-26T00:59:59+00:00", "01:59:59", "BST", -60], ["2036-10-26T01:00:00+00:00", "01:00:00", "GMT", 0]]);
        helpers.testYear("Europe/Isle_of_Man", [["2037-03-29T00:59:59+00:00", "00:59:59", "GMT", 0], ["2037-03-29T01:00:00+00:00", "02:00:00", "BST", -60], ["2037-10-25T00:59:59+00:00", "01:59:59", "BST", -60], ["2037-10-25T01:00:00+00:00", "01:00:00", "GMT", 0]]);
    });
});
