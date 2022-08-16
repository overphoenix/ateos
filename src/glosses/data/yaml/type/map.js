const { data: { yaml }, is } = ateos;

export default new yaml.type.Type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: (data) => !ateos.isNull(data) ? data : {}
});
