const {
  project
} = ateos;

const TEMPLATE =
`#!/usr/bin/env node

import "ateos";

const {
    app
} = ateos;

class {{ name }}Application extends app.Application {
    async configure() {

    }

    async initialize() {

    }

    async main() {
        ateos.cli.print("{bold}Awesome ateos application!{/}\\n");
        return 0;
    }

    async uninitialize() {

    }
}

app.run({{ name }}Application);
`;

export default class ApplicationTask extends project.BaseTask {
  async main(input) {
    this.manager.notify(this, "progress", {
      message: "generating application source files"
    });

    if (!ateos.isString(input.name)) {
      throw new ateos.error.NotValidException("Name should be a valid string");
    }
    return project.helper.createFile(TEMPLATE, input);
  }
}
