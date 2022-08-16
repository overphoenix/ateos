
const { std: { fs: sfs, path: spath, os }, is, fs } = ateos;

export const createTempFile = async (prefix = spath.join(os.tmpdir(), spath.sep)) => {
  for (; ;) {
    const file = new fs.File(`${prefix}${ateos.util.uuid.v4()}`);
    if (!(await file.exists())) {
      await file.create();
      return file;
    }
  }
};

export const createStructure = async (root, structure) => {
  for (const item of structure) {
    if (ateos.isArray(item)) {
      if (!item.length) {
        continue;
      }
      if (item.length === 2 && !ateos.isArray(item[1])) {
        await root.addFile(item[0], { contents: item[1] });
        continue;
      }
      const dir = await root.addDirectory(item[0]);
      if (item.length === 2) {
        await createStructure(dir, item[1]);
      }
    } else {
      await root.addFile(item);
    }
  }
};
