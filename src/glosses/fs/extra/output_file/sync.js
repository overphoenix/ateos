export default (fs) => {
  const {
    path
  } = ateos;
    
  return (file, ...args) => {
    const dir = path.dirname(file);
    if (fs.existsSync(dir)) {
      return fs.writeFileSync(file, ...args);
    }
    fs.mkdirpSync(dir);
    fs.writeFileSync(file, ...args);
  };    
};
