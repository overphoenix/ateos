export const DOMAIN = {
  PUBLIC: "public", // tasks available from anywhere
  PRIVATE: "private", // tasks available only for realm
  DEV: "dev" // tasks available only for realm managing them in dev stage (not included in release)
};

const realm = ateos.lazify({
  Configuration: "./configuration",
  DevConfiguration: "./dev_configuration",
  RealmManager: "./manager",
  RealmArtifacts: "./artifacts",
  TransformTask: "./transform_task",
  rootRealm: () => new realm.RealmManager({ cwd: ateos.HOME })
}, exports, require);
