const {
  is,
  realm,
  path
} = ateos;

export const importAteosReplacer = (replacer) => () => ({
  visitor: {
    ImportDeclaration(p, state) {
      if (p.node.source.value === "ateos") {
        p.node.source.value = replacer(state.file.opts);
      }
    }
  }
});

export const checkRealm = async (r) => {
  let result = r;
  if (is.string(result)) {
    result = new realm.RealmManager({
      cwd: r
    });
  }

  if (!is.realm(result)) {
    throw new ateos.error.NotValidException("Invalid realm instance");
  }

  await result.connect();

  return result;
};


export const readTaskConfig = (name) => {
  const config = new ateos.configuration.GenericConfig({
    cwd: path.join(process.cwd(), ".ateos")
  });

  let options;
  try {
    config.loadSync(name, {
      transpile: true
    });
    options = config.raw;
  } catch (err) {
    options = {};
  }

  return options;
};
