require("ateos");

ateos.process.onExit((code, signal) => {
    console.log(`reached end of execution, ${code}, ${signal}`);
});
