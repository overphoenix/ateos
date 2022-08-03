const {
  is,
  error,
  netron: { Definition, Definitions, meta: netronMeta }
} = ateos;

export default class Stub {
  constructor(manager, obj) {
    this.manager = manager;
    if (is.netronContext(obj)) {
      this.instance = obj;
      this.reflection = netronMeta.Reflection.from(obj);
    } else {
      this.instance = obj.instance;
      this.reflection = obj;
    }
    this._def = null;
  }

  get definition() {
    if (is.null(this._def)) {
      const r = this.reflection;
      const def = this._def = new Definition();

      def.id = this.manager.uid.create();
      def.parentId = 0;
      def.name = r.getName();
      def.description = r.getDescription();
      if (r.hasTwin()) {
        def.twin = r.getTwin();
      }

      const methods = r.getMethods();
      const $ = def.$ = {};
      for (const [method, meta] of methods) {
        const args = [];
        for (const arg of meta.args) {
          args.push([netronMeta.getNameOfType(arg[0]), arg[1]]);
        }
        $[method] = {
          method: true,
          type: netronMeta.getNameOfType(meta.type),
          args,
          description: meta.description
        };
      }
      const properties = r.getProperties();
      for (const [prop, meta] of properties) {
        $[prop] = {
          type: netronMeta.getNameOfType(meta.type),
          readonly: meta.readonly,
          description: meta.description
        };
      }
    }
    return this._def;
  }

  set(prop, data, peer) {
    let $ = this.definition.$;
    if (prop in $) {
      $ = $[prop];
      if ($.method) {
        this._processArgs(peer, data, true);
        const result = this.instance[prop](...data);
        if (is.promise(result)) {
          return result.then(ateos.noop);
        }
        return undefined;
      } else if (!$.readonly) {
        data = this._processArgs(peer, data, false);
        this.instance[prop] = data;
        return undefined;
      }
      throw new error.InvalidAccessException(`${prop} is not writable`);
    }
    throw new error.NotExistsException(`Property '${prop}' not exists`);
  }

  get(prop, defaultData, peer) {
    let $ = this.definition.$;
    if (prop in $) {
      $ = $[prop];
      if ($.method) {
        this._processArgs(peer, defaultData, true);
        const result = this.instance[prop](...defaultData);
        if (is.promise(result)) {
          return result.then((result) => this._processResult(peer, result));
        }
        return this._processResult(peer, result);
      }
      let val = this.instance[prop];
      if (is.undefined(val)) {
        defaultData = this._processArgs(peer, defaultData, false);
        val = defaultData;
      } else {
        val = this._processResult(peer, val);
      }
      return val;
    }
    throw new error.NotExistsException(`Property '${prop}' not exists`);
  }

  _processResult(peer, result) {
    if (is.netronContext(result)) {
      result = this.manager.netron.refContext(peer.id, result);
      result.parentId = result.parentId || this._def.id;
      result.uid = peer.id; // definition owner
    } else if (is.netronDefinitions(result)) {
      const newDefs = new Definitions();
      for (let i = 0; i < result.length; i++) {
        const obj = result.get(i);
        newDefs.push(this._processResult(peer, obj));
      }
      return newDefs;
    }
    return result;
  }

  _processArgs(peer, args, isMethod) {
    if (isMethod && is.array(args)) {
      for (let i = 0; i < args.length; ++i) {
        args[i] = this._processObject(peer, args[i]);
      }
    } else {
      return this._processObject(peer, args);
    }
  }

  _processObject(peer, obj) {
    if (is.netronReference(obj)) {
      return this.manager.getStub(obj.defId).instance;
    } else if (is.netronDefinition(obj)) {
      peer._updateDefinitions({ weak: obj });
      return this.manager.netron.interfaceFactory.create(obj, peer);
    } else if (is.netronDefinitions(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj.set(i, this._processObject(peer, obj.get(i)));
      }
    }
    return obj;
  }
}
