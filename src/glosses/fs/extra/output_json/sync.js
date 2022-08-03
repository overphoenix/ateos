export default (fs) => {
  const {
    path
  } = ateos;
    
  return (file, data, options) => {
    const dir = path.dirname(file);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirpSync(dir);
    }
    
    fs.writeJsonSync(file, data, options);
  };    
};
