export default (fs) => {
  const {
    is,
    path
  } = ateos;
    
  return (file, data, options, callback) => {
    if (ateos.isFunction(options)) {
      callback = options;
      options = {};
    }
    
    const dir = path.dirname(file);
    
    fs.pathExists(dir, (err, itDoes) => {
      if (err) {
        return callback(err); 
      }
      if (itDoes) {
        return fs.writeJson(file, data, options, callback); 
      }
    
      fs.mkdirp(dir, (err) => {
        if (err) {
          return callback(err); 
        }
        fs.writeJson(file, data, options, callback);
      });
    });
  };    
};
