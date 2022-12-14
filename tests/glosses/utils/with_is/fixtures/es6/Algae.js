const {
    util: { withIs }
} = ateos;
const Plant = require("./Plant");

class Algae extends Plant {
    constructor() {
        super("algae");
    }
}

module.exports = withIs(Algae, {
    className: "Algae",
    symbolName: "@org/package/Algae"
});
module.exports.WrappedClass = Algae;
