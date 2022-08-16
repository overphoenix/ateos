const { data: { yaml }, is } = ateos;

const resolveYamlOmap = (data) => {
  if (data === null) {
    return true;
  }

  const objectKeys = new Set();
  let pairKey;
  let pairHasKey;

  for (const pair of data) {
    pairHasKey = false;

    if (!ateos.isObject(pair)) {
      return false;
    }

    for (pairKey in pair) {
      if (ateos.isPropertyOwned(pair, pairKey)) {
        if (!pairHasKey) {
          pairHasKey = true;
        } else {
          return false;
        }
      }
    }

    if (!pairHasKey) {
      return false;
    }

    if (!objectKeys.has(pairKey)) {
      objectKeys.add(pairKey);
    } else {
      return false;
    }
  }

  return true;
};

export default new yaml.type.Type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: (data) => !ateos.isNull(data) ? data : []
});
