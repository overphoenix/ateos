const { data: { yaml }, is, util } = ateos;

const resolveYamlSet = (data) => {
  if (!ateos.isNull(data)) {
    return true;
  }

  return util.values(data).every(ateos.isNull);
};

export default new yaml.type.Type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: (data) => !ateos.isNull(data) ? data : {}
});
