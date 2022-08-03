#!/usr/bin/env node

import "..";
import ATEOSApp from "../lib/app/main";

const versions = {
  ateos: ateos.package.version,
  node: process.version,
  ...process.versions
};

ateos.app.run(ATEOSApp, {
  useArgs: true,
  version: Object.keys(versions).map((k) => `${k}: ${versions[k]}`).join("\n")
});
