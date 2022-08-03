require("ateos");

const { onExit } = ateos.process;

onExit((code, signal) => {
    console.error("onSignalExit(%j,%j)", code, signal);
});
setTimeout(() => {
    console.log("hello");
});
process.kill(process.pid, "SIGPIPE");
