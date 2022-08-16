const { data: { yaml }, is, util } = ateos;

const resolveYamlPairs = (data) => {
  if (ateos.isNull(data)) {
    return true;
  }

  for (const pair of data) {
    if (!ateos.isObject(pair)) {
      return false;
    }
    if (util.keys(pair).length !== 1) {
      return false;
    }
  }

  return true;
};

export default new yaml.type.Type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: (data) => ateos.isNull(data) ? [] : data.map((pair) => util.entries(pair)[0])
});
