import { improve } from "./extra";

const ct = typeof (global.__custom_base_fs__);
const customBaseFs = (ct === "object")
  ? global.__custom_base_fs__
  : ct === "function"
    ? global.__custom_base_fs__()
    : null;

const base = customBaseFs || require("./base").default;

const efs = ateos.asNamespace(improve(base));
efs.base = base;
efs.improveFs = improve;

ateos.lazify({
  custom: "./custom"
}, efs, require);

// export improved (extended and promisified) version of base.
export default efs;
