export default (options) => {
  options = Object.assign({
    date: new Date(),
    local: true,
    showTimeZone: false,
    showMilliseconds: false
  }, options);

  let { date } = options;

  if (options.local) {
    // Offset the date so it will return the correct value when getting the ISO string
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }

  let end = "";

  if (options.showTimeZone) {
    end = ` UTC${options.local ? ateos.pretty.timeZone(date) : ""}`;
  }

  if (options.showMilliseconds && date.getUTCMilliseconds() > 0) {
    end = ` ${date.getUTCMilliseconds()}ms${end}`;
  }

  return date
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, end);
};
