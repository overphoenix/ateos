
// Transform alphanum separated by underscore or minus to camel case
export default function (...args) {
  let str;
  if (args.length > 1) {
    str = args.map((x) => x.trim()).filter((x) => x.length).join("-");
  } else {
    str = args[0].trim();
  }

  if (str.length === 0) {
    return "";
  }

  if (str.length === 1) {
    return str.toLowerCase();
  }

  if (/^[a-z0-9]+$/.test(str)) {
    return str;
  }

  const hasUpperCase = str !== str.toLowerCase();

  if (hasUpperCase) {
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;

    for (let i = 0; i < str.length; i++) {
      const c = str[i];

      if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
        str = `${str.substr(0, i)}-${str.substr(i)}`;
        isLastCharLower = false;
        isLastLastCharUpper = isLastCharUpper;
        isLastCharUpper = true;
        i++;
      } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
        str = `${str.substr(0, i - 1)}-${str.substr(i - 1)}`;
        isLastLastCharUpper = isLastCharUpper;
        isLastCharUpper = false;
        isLastCharLower = true;
      } else {
        isLastCharLower = c.toLowerCase() === c;
        isLastLastCharUpper = isLastCharUpper;
        isLastCharUpper = c.toUpperCase() === c;
      }
    }
  }

  return str.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
}
