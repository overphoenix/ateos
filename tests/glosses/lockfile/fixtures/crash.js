

const fs = require("fs");
const lockfile = require("../..");

const tmpDir = `${__dirname}/../tmp`;

fs.writeFileSync(`${tmpDir}/foo`, "");

lockfile.lockSync(`${tmpDir}/foo`);

throw new Error("intencional crash");
