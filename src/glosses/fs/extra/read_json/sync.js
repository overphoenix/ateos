export default (fs) => {
  const {
    is,
    text: { stripBom }
  } = ateos;
    
  return (file, options) => {
    options = options || {};
    if (ateos.isString(options)) {
      options = { encoding: options };
    }
        
    let shouldThrow = true;
    if ("throws" in options) {
      shouldThrow = options.throws;
    }
    
    try {
      let content = fs.readFileSync(file, options);
      content = stripBom(content);
      return JSON.parse(content, options.reviver);
    } catch (err) {
      if (shouldThrow) {
        err.message = `${file}: ${err.message}`;
        throw err;
      } else {
        return null;
      }
    }
  };    
};
