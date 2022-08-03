const __ = ateos.getPrivate(ateos.datetime);

const {
  format: { addFormatToken },
  parse: {
    addRegexToken,
    match1,
    match2,
    match3,
    match1to3,
    matchUnsigned,
    addParseToken
  },
  unit: {
    alias: { addUnitAlias },
    priority: { addUnitPriority },
    c: { MILLISECOND }
  }
} = __;

// FORMATTING

addFormatToken("S", 0, 0, function () {
  return ~~(this.millisecond() / 100);
});

addFormatToken(0, ["SS", 2], 0, function () {
  return ~~(this.millisecond() / 10);
});

addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function () {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function () {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function () {
  return this.millisecond() * 1000;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function () {
  return this.millisecond() * 10000;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
  return this.millisecond() * 100000;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
  return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias("millisecond", "ms");

// PRIORITY

addUnitPriority("millisecond", 16);

// PARSING

addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);

let token;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}

const parseMs = (input, array) => array[MILLISECOND] = __.util.toInt((`0.${input}`) * 1000);

for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
