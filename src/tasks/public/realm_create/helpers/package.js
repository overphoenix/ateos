const {
  configuration,
  util
} = ateos;

const PACKAGE_PROPS = [
  "name",
  "description",
  "version",
  "author",
  "bin",
  "main",
  "license"
];

export const create = async ({ cwd, ...props } = {}) => {
  const config = new configuration.NpmConfig({
    cwd
  });
  config.merge(util.pick(props, PACKAGE_PROPS));
  config.merge(util.pick(ateos.package, ["engines", "packageManager"]));
  await config.save();
  return config;
};

export const load = async ({ cwd } = {}) => configuration.NpmConfig.load({ cwd });
