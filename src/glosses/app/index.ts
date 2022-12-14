
import AppHelper from "./glosses/app/app_helper";
import run from "./glosses/app/run";
import Application from "./glosses/app/application";
import StateMachine from "./glosses/app/state_machine";
import Subsystem from "./glosses/app/subsystem";

ateos.lazify({
  StateMachine: "./state_machine",
  Subsystem: "./subsystem",
  Application: "./application",
  AppHelper: "./app_helper",
  run: "./run"
}, exports, require);

export const STATE = {
  INITIAL: "initial",
  CONFIGURING: "configuring",
  CONFIGURED: "configured",
  INITIALIZING: "initializing",
  INITIALIZED: "initialized",
  RUNNING: "running",
  UNINITIALIZING: "uninitializing",
  UNINITIALIZED: "uninitialized",
  FAIL: "fail"
};

export const EXIT = {
  OK: 0,
  INVALID_APP: 64
};

// Decorators
const SUBSYSTEM_ANNOTATION = "subsystem";

const setSubsystemMeta = (target, info) => Reflect.defineMetadata(SUBSYSTEM_ANNOTATION, info, target);
export const getSubsystemMeta = (target) => Reflect.getMetadata(SUBSYSTEM_ANNOTATION, target);

const SubsystemDecorator = (sysInfo = {}) => (target) => {
  const info = getSubsystemMeta(target);
  if (ateos.isUndefined(info)) {
    setSubsystemMeta(target, sysInfo);
  } else {
    Object.assign(info, sysInfo);
  }
};

// Decorators

export const AppSubsystem = SubsystemDecorator;
export const CliMainCommand = (info: any) => (target, key, descriptor) => {
  let sysMeta = getSubsystemMeta(target.constructor);
  info.handler = descriptor.value;
  if (ateos.isUndefined(sysMeta)) {
    if (target instanceof ateos.app.Application) {
      sysMeta = {
        mainCommand: info
      };
    } else {
      sysMeta = info;
    }
    setSubsystemMeta(target.constructor, sysMeta);
  } else {
    if (target instanceof ateos.app.Application) {
      sysMeta.mainCommand = info;
    } else {
      Object.assign(sysMeta, info);
    }
  }
};
export const CliCommand = (commandInfo: any) => (target, key, descriptor) => {
  let sysMeta = getSubsystemMeta(target.constructor);
  commandInfo.handler = descriptor.value;
  if (ateos.isUndefined(sysMeta)) {
    sysMeta = {
      commands: [
        commandInfo
      ]
    };
    setSubsystemMeta(target.constructor, sysMeta);
  } else {
    if (!ateos.isArray(sysMeta.commands)) {
      sysMeta.commands = [
        commandInfo
      ];
    } else {
      sysMeta.commands.push(commandInfo);
    }
  }
};


// import { AppSubsystem, CliCommand, CliMainCommand, getSubsystemMeta, EXIT, STATE } from "./glosses/app/index";


export interface IApp {
  AppHelper: typeof AppHelper;
  AppSubsystem: typeof AppSubsystem;
  Application: typeof Application;
  CliCommand: typeof CliCommand;
  CliMainCommand: typeof CliMainCommand;
  EXIT: typeof EXIT;
  STATE: typeof STATE;
  StateMachine: typeof StateMachine;
  Subsystem: typeof Subsystem;
  getSubsystemMeta: typeof getSubsystemMeta;
  run: typeof run;
}
