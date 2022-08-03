export default function deepEqual(a, b) {
  return ateos.is.deepEqual(a, b);
}

deepEqual.use = function (match) {
  const comparator = (a, b) => {
    if (match.isMatcher(a)) {
      if (match.isMatcher(b)) {
        return a === b;
      }
      return a.test(b);
    }
    return null;
  };

  return (a, b) => ateos.is.deepEqual(a, b, { comparator });
};
