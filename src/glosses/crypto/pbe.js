/**
 * Password-based encryption functions.
 *
 * @author Dave Longley
 * @author Stefan Siegl <stesie@brokenpipe.de>
 *
 * Copyright (c) 2010-2013 Digital Bazaar, Inc.
 * Copyright (c) 2012 Stefan Siegl <stesie@brokenpipe.de>
 *
 * An EncryptedPrivateKeyInfo:
 *
 * EncryptedPrivateKeyInfo ::= SEQUENCE {
 *   encryptionAlgorithm  EncryptionAlgorithmIdentifier,
 *   encryptedData        EncryptedData }
 *
 * EncryptionAlgorithmIdentifier ::= AlgorithmIdentifier
 *
 * EncryptedData ::= OCTET STRING
 */

const {
  is,
  crypto
} = ateos;

if (is.undefined(BigInteger)) {
  var BigInteger = crypto.jsbn.BigInteger;
}

// shortcut for asn.1 API
const { asn1 } = crypto;


// validator for a PBES2Algorithms structure
// Note: Currently only works w/PBKDF2 + AES encryption schemes
const PBES2AlgorithmsValidator = {
  name: "PBES2Algorithms",
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: "PBES2Algorithms.keyDerivationFunc",
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true,
    value: [{
      name: "PBES2Algorithms.keyDerivationFunc.oid",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.OID,
      constructed: false,
      capture: "kdfOid"
    }, {
      name: "PBES2Algorithms.params",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PBES2Algorithms.params.salt",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "kdfSalt"
      }, {
        name: "PBES2Algorithms.params.iterationCount",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "kdfIterationCount"
      }, {
        name: "PBES2Algorithms.params.keyLength",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        optional: true,
        capture: "keyLength"
      }, {
        // prf
        name: "PBES2Algorithms.params.prf",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        optional: true,
        value: [{
          name: "PBES2Algorithms.params.prf.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "prfOid"
        }]
      }]
    }]
  }, {
    name: "PBES2Algorithms.encryptionScheme",
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.SEQUENCE,
    constructed: true,
    value: [{
      name: "PBES2Algorithms.encryptionScheme.oid",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.OID,
      constructed: false,
      capture: "encOid"
    }, {
      name: "PBES2Algorithms.encryptionScheme.iv",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.OCTETSTRING,
      constructed: false,
      capture: "encIv"
    }]
  }]
};

const pkcs12PbeParamsValidator = {
  name: "pkcs-12PbeParams",
  tagClass: asn1.Class.UNIVERSAL,
  type: asn1.Type.SEQUENCE,
  constructed: true,
  value: [{
    name: "pkcs-12PbeParams.salt",
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.OCTETSTRING,
    constructed: false,
    capture: "salt"
  }, {
    name: "pkcs-12PbeParams.iterations",
    tagClass: asn1.Class.UNIVERSAL,
    type: asn1.Type.INTEGER,
    constructed: false,
    capture: "iterations"
  }]
};

/**
 * Derives a PKCS#12 key.
 *
 * @param password the password to derive the key material from, null or
 *          undefined for none.
 * @param salt the salt, as a ByteBuffer, to use.
 * @param id the PKCS#12 ID byte (1 = key material, 2 = IV, 3 = MAC).
 * @param iter the iteration count.
 * @param n the number of bytes to derive from the password.
 * @param md the message digest to use, defaults to SHA-1.
 *
 * @return a ByteBuffer with the bytes derived from the password.
 */
