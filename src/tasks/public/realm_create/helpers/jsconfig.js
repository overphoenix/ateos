const {
  is,
  configuration,
  path
} = ateos;

const _updateList = (config, listName, values) => {
  if (!config.has(listName)) {
    config.set(listName, []);
  }
  for (const item of values) {
    if (!config.raw[listName].includes(item)) {
      config.raw[listName].push(item);
    }
  }
};

// Use Ateos jsconfig as default
export const create = async ({ cwd, include, exclude } = {}) => {
  const ateosJsconfig = await configuration.load(path.join(ateos.HOME, "jsconfig.json"));
  if (is.array(include)) {
    _updateList(ateosJsconfig, "include", include);
  }

  if (is.array(exclude)) {
    _updateList(ateosJsconfig, "exclude", include);
  }

  return ateosJsconfig.save(path.join(cwd, "jsconfig.json"), {
    space: "  "
  });
};
