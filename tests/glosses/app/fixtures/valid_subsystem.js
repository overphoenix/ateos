Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = class AppSubsystem extends ateos.app.Subsystem {
    onConfigure() {
        console.log("configure");
    }

    onInitialize() {
        console.log("initialize");
    }

    onUninitialize() {
        console.log("uninitialize");
    }
};
