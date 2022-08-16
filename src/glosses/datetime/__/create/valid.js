const { is } = ateos;
const __ = ateos.getPrivate(ateos.datetime);

export const isValid = (m) => {
  if (ateos.isNil(m._isValid)) {
    const flags = __.create.getParsingFlags(m);
    const parsedParts = Array.prototype.some.call(flags.parsedDateParts, (i) => {
      return ateos.isExist(i);
    });
    let isNowValid = !isNaN(m._d.getTime())
            && flags.overflow < 0
            && !flags.empty
            && !flags.invalidMonth
            && !flags.invalidWeekday
            && !flags.weekdayMismatch
            && !flags.nullInput
            && !flags.invalidFormat
            && !flags.userInvalidated
            && (!flags.meridiem || (flags.meridiem && parsedParts));

    if (m._strict) {
      isNowValid = isNowValid
                && flags.charsLeftOver === 0
                && flags.unusedTokens.length === 0
                && ateos.isUndefined(flags.bigHour);
    }

    if (ateos.isNil(Object.isFrozen) || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m._isValid;
};

export const createInvalid = (flags) => {
  const { getParsingFlags, createUTC } = __.create;

  const m = createUTC(NaN);
  if (ateos.isExist(flags)) {
    Object.assign(getParsingFlags(m), flags);
  } else {
    getParsingFlags(m).userInvalidated = true;
  }

  return m;
};
