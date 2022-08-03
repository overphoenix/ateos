export default ({ realm, path: addonPath } = {}) => ateos.fs.remove(ateos.nodejs.cmake.getBuildPath(realm, addonPath));