export const generatePkcs12Key = function (password, salt, id, iter, n, md) {
  let j; let l;

  if (is.nil(md)) {
    if (!("sha1" in crypto.md)) {
      throw new Error('"sha1" hash algorithm unavailable.');
    }
    md = crypto.md.sha1.create();
  }

  const u = md.digestLength;
  const v = md.blockLength;
  const result = new crypto.util.ByteBuffer();

  /**
     * Convert password to Unicode byte buffer + trailing 0-byte.
     */
  const passBuf = new crypto.util.ByteBuffer();
  if (!is.nil(password)) {
    for (l = 0; l < password.length; l++) {
      passBuf.putInt16(password.charCodeAt(l));
    }
    passBuf.putInt16(0);
  }

  /**
     * Length of salt and password in BYTES.
     */
  const p = passBuf.length();
  const s = salt.length();

  /**
     * 1. Construct a string, D (the "diversifier"), by concatenating
     */
  const D = new crypto.util.ByteBuffer();
  D.fillWithByte(id, v);

  /**
     * 2. Concatenate copies of the salt together to create a string S of length
     * v * ceil(s / v) bytes (the final copy of the salt may be trunacted
     * to create S).
     */
  const Slen = v * Math.ceil(s / v);
  const S = new crypto.util.ByteBuffer();
  for (l = 0; l < Slen; l++) {
    S.putByte(salt.at(l % s));
  }

  /**
     * 3. Concatenate copies of the password together to create a string P of
     * length v * ceil(p / v) bytes (the final copy of the password may be
     * truncated to create P).
     */
  const Plen = v * Math.ceil(p / v);
  const P = new crypto.util.ByteBuffer();
  for (l = 0; l < Plen; l++) {
    P.putByte(passBuf.at(l % p));
  }

  /**
     * 4. Set I=S||P to be the concatenation of S and P.
     */
  let I = S;
  I.putBuffer(P);

  /**
     * 5. Set c=ceil(n / u).
     */
  const c = Math.ceil(n / u);

  /* 6. For i=1, 2, ..., c, do the following: */
  for (let i = 1; i <= c; i++) {
    /**
         * a) Set Ai=H^r(D||I). (l.e. the rth hash of D||I, H(H(H(...H(D||I))))
         */
    let buf = new crypto.util.ByteBuffer();
    buf.putBytes(D.bytes());
    buf.putBytes(I.bytes());
    for (let round = 0; round < iter; round++) {
      md.start();
      md.update(buf.getBytes());
      buf = md.digest();
    }

    /**
         * b) Concatenate copies of Ai to create a string B of length v bytes (the
         */
    const B = new crypto.util.ByteBuffer();
    for (l = 0; l < v; l++) {
      B.putByte(buf.at(l % u));
    }

    /**
         * c) Treating I as a concatenation I0, I1, ..., Ik-1 of v-byte blocks,
         * where k=ceil(s / v) + ceil(p / v), modify I by setting
         */
    const k = Math.ceil(s / v) + Math.ceil(p / v);
    const Inew = new crypto.util.ByteBuffer();
    for (j = 0; j < k; j++) {
      const chunk = new crypto.util.ByteBuffer(I.getBytes(v));
      let x = 0x1ff;
      for (l = B.length() - 1; l >= 0; l--) {
        x = x >> 8;
        x += B.at(l) + chunk.at(l);
        chunk.setAt(l, x & 0xff);
      }
      Inew.putBuffer(chunk);
    }
    I = Inew;

    /**
         * Add Ai to A.
         */
    result.putBuffer(buf);
  }

  result.truncate(result.length() - n);
  return result;
};

/**
 * Get new Forge cipher object instance.
 *
 * @param oid the OID (in string notation).
 * @param params the ASN.1 params object.
 * @param password the password to decrypt with.
 *
 * @return new cipher object instance.
 */
export const getCipher = function (oid, params, password) {
  switch (oid) {
    case crypto.pki.oids.pkcs5PBES2:
      return getCipherForPBES2(oid, params, password);

    case crypto.pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
    case crypto.pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
      return getCipherForPKCS12PBE(oid, params, password);

    default:
      var error = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
      error.oid = oid;
      error.supportedOids = [
        "pkcs5PBES2",
        "pbeWithSHAAnd3-KeyTripleDES-CBC",
        "pbewithSHAAnd40BitRC2-CBC"
      ];
      throw error;
  }
};

