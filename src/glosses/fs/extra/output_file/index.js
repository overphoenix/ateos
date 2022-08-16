export default (fs) => {
  const {
    is,
    path
  } = ateos;
    
  return (file, data, encoding, callback) => {
    if (ateos.isFunction(encoding)) {
      callback = encoding;
      encoding = "utf8";
    }
    
    const dir = path.dirname(file);
    fs.pathExists(dir, (err, itDoes) => {
      if (err) {
        return callback(err);
      }
      if (itDoes) {
        return fs.writeFile(file, data, encoding, callback);
      }
    
      fs.mkdirp(dir, (err) => {
        if (err) {
          return callback(err);
        }
    
        fs.writeFile(file, data, encoding, callback);
      });
    });
  };    
};
