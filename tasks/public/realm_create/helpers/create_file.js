const {
  fs,
  is,
  std,
  templating,
  text
} = ateos;

export const createFile = async (template, { name, fileName, cwd = process.cwd(), skipName = false, rewriteFile = false, ...templateContext } = {}) => {
  if (is.string(name) && !skipName) {
    const parts = name.split(/[/\\]/);
    if (parts.length > 1) {
      name = parts.pop();
      const path = parts.join(std.path.sep);
      cwd = std.path.isAbsolute(name) ? path : std.path.resolve(process.cwd(), path);
    }
    fileName = is.string(fileName) ? fileName : name;
    name = text.capitalize(text.toCamelCase(name));
  } else {
    name = "";
    fileName = is.string(fileName) ? fileName : "index.js";
  }

  let filePath = std.path.join(cwd, fileName);

  if (std.path.extname(filePath) !== ".js") {
    filePath += ".js";
  }

  if ((await fs.pathExists(filePath)) && !rewriteFile) {
    throw new ateos.error.ExistsException(`File '${filePath}' already exists`);
  }

  await fs.mkdirp(cwd);

  const content = await templating.nunjucks.renderString(template, {
    name,
    ...templateContext
  });

  await fs.writeFile(filePath, content);
  return filePath;
};
