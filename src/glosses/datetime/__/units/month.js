const { is } = ateos;
const __ = ateos.getPrivate(ateos.datetime);

const {
  format: { addFormatToken },
  parse: {
    addRegexToken,
    match1to2,
    match2,
    matchWord,
    regexEscape,
    addParseToken
  },
  unit: {
    alias: { addUnitAlias },
    priority: { addUnitPriority },
    c: { MONTH }
  }
} = __;

export const daysInMonth = (year, month) => {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  const modMonth = __.util.mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? (__.unit.year.isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
};

// FORMATTING

addFormatToken("M", ["MM", 2], "Mo", function () {
  return this.month() + 1;
});

addFormatToken("MMM", 0, 0, function (format) {
  return this.localeData().monthsShort(this, format);
});

addFormatToken("MMMM", 0, 0, function (format) {
  return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias("month", "M");

// PRIORITY

addUnitPriority("month", 8);

// PARSING

addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", (isStrict, locale) => {
  return locale.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", (isStrict, locale) => {
  return locale.monthsRegex(isStrict);
});

addParseToken(["M", "MM"], (input, array) => {
  array[MONTH] = __.util.toInt(input) - 1;
});

addParseToken(["MMM", "MMMM"], (input, array, config, token) => {
  const month = config._locale.monthsParse(input, token, config._strict);
  // if we didn't find a month name, mark the date as invalid.
  if (is.exist(month)) {
    array[MONTH] = month;
  } else {
    __.create.getParsingFlags(config).invalidMonth = input;
  }
});

// LOCALES

const MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
export const defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
export const localeMonths = function (m, format) {
  if (!m) {
    return is.array(this._months) ? this._months : this._months.standalone;
  }
  return is.array(this._months)
    ? this._months[m.month()]
    : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? "format" : "standalone"][m.month()];
};

export const defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
export const localeMonthsShort = function (m, format) {
  if (!m) {
    return is.array(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  }
  return is.array(this._monthsShort)
    ? this._monthsShort[m.month()]
    : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()];
};

const handleStrictParse = function (monthName, format, strict) {
  if (!this._monthsParse) {
    // this is not used
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (let i = 0; i < 12; ++i) {
      const mom = __.create.createUTC([2000, i]);
      this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
      this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
    }
  }

  const llc = monthName.toLocaleLowerCase();
  let ii;

  if (strict) {
    if (format === "MMM") {
      ii = this._shortMonthsParse.indexOf(llc);
      return ii !== -1 ? ii : null;
    }
    ii = this._longMonthsParse.indexOf(llc);
    return ii !== -1 ? ii : null;

  }
  if (format === "MMM") {
    ii = this._shortMonthsParse.indexOf(llc);
    if (ii !== -1) {
      return ii;
    }
    ii = this._longMonthsParse.indexOf(llc);
    return ii !== -1 ? ii : null;
  }
  ii = this._longMonthsParse.indexOf(llc);
  if (ii !== -1) {
    return ii;
  }
  ii = this._shortMonthsParse.indexOf(llc);
  return ii !== -1 ? ii : null;


};

export const localeMonthsParse = function (monthName, format, strict) {
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format, strict);
  }

  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }

  // TODO: add sorting
  // Sorting makes sure if one month (or abbr) is a prefix of another
  // see sorting in computeMonthsParse
  for (let i = 0; i < 12; i++) {
    // make the regex if we don't have it already
    const mom = __.create.createUTC([2000, i]);
    if (strict && !this._longMonthsParse[i]) {
      this._longMonthsParse[i] = new RegExp(`^${this.months(mom, "").replace(".", "")}$`, "i");
      this._shortMonthsParse[i] = new RegExp(`^${this.monthsShort(mom, "").replace(".", "")}$`, "i");
    }
    if (!strict && !this._monthsParse[i]) {
      const regex = `^${this.months(mom, "")}|^${this.monthsShort(mom, "")}`;
      this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
    }
    // test the regex
    if (strict && format === "MMMM" && this._longMonthsParse[i].test(monthName)) {
      return i;
    } else if (strict && format === "MMM" && this._shortMonthsParse[i].test(monthName)) {
      return i;
    } else if (!strict && this._monthsParse[i].test(monthName)) {
      return i;
    }
  }
};

const computeMonthsParse = function () {
  const cmpLenRev = (a, b) => b.length - a.length;

  const shortPieces = [];
  const longPieces = [];
  const mixedPieces = [];
  for (let i = 0; i < 12; i++) {
    // make the regex if we don't have it already
    const mom = __.create.createUTC([2000, i]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  // Sorting makes sure if one month (or abbr) is a prefix of another it
  // will match the longer piece.
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (let i = 0; i < 12; i++) {
    shortPieces[i] = regexEscape(shortPieces[i]);
    longPieces[i] = regexEscape(longPieces[i]);
  }
  for (let i = 0; i < 24; i++) {
    mixedPieces[i] = regexEscape(mixedPieces[i]);
  }

  this._monthsRegex = new RegExp(`^(${mixedPieces.join("|")})`, "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(`^(${longPieces.join("|")})`, "i");
  this._monthsShortStrictRegex = new RegExp(`^(${shortPieces.join("|")})`, "i");
};


const defaultMonthsShortRegex = matchWord;
export const monthsShortRegex = function (isStrict) {
  if (this._monthsParseExact) {
    if (!is.propertyOwned(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    }
    return this._monthsShortRegex;

  }
  if (!is.propertyOwned(this, "_monthsShortRegex")) {
    this._monthsShortRegex = defaultMonthsShortRegex;
  }
  return this._monthsShortStrictRegex && isStrict
    ? this._monthsShortStrictRegex
    : this._monthsShortRegex;

};

const defaultMonthsRegex = matchWord;
export const monthsRegex = function (isStrict) {
  if (this._monthsParseExact) {
    if (!is.propertyOwned(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    }
    return this._monthsRegex;

  }
  if (!is.propertyOwned(this, "_monthsRegex")) {
    this._monthsRegex = defaultMonthsRegex;
  }
  return this._monthsStrictRegex && isStrict
    ? this._monthsStrictRegex
    : this._monthsRegex;

};
