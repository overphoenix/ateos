const { is } = ateos;

const defaultParsingFlags = () => {
  // We need to deep clone this object.
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
};

export default function getParsingFlags(m) {
  if (ateos.isNil(m._pf)) {
    m._pf = defaultParsingFlags();
  }
  return m._pf;
}
