ateos.lazify({
  configure: "./configure",
  build: "./build",
  clean: "./clean"
}, exports, require);

export const getBuildPath = (realm, ...args) => ateos.path.join(realm.getPath("tmp"), "cmake_build", ...args);
