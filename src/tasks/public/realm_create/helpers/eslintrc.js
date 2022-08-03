const {
  fs,
  std
} = ateos;

const CONFIG_NAME = ".eslintrc.js";
const IRNORE_NAME = ".eslintignore";

export const create = async ({ cwd, pkg } = {}) => {
  const eslintrcPath = std.path.join(ateos.HOME, CONFIG_NAME);

  await fs.copy(eslintrcPath, std.path.join(cwd, CONFIG_NAME));
  await fs.copy(std.path.join(ateos.HOME, IRNORE_NAME), std.path.join(cwd, IRNORE_NAME));
    
  const eslintConfig = ateos.require(eslintrcPath);
  const plugins = eslintConfig.plugins.map((name) => `eslint-plugin-${name}`);
  const deps = {};
  for (const plugin of plugins) {
    deps[plugin] = ateos.package.devDependencies[plugin];
  }

  pkg.merge({
    devDependencies: {
      eslint: ateos.package.devDependencies.eslint,
      "@babel/core": ateos.package.dependencies["@babel/core"],
      "@babel/eslint-parser": ateos.package.devDependencies["@babel/eslint-parser"],

      ...deps
    }
  });
  await pkg.save();
};
