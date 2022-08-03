require("ateos");

let counter = 0;

ateos.process.onExit((code, signal) => {
    counter++;
    console.log("last counter=%j, code=%j, signal=%j",
        counter, code, signal);
}, { alwaysLast: true });

ateos.process.onExit((code, signal) => {
    counter++;
    console.log("first counter=%j, code=%j, signal=%j",
        counter, code, signal);
});

process.kill(process.pid, "SIGHUP");
setTimeout(() => { }, 1000);
