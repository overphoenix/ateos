const {
  datastore: { interface: { util } }
} = ateos;
const { map } = util;

/**
 * A datastore shim, that wraps around a given datastore, changing
 * the way keys look to the user, for example namespacing
 * keys, reversing them, etc.
 */
export default class KeyTransformDatastore {
  constructor(child, transform) {
    this.child = child;
    this.transform = transform;
  }

  open() {
    return this.child.open();
  }

  put(key, val) {
    return this.child.put(this.transform.convert(key), val);
  }

  get(key) {
    return this.child.get(this.transform.convert(key));
  }

  has(key) {
    return this.child.has(this.transform.convert(key));
  }

  delete(key) {
    return this.child.delete(this.transform.convert(key));
  }

  batch() {
    const b = this.child.batch();
    return {
      put: (key, value) => {
        b.put(this.transform.convert(key), value);
      },
      delete: (key) => {
        b.delete(this.transform.convert(key));
      },
      commit: () => {
        return b.commit();
      }
    };
  }

  query(q) {
    return map(this.child.query(q), (e) => {
      e.key = this.transform.invert(e.key);
      return e;
    });
  }

  close() {
    return this.child.close();
  }
}