/**
 * Get new Forge cipher object instance according to PBES2 params block.
 *
 * The returned cipher instance is already started using the IV
 * from PBES2 parameter block.
 *
 * @param oid the PKCS#5 PBKDF2 OID (in string notation).
 * @param params the ASN.1 PBES2-params object.
 * @param password the password to decrypt with.
 *
 * @return new cipher object instance.
 */
export const getCipherForPBES2 = function (oid, params, password) {
  // get PBE params
  const capture = {};
  const errors = [];
  if (!asn1.validate(params, PBES2AlgorithmsValidator, capture, errors)) {
    var error = new Error("Cannot read password-based-encryption algorithm " +
            "parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
    error.errors = errors;
    throw error;
  }

  // check oids
  oid = asn1.derToOid(capture.kdfOid);
  if (oid !== crypto.pki.oids.pkcs5PBKDF2) {
    var error = new Error("Cannot read encrypted private key. " +
            "Unsupported key derivation function OID.");
    error.oid = oid;
    error.supportedOids = ["pkcs5PBKDF2"];
    throw error;
  }
  oid = asn1.derToOid(capture.encOid);
  if (oid !== crypto.pki.oids["aes128-CBC"] &&
        oid !== crypto.pki.oids["aes192-CBC"] &&
        oid !== crypto.pki.oids["aes256-CBC"] &&
        oid !== crypto.pki.oids["des-EDE3-CBC"] &&
        oid !== crypto.pki.oids.desCBC) {
    var error = new Error("Cannot read encrypted private key. " +
            "Unsupported encryption scheme OID.");
    error.oid = oid;
    error.supportedOids = [
      "aes128-CBC", "aes192-CBC", "aes256-CBC", "des-EDE3-CBC", "desCBC"];
    throw error;
  }

  // set PBE params
  const salt = capture.kdfSalt;
  let count = crypto.util.createBuffer(capture.kdfIterationCount);
  count = count.getInt(count.length() << 3);
  let dkLen;
  let cipherFn;
  switch (crypto.pki.oids[oid]) {
    case "aes128-CBC":
      dkLen = 16;
      cipherFn = crypto.aes.createDecryptionCipher;
      break;
    case "aes192-CBC":
      dkLen = 24;
      cipherFn = crypto.aes.createDecryptionCipher;
      break;
    case "aes256-CBC":
      dkLen = 32;
      cipherFn = crypto.aes.createDecryptionCipher;
      break;
    case "des-EDE3-CBC":
      dkLen = 24;
      cipherFn = crypto.des.createDecryptionCipher;
      break;
    case "desCBC":
      dkLen = 8;
      cipherFn = crypto.des.createDecryptionCipher;
      break;
  }

  // get PRF message digest
  const md = prfOidToMessageDigest(capture.prfOid);

  // decrypt private key using pbe with chosen PRF and AES/DES
  const dk = crypto.pkcs5.pbkdf2(password, salt, count, dkLen, md);
  const iv = capture.encIv;
  const cipher = cipherFn(dk);
  cipher.start(iv);

  return cipher;
};

/**
 * Get new Forge cipher object instance for PKCS#12 PBE.
 *
 * The returned cipher instance is already started using the key & IV
 * derived from the provided password and PKCS#12 PBE salt.
 *
 * @param oid The PKCS#12 PBE OID (in string notation).
 * @param params The ASN.1 PKCS#12 PBE-params object.
 * @param password The password to decrypt with.
 *
 * @return the new cipher object instance.
 */
export const getCipherForPKCS12PBE = function (oid, params, password) {
  // get PBE params
  const capture = {};
  const errors = [];
  if (!asn1.validate(params, pkcs12PbeParamsValidator, capture, errors)) {
    var error = new Error("Cannot read password-based-encryption algorithm " +
            "parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
    error.errors = errors;
    throw error;
  }

  const salt = crypto.util.createBuffer(capture.salt);
  let count = crypto.util.createBuffer(capture.iterations);
  count = count.getInt(count.length() << 3);

  let dkLen; let dIvLen; let cipherFn;
  switch (oid) {
    case crypto.pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
      dkLen = 24;
      dIvLen = 8;
      cipherFn = crypto.des.startDecrypting;
      break;

    case crypto.pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
      dkLen = 5;
      dIvLen = 8;
      cipherFn = function (key, iv) {
        const cipher = crypto.rc2.createDecryptionCipher(key, 40);
        cipher.start(iv, null);
        return cipher;
      };
      break;

    default:
      var error = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
      error.oid = oid;
      throw error;
  }

  // get PRF message digest
  const md = prfOidToMessageDigest(capture.prfOid);
  const key = generatePkcs12Key(password, salt, 1, count, dkLen, md);
  md.start();
  const iv = generatePkcs12Key(password, salt, 2, count, dIvLen, md);

  return cipherFn(key, iv);
};

/**
 * OpenSSL's legacy key derivation function.
 *
 * See: http://www.openssl.org/docs/crypto/EVP_BytesToKey.html
 *
 * @param password the password to derive the key from.
 * @param salt the salt to use, null for none.
 * @param dkLen the number of bytes needed for the derived key.
 * @param [options] the options to use:
 *          [md] an optional message digest object to use.
 */
export const opensslDeriveBytes = function (password, salt, dkLen, md) {
  if (is.nil(md)) {
    if (!("md5" in crypto.md)) {
      throw new Error('"md5" hash algorithm unavailable.');
    }
    md = crypto.md.md5.create();
  }
  if (is.null(salt)) {
    salt = "";
  }
  const digests = [hash(md, password + salt)];
  for (let length = 16, i = 1; length < dkLen; ++i, length += 16) {
    digests.push(hash(md, digests[i - 1] + password + salt));
  }
  return digests.join("").substr(0, dkLen);
};

function hash(md, bytes) {
  return md.start().update(bytes).digest().getBytes();
}

function prfOidToMessageDigest(prfOid) {
  // get PRF algorithm, default to SHA-1
  let prfAlgorithm;
  if (!prfOid) {
    prfAlgorithm = "hmacWithSHA1";
  } else {
    prfAlgorithm = crypto.pki.oids[asn1.derToOid(prfOid)];
    if (!prfAlgorithm) {
      const error = new Error("Unsupported PRF OID.");
      error.oid = prfOid;
      error.supported = [
        "hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384",
        "hmacWithSHA512"];
      throw error;
    }
  }
  return prfAlgorithmToMessageDigest(prfAlgorithm);
}

export function prfAlgorithmToMessageDigest(prfAlgorithm) {
  let factory = crypto.md;
  switch (prfAlgorithm) {
    case "hmacWithSHA224":
      factory = crypto.md.sha512;
    case "hmacWithSHA1":
    case "hmacWithSHA256":
    case "hmacWithSHA384":
    case "hmacWithSHA512":
      prfAlgorithm = prfAlgorithm.substr(8).toLowerCase();
      break;
    default:
      var error = new Error("Unsupported PRF algorithm.");
      error.algorithm = prfAlgorithm;
      error.supported = [
        "hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384",
        "hmacWithSHA512"];
      throw error;
  }
  if (!factory || !(prfAlgorithm in factory)) {
    throw new Error(`Unknown hash algorithm: ${prfAlgorithm}`);
  }
  return factory[prfAlgorithm].create();
}

export function createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm) {
  const params = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
    // salt
    asn1.create(
      asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, salt),
    // iteration count
    asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
      countBytes.getBytes())
  ]);
    // when PRF algorithm is not SHA-1 default, add key length and PRF algorithm
  if (prfAlgorithm !== "hmacWithSHA1") {
    params.value.push(
      // key length
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.INTEGER, false,
        crypto.util.hexToBytes(dkLen.toString(16))),
      // AlgorithmIdentifier
      asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // algorithm
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OID, false,
          asn1.oidToDer(crypto.pki.oids[prfAlgorithm]).getBytes()),
        // parameters (null)
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
      ]));
  }
  return params;
}
