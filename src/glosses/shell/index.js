const shell = require("shelljs");

ateos.lazify({
  plugin: "shelljs/plugin"
}, ateos.asNamespace(shell), require);

export default shell;
