require("ateos");

ateos.process.onExit((code, signal) => {
    console.log(`exited with process.exit(), ${code}, ${signal}`);
});

process.exit(32);
