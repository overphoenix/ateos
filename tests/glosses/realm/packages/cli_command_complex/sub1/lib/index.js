Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = class TestCommand extends ateos.app.Subsystem {
    async configure() {
        await ateos.runtime.netron.getInterface("cli").defineCommand(this, {
            handler: this.testCommand
        });
    }

    testCommand() {
        console.log("well done 1");
    }
};
