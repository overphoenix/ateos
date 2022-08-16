const {
  is,
  path
} = ateos;

const includeParents = (dirs, options) => {
  let topLevels;
  let bottomLevels = 0;
  const topPath = [];
  const bottomPath = [];

  if (ateos.isArray(options)) {
    topLevels = Math.abs(options[0]);
    bottomLevels = Math.abs(options[1]);
  } else if (options >= 0) {
    topLevels = options;
  } else {
    bottomLevels = Math.abs(options);
  }

  if (topLevels + bottomLevels > dirs.length) {
    return dirs;
  }

  while (topLevels > 0) {
    topPath.push(dirs.shift());
    topLevels--;
  }
  while (bottomLevels > 0) {
    bottomPath.unshift(dirs.pop());
    bottomLevels--;
  }
  return topPath.concat(bottomPath);
};

const subPath = (dirs, options) => {
  if (ateos.isArray(options)) {
    return dirs.slice(options[0], options[1]);
  }
  return dirs.slice(options);

};

const flattenPath = (file, options) => {
  const fileName = path.basename(file.path);
  let dirs;

  if (!options.includeParents && !options.subPath) {
    return fileName;
  }

  dirs = path.dirname(file.relative).split(path.sep);
  if (options.includeParents) {
    dirs = includeParents(dirs, options.includeParents);
  }
  if (options.subPath) {
    dirs = subPath(dirs, options.subPath);
  }

  dirs.push(fileName);
  return path.join(...dirs);
};

export default function plugin() {
  return function flatten(options = {}) {
    options.newPath = options.newPath || "";
    return this.throughSync(function (file) {
      if (!file.isDirectory()) {
        file.path = path.join(file.base, options.newPath, flattenPath(file, options));
        this.push(file);
      }
    });
  };
}
