import Configuration from "./configuration";
import DevConfiguration from "./dev_configuration";
import RealmManager from "./manager";
import SSHTask from "./ssh_task";
import TransformTask from "./transform_task";

export const DOMAIN = {
  PUBLIC: "public", // tasks available from anywhere
  PRIVATE: "private", // tasks available only for realm in which they are placed
  DEV: "dev" // same as private, but dev-tasks only available in dev stage (not included in release)
};

export interface IRealm {
  DOMAIN: typeof DOMAIN;
  Configuration: typeof Configuration;
  DevConfiguration: typeof DevConfiguration;
  RealmManager: typeof RealmManager;
  TransformTask: typeof TransformTask;
  SSHTask: typeof SSHTask;
  ateosRealm: RealmManager;
}

ateos.lazify({
  Configuration: "./configuration",
  DevConfiguration: "./dev_configuration",
  RealmManager: "./manager",
  RealmArtifacts: "./artifacts",
  TransformTask: "./transform_task",
  SSHTask: "./ssh_task",
  ateosRealm: () => new ateos.realm.RealmManager({ cwd: ateos.HOME })
}, exports, require);
