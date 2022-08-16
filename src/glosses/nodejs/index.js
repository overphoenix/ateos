const {
  error,
  is,
  fs,
  path: aPath,
  semver,
  std
} = ateos;

ateos.lazify({
  NodejsManager: "./manager",
  NodejsCompiler: "./compiler",
  cmake: "./cmake",
  FsCache: "./fs_cache"
}, exports, require);


if (ateos.isWindows) {
  ateos.lazify({
    findVS2017: "./find_vs2017"
  }, exports, require);
}

const versionRegex = () => /^v\d+\.\d+\.\d+/;
const nonStrictVersionRegex = () => /^\d+\.\d+\.\d+/;

export const getCurrentPlatform = () => {
  const platform = std.os.platform();
  switch (platform) {
    case "win32":
      return "win";
    default:
      return platform;
  }
};

export const getCurrentArch = () => {
  const arch = std.os.arch();
  switch (arch) {
    case "ia32":
    case "x32":
      return "x86";
    default:
      return arch;
  }
};

export const DEFAULT_EXT = ateos.isWindows
  ? ".zip"
  : ".tar.gz";

const UNIX_EXTS = ["", ".tar.gz", ".tar.xz"];
const WIN_EXTS = ["", ".7z", ".zip"];

const validateVersion = (version) => {
  if (ateos.isString(version)) {
    if (versionRegex().test(version)) {
      return version;
    } else if (nonStrictVersionRegex().test(version)) {
      return `v${version}`;
    }
  }
  throw new error.NotValidException(`Invalid version: ${version}`);
};

export const getArchiveName = async ({ version, platform = getCurrentPlatform(), arch = getCurrentArch(), type = "release", omitSuffix = false, ext } = {}) => {
  version = validateVersion(version);

  if (ateos.isUndefined(ext)) {
    ext = (type === "sources" || type === "headers")
      ? ".tar.gz"
      : ateos.isWindows
        ? ".zip"
        : ".tar.gz";
  }
  if (ext.length > 0 && !ext.startsWith(".")) {
    ext = `.${ext}`;
  }

  if (type === "sources" || type === "headers") {
    if (!UNIX_EXTS.includes(ext)) {
      throw new error.NotValidException(`Archive extension should be '.tar.gz' or '.tar.xz. Got '${ext}'`);
    }
    const suffix = type === "headers"
      ? omitSuffix
        ? ""
        : "-headers"
      : "";
    return `node-${version}${suffix}${ext}`;
  } else if (type !== "release" && type.length > 0) {
    throw new error.NotValidException(`Unknown type of archive: ${type}`);
  }

  if (platform) {
    if (platform === "win") {
      if (!WIN_EXTS.includes(ext)) {
        throw new error.NotValidException(`For 'win' platform archive extension should be '.7z' or '.zip. Got '${ext}'`);
      }
    } else if (!UNIX_EXTS.includes(ext)) {
      throw new error.NotValidException(`For unix platforms archive extension should be '.tar.gz' or '.tar.xz. Got '${ext}'`);
    }
  }

  let prefix = `node-${version}`;
  if (platform) {
    prefix += `-${platform}`;
  }
  if (arch) {
    prefix += `-${arch}`;
  }

  return `${prefix}${ext}`;
};

export const getReleases = async () => (await ateos.http.client.request("https://nodejs.org/download/release/index.json")).data;

export const getExePath = () => fs.which("node");

export const getPrefixPath = async ({ global = false } = {}) => {
  try {
    if (global) {
      return ateos.isWindows
        ? ""
        : ateos.isLinux
          ? "/usr"
          : "/usr/local";
    }
    const exePath = await getExePath();
    return aPath.dirname(aPath.dirname(exePath));
  } catch (err) {
    return ateos.isWindows
      ? ""
      : ateos.isLinux
        ? "/usr"
        : "/usr/local";
  }
};

export const getCurrentVersion = async ({ prefixPath } = {}) => {
  try {
    let exePath;
    if (ateos.isString(prefixPath)) {
      exePath = ateos.path.join(prefixPath, "bin", "node");
    } else {
      exePath = await getExePath();
    }

    const { stdout } = await ateos.process.exec(exePath, ["--version"]);
    return stdout;
  } catch (err) {
    return "";
  }
};

export const checkVersion = async (ver) => {
  const indexJson = await getReleases();

  let version = ver;
  if (!["latest", "lts"].includes(version)) {
    version = semver.valid(version);
    if (ateos.isNull(version)) {
      throw new error.NotValidException(`Invalid version: ${ver}`);
    }
  }

  switch (version) {
    case "latest":
      version = indexJson[0].version;
      break;
    case "lts":
      version = indexJson.find((item) => item.lts).version;
      break;
    default: {
      version = validateVersion(version);

      if (indexJson.findIndex((item) => item.version === version) === -1) {
        throw new error.UnknownException(`Unknown version: ${ver}`);
      }
    }
  }

  return version;
};

export const getSHASUMS = async ({ version, type = "utf8" } = {}) => {
  version = validateVersion(version);

  const sums = (await ateos.http.client.request(`https://nodejs.org/download/release/${version}/SHASUMS256.txt`)).data;

  if (type === "array" || type === "object") {
    const items = sums.split("\n")
      .map((line) => {
        const parts = line.split(/\s+/);
        return {
          name: parts[1],
          sum: parts[0]
        };
      })
      .filter((i) => i.name && i.sum);

    return (type === "array")
      ? items
      : items.reduce((obj, item) => {
        obj[item.name] = item.sum;
        return obj;
      }, {});
  } else if (type === "utf8") {
    return sums;
  } else if (type === "buffer") {
    return Buffer.from(sums);
  }

  return Buffer.from(sums).toString(type); // interpret type as encoding
};
