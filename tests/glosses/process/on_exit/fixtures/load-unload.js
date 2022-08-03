require("ateos");

// just be silly with calling these functions a bunch
// mostly just to get coverage of the guard branches
const { onExit } = ateos.process;
onExit.load();
onExit.load();
onExit.unload();
onExit.unload();
