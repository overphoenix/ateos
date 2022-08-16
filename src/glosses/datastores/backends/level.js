const {
  is,
  database: { level },
  datastore: { interface: { Key, error, util } }
} = ateos;
const { filter, map, take, sortAll } = util;

const levelIteratorToIterator = (li) => {
  return {
    next: () => new Promise((resolve, reject) => {
      li.next((err, key, value) => {
        if (err) {
          return reject(err); 
        }
        if (ateos.isNil(key)) {
          return resolve({ done: true }); 
        }
        resolve({ done: false, value: { key, value } });
      });
    }),
    return: () => new Promise((resolve, reject) => {
      li.end((err) => {
        if (err) {
          return reject(err); 
        }
        resolve({ done: true });
      });
    }),
    [Symbol.asyncIterator]() {
      return this;
    }
  };
};


/**
 * A datastore backed by leveldb.
 */
export default class LevelDatastore {
  constructor(path, opts) {
    let database;

    if (opts && opts.db) {
      database = opts.db;
      delete opts.db;
    } else {
      database = level.packager(level.backend.LevelDB);
    }

    this.db = this._initDb(database, path, opts);
  }

  _initDb(database, path, opts) {
    return database(path, {
      ...opts,
      valueEncoding: "binary",
      compression: false // same default as go
    });
  }

  async open() {
    try {
      await this.db.open();
    } catch (err) {
      throw error.dbOpenFailedError(err);
    }
  }

  async put(key, value) {
    try {
      await this.db.put(key.toString(), value);
    } catch (err) {
      throw error.dbWriteFailedError(err);
    }
  }

  async get(key) {
    let data;
    try {
      data = await this.db.get(key.toString());
    } catch (err) {
      if (err instanceof ateos.error.NotFoundException) {
        throw error.notFoundError(err); 
      }
      throw error.dbWriteFailedError(err);
    }
    return data;
  }

  async has(key) {
    try {
      await this.db.get(key.toString());
    } catch (err) {
      if (err instanceof ateos.error.NotFoundException) {
        return false; 
      }
      throw err;
    }
    return true;
  }

  async delete(key) {
    try {
      await this.db.del(key.toString());
    } catch (err) {
      throw error.dbDeleteFailedError(err);
    }
  }

  close() {
    return this.db.close();
  }

  batch() {
    const ops = [];
    return {
      put: (key, value) => {
        ops.push({
          type: "put",
          key: key.toString(),
          value
        });
      },
      delete: (key) => {
        ops.push({
          type: "del",
          key: key.toString()
        });
      },
      commit: () => {
        return this.db.batch(ops);
      }
    };
  }

  query(q) {
    let values = true;
    if (!ateos.isNil(q.keysOnly)) {
      values = !q.keysOnly;
    }

    let it = levelIteratorToIterator(
      this.db.db.iterator({
        keys: true,
        values,
        keyAsBuffer: true
      })
    );

    it = map(it, ({ key, value }) => {
      const res = { key: new Key(key, false) };
      if (values) {
        res.value = Buffer.from(value);
      }
      return res;
    });

    if (!ateos.isNil(q.prefix)) {
      it = filter(it, (e) => e.key.toString().startsWith(q.prefix));
    }

    if (ateos.isArray(q.filters)) {
      it = q.filters.reduce((it, f) => filter(it, f), it);
    }

    if (ateos.isArray(q.orders)) {
      it = q.orders.reduce((it, f) => sortAll(it, f), it);
    }

    if (!ateos.isNil(q.offset)) {
      let i = 0;
      it = filter(it, () => i++ >= q.offset);
    }

    if (!ateos.isNil(q.limit)) {
      it = take(it, q.limit);
    }

    return it;
  }
}
