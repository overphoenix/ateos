/**
 * A javascript implementation of a cryptographically-secure
 * Pseudo Random Number Generator (PRNG). The Fortuna algorithm is followed
 * here though the use of SHA-256 is not enforced; when generating an
 * a PRNG context, the hashing algorithm and block cipher used for
 * the generator are specified via a plugin.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
 */

const {
  is,
  crypto
} = ateos;

let _crypto = null;
if (ateos.isNodejs && !crypto.options.usePureJavaScript &&
  !process.versions["node-webkit"]) {
  _crypto = require("crypto");
}

/**
 * Creates a new PRNG context.
 *
 * A PRNG plugin must be passed in that will provide:
 *
 * 1. A function that initializes the key and seed of a PRNG context. It
 *   will be given a 16 byte key and a 16 byte seed. Any key expansion
 *   or transformation of the seed from a byte string into an array of
 *   integers (or similar) should be performed.
 * 2. The cryptographic function used by the generator. It takes a key and
 *   a seed.
 * 3. A seed increment function. It takes the seed and returns seed + 1.
 * 4. An api to create a message digest.
 *
 * For an example, see random.js.
 *
 * @param plugin the PRNG plugin to use.
 */
export const create = function (plugin) {
  const ctx = {
    plugin,
    key: null,
    seed: null,
    time: null,
    // number of reseeds so far
    reseeds: 0,
    // amount of data generated so far
    generated: 0,
    // no initial key bytes
    keyBytes: ""
  };

  // create 32 entropy pools (each is a message digest)
  const md = plugin.md;
  const pools = new Array(32);
  for (let i = 0; i < 32; ++i) {
    pools[i] = md.create();
  }
  ctx.pools = pools;

  // entropy pools are written to cyclically, starting at index 0
  ctx.pool = 0;

  /**
     * Generates random bytes. The bytes may be generated synchronously or
     * asynchronously. Web workers must use the asynchronous interface or
     * else the behavior is undefined.
     *
     * @param count the number of random bytes to generate.
     * @param [callback(err, bytes)] called once the operation completes.
     *
     * @return count random bytes as a string.
     */
  ctx.generate = function (count, callback) {
    // do synchronously
    if (!callback) {
      return ctx.generateSync(count);
    }

    // simple generator using counter-based CBC
    const cipher = ctx.plugin.cipher;
    const increment = ctx.plugin.increment;
    const formatKey = ctx.plugin.formatKey;
    const formatSeed = ctx.plugin.formatSeed;
    const b = crypto.util.createBuffer();

    // paranoid deviation from Fortuna:
    // reset key for every request to protect previously
    // generated random bytes should the key be discovered;
    // there is no 100ms based reseeding because of this
    // forced reseed for every `generate` call
    ctx.key = null;

    generate();

    function generate(err) {
      if (err) {
        return callback(err);
      }

      // sufficient bytes generated
      if (b.length() >= count) {
        return callback(null, b.getBytes(count));
      }

      // if amount of data generated is greater than 1 MiB, trigger reseed
      if (ctx.generated > 0xfffff) {
        ctx.key = null;
      }

      if (ateos.isNull(ctx.key)) {
        // prevent stack overflow
        return crypto.util.nextTick(() => {
          _reseed(generate);
        });
      }

      // generate the random bytes
      const bytes = cipher(ctx.key, ctx.seed);
      ctx.generated += bytes.length;
      b.putBytes(bytes);

      // generate bytes for a new key and seed
      ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
      ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));

      crypto.util.setImmediate(generate);
    }
  };

  /**
     * Generates random bytes synchronously.
     *
     * @param count the number of random bytes to generate.
     *
     * @return count random bytes as a string.
     */
  ctx.generateSync = function (count) {
    // simple generator using counter-based CBC
    const cipher = ctx.plugin.cipher;
    const increment = ctx.plugin.increment;
    const formatKey = ctx.plugin.formatKey;
    const formatSeed = ctx.plugin.formatSeed;

    // paranoid deviation from Fortuna:
    // reset key for every request to protect previously
    // generated random bytes should the key be discovered;
    // there is no 100ms based reseeding because of this
    // forced reseed for every `generateSync` call
    ctx.key = null;

    const b = crypto.util.createBuffer();
    while (b.length() < count) {
      // if amount of data generated is greater than 1 MiB, trigger reseed
      if (ctx.generated > 0xfffff) {
        ctx.key = null;
      }

      if (ateos.isNull(ctx.key)) {
        _reseedSync();
      }

      // generate the random bytes
      const bytes = cipher(ctx.key, ctx.seed);
      ctx.generated += bytes.length;
      b.putBytes(bytes);

      // generate bytes for a new key and seed
      ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
      ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
    }

    return b.getBytes(count);
  };

  /**
     * Private function that asynchronously reseeds a generator.
     *
     * @param callback(err) called once the operation completes.
     */
  function _reseed(callback) {
    if (ctx.pools[0].messageLength >= 32) {
      _seed();
      return callback();
    }
    // not enough seed data...
    const needed = (32 - ctx.pools[0].messageLength) << 5;
    ctx.seedFile(needed, (err, bytes) => {
      if (err) {
        return callback(err);
      }
      ctx.collect(bytes);
      _seed();
      callback();
    });
  }

  /**
     * Private function that synchronously reseeds a generator.
     */
  function _reseedSync() {
    if (ctx.pools[0].messageLength >= 32) {
      return _seed();
    }
    // not enough seed data...
    const needed = (32 - ctx.pools[0].messageLength) << 5;
    ctx.collect(ctx.seedFileSync(needed));
    _seed();
  }

  /**
     * Private function that seeds a generator once enough bytes are available.
     */
  function _seed() {
    // update reseed count
    ctx.reseeds = (ctx.reseeds === 0xffffffff) ? 0 : ctx.reseeds + 1;

    // goal is to update `key` via:
    // key = hash(key + s)
    //   where 's' is all collected entropy from selected pools, then...

    // create a plugin-based message digest
    const md = ctx.plugin.md.create();

    // consume current key bytes
    md.update(ctx.keyBytes);

    // digest the entropy of pools whose index k meet the
    // condition 'n mod 2^k == 0' where n is the number of reseeds
    let _2powK = 1;
    for (let k = 0; k < 32; ++k) {
      if (ctx.reseeds % _2powK === 0) {
        md.update(ctx.pools[k].digest().getBytes());
        ctx.pools[k].start();
      }
      _2powK = _2powK << 1;
    }

    // get digest for key bytes
    ctx.keyBytes = md.digest().getBytes();

    // paranoid deviation from Fortuna:
    // update `seed` via `seed = hash(key)`
    // instead of initializing to zero once and only
    // ever incrementing it
    md.start();
    md.update(ctx.keyBytes);
    const seedBytes = md.digest().getBytes();

    // update state
    ctx.key = ctx.plugin.formatKey(ctx.keyBytes);
    ctx.seed = ctx.plugin.formatSeed(seedBytes);
    ctx.generated = 0;
  }

  /**
     * The built-in default seedFile. This seedFile is used when entropy
     * is needed immediately.
     *
     * @param needed the number of bytes that are needed.
     *
     * @return the random bytes.
     */
  function defaultSeedFile(needed) {
    // use window.crypto.getRandomValues strong source of entropy if available
    let getRandomValues = null;
    const globalScope = crypto.util.globalScope;
    const _crypto = globalScope.crypto || globalScope.msCrypto;
    if (_crypto && _crypto.getRandomValues) {
      getRandomValues = function (arr) {
        return _crypto.getRandomValues(arr);
      };
    }

    const b = crypto.util.createBuffer();
    if (getRandomValues) {
      while (b.length() < needed) {
        // max byte length is 65536 before QuotaExceededError is thrown
        // http://www.w3.org/TR/WebCryptoAPI/#RandomSource-method-getRandomValues
        const count = Math.max(1, Math.min(needed - b.length(), 65536) / 4);
        const entropy = new Uint32Array(Math.floor(count));
        try {
          getRandomValues(entropy);
          for (var i = 0; i < entropy.length; ++i) {
            b.putInt32(entropy[i]);
          }
        } catch (e) {
          /* only ignore QuotaExceededError */
          if (!(!ateos.isUndefined(QuotaExceededError) &&
            e instanceof QuotaExceededError)) {
            throw e;
          }
        }
      }
    }

    // be sad and add some weak random data
    if (b.length() < needed) {
      /**
             * Draws from Park-Miller "minimal standard" 31 bit PRNG,
             * implemented with David G. Carta's optimization: with 32 bit math
             */
      let hi; let lo; let next;
      let seed = Math.floor(Math.random() * 0x010000);
      while (b.length() < needed) {
        lo = 16807 * (seed & 0xFFFF);
        hi = 16807 * (seed >> 16);
        lo += (hi & 0x7FFF) << 16;
        lo += hi >> 15;
        lo = (lo & 0x7FFFFFFF) + (lo >> 31);
        seed = lo & 0xFFFFFFFF;

        // consume lower 3 bytes of seed
        for (var i = 0; i < 3; ++i) {
          // throw in more pseudo random
          next = seed >>> (i << 3);
          next ^= Math.floor(Math.random() * 0x0100);
          b.putByte(String.fromCharCode(next & 0xFF));
        }
      }
    }

    return b.getBytes(needed);
  }
  // initialize seed file APIs
  if (_crypto) {
    // use nodejs async API
    ctx.seedFile = function (needed, callback) {
      _crypto.randomBytes(needed, (err, bytes) => {
        if (err) {
          return callback(err);
        }
        callback(null, bytes.toString());
      });
    };
    // use nodejs sync API
    ctx.seedFileSync = function (needed) {
      return _crypto.randomBytes(needed).toString();
    };
  } else {
    ctx.seedFile = function (needed, callback) {
      try {
        callback(null, defaultSeedFile(needed));
      } catch (e) {
        callback(e);
      }
    };
    ctx.seedFileSync = defaultSeedFile;
  }

  /**
     * Adds entropy to a prng ctx's accumulator.
     *
     * @param bytes the bytes of entropy as a string.
     */
  ctx.collect = function (bytes) {
    // iterate over pools distributing entropy cyclically
    const count = bytes.length;
    for (let i = 0; i < count; ++i) {
      ctx.pools[ctx.pool].update(bytes.substr(i, 1));
      ctx.pool = (ctx.pool === 31) ? 0 : ctx.pool + 1;
    }
  };

  /**
     * Collects an integer of n bits.
     *
     * @param i the integer entropy.
     * @param n the number of bits in the integer.
     */
  ctx.collectInt = function (i, n) {
    let bytes = "";
    for (let x = 0; x < n; x += 8) {
      bytes += String.fromCharCode((i >> x) & 0xFF);
    }
    ctx.collect(bytes);
  };

  /**
     * Registers a Web Worker to receive immediate entropy from the main thread.
     * This method is required until Web Workers can access the native crypto
     * API. This method should be called twice for each created worker, once in
     * the main thread, and once in the worker itself.
     *
     * @param worker the worker to register.
     */
  ctx.registerWorker = function (worker) {
    // worker receives random bytes
    if (worker === self) {
      ctx.seedFile = function (needed, callback) {
        function listener(e) {
          const data = e.data;
          if (data.forge && data.forge.prng) {
            self.removeEventListener("message", listener);
            callback(data.forge.prng.err, data.forge.prng.bytes);
          }
        }
        self.addEventListener("message", listener);
        self.postMessage({ forge: { prng: { needed } } });
      };
    } else {
      // main thread sends random bytes upon request
      const listener = function (e) {
        const data = e.data;
        if (data.forge && data.forge.prng) {
          ctx.seedFile(data.forge.prng.needed, (err, bytes) => {
            worker.postMessage({ forge: { prng: { err, bytes } } });
          });
        }
      };
      // TODO: do we need to remove the event listener when the worker dies?
      worker.addEventListener("message", listener);
    }
  };

  return ctx;
};
