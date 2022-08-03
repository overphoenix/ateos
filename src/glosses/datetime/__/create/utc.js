const __ = ateos.getPrivate(ateos.datetime);

export default function createUTC(input, format, locale, strict) {
  return __.create.createLocalOrUTC(input, format, locale, strict, true).utc();
}
