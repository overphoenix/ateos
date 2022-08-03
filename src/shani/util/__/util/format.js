export default function format(x) {
  if (x === "") {
    return "(empty string)";
  }
  return ateos.assertion.util.inspect(x, {
    showHidden: false,
    depth: 5,
    quoteStrings: false
  });
}
