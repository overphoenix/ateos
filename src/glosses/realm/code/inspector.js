const {
  is,
  realm
} = ateos;

export default class Inspector {
  constructor(cwd = ateos.HOME) {
    this.cwd = cwd;
    this.namespaces = new Map();
  }

  async attachNamespace(nsName) {
    if (!this.namespaces.has(nsName)) {
      const ns = await realm.code.Namespace.inspect(nsName, this.cwd);
      // console.log(ns.name);
      // console.log(ateos.meta.inspect(Object.keys(ns.exports), { style: "color" }));
      this.namespaces.set(nsName, ns/*await realm.code.Namespace.inspect(nsName, this.cwd)*/);
    }
  }

  isAttached(name) {
    const { namespace } = ateos.meta.parseName(name);
    return this.namespaces.has(namespace);
  }

  listNamespaces() {
    return [...this.namespaces.keys()];
  }

  getNamespace(name, names = null) {
    const { namespace, objectName } = ateos.meta.parseName(name);
    if (!this.namespaces.has(namespace)) {
      throw new ateos.error.UnknownException(`Unknown namespace: '${namespace}'`);
    }
    if (ateos.isPlainObject(names)) {
      names.namespace = namespace;
      names.objectName = objectName;
    }
    return this.namespaces.get(namespace);
  }

  get(name) {
    const names = {};
    const ns = this.getNamespace(name, names);
    return ns.get(names.objectName);
  }

  getCode(name) {
    const xObj = this.get(name);
    return xObj.code;
  }
}
