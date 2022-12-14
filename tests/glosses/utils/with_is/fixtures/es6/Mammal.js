const {
    util: { withIs }
} = ateos;
const Animal = require("./Animal");

class Mammal extends Animal {
    constructor() {
        super("mammal");
    }
}

module.exports = withIs(Mammal, {
    className: "Mammal",
    symbolName: "@org/package/Mammal"
});
module.exports.WrappedClass = Mammal;
