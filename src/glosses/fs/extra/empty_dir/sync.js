export default (fs) => {
  const {
    path
  } = ateos;

  return (dir) => {
    let items;
    try {
      items = fs.readdirSync(dir);
    } catch (err) {
      return fs.mkdirpSync(dir);
    }

    items.forEach((item) => {
      item = path.join(dir, item);
      fs.removeSync(item);
    });
  };
};
