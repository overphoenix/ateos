import interfaceSuite from "../glosses/configurations/interface";

const {
    cli: { Configuration }
} = ateos;

describe("cli", "Configuration", () => {
    interfaceSuite(Configuration);
});
