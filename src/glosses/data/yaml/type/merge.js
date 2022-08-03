const { data: { yaml }, is } = ateos;

export default new yaml.type.Type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: (data) => data === "<<" || is.null(data)
});
