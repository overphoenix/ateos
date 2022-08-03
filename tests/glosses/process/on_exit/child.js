require("ateos");

const {
    process: { onExit }
} = ateos;

for (let i = 0; i < 15; i++) {
    onExit(() => {
        console.log("ok");
    });
}
