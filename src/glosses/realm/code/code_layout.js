const {
  error,
  is,
  std: { path }
} = ateos;

export default class CodeLayout {
  #realm;

  #layout;

  constructor(realm) {

    this.#realm = realm;
    try {
      this.#layout = require(path.join(realm.SPECIAL_PATH, "layout.json"));
    } catch (err) {
      //
    }

    this.namespaces = [];
    this.nsNames = [];

    this.#init();
  }

  parseName(name) {
    let namespace = name;
    while (namespace.length > 0 && !this.nsNames.includes(namespace)) {
      namespace = namespace.split(".").slice(0, -1).join(".");
    }

    let objectName;
    if (namespace.length === 0) {
      objectName = name;
    } else {
      objectName = name.substring(namespace.length + 1);
    }

    return {
      namespace,
      objectName
    };
  }

  getNamespaceInfo(nsName) {
    const namespace = this.namespaces.find((ns) => ns.name === nsName);
    if (ateos.isUndefined(namespace)) {
      throw new error.UnknownException(`Unknown namespace: ${nsName}`);
    }
    return namespace;
  }

  #init() {
    if (!ateos.isNil(this.#layout)) {
      const scanLayout = (layout, prefix) => {
        if (ateos.isNil(layout)) {
          return;
        }
        for (const [name, val] of Object.entries(layout)) {
          if (val.namespace) {
            const nsName = ateos.isNull(prefix) ? name : `${prefix}.${name}`;
            this.nsNames.push(nsName);
            this.namespaces.push({
              name: nsName,
              ...ateos.util.omit(val, "layout")
            });
            scanLayout(val.layout, nsName);
          }
        }
      };

      scanLayout(this.#layout, null);
      this.nsNames.sort((a, b) => a.localeCompare(b));
    }
  }
}
