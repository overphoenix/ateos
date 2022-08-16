const {
  is,
  path: aPath
} = ateos;

const normalizeExt = (ext) => {
  if (ext.startsWith(".")) {
    return ext.substr(1);
  }
  return ext;
};

export default function globize(path, { ext, recursive = false } = {}) {
  if (is.glob(path)) {
    return path;
  } else if (ateos.isNil(path)) {
    path = "";
  } else if (ateos.isArray(path)) {
    const result = [];
    for (const p of path) {
      result.push(globize(p, { ext, recursive }));
    }
    return result;
  } else if (!ateos.isString(path)) {
    throw new ateos.error.InvalidArgumentException("Invalid value of path");
  }

  let exts;

  if (ateos.isString(ext)) {
    exts = `.${normalizeExt(ext)}`;
  } else if (ateos.isArray(ext)) {
    const normalized = [];
    for (const e of ext) {
      normalized.push(normalizeExt(e));
    }
    exts = `.+(${normalized.join("|")})`;
  } else {
    exts = "";
  }

  return recursive ? aPath.join(path, "**", `*${exts}`) : aPath.join(path, `*${exts}`);
}
