// UTF-7-IMAP codec.
// RFC3501 Sec. 5.1.3 Modified UTF-7 (http://tools.ietf.org/html/rfc3501#section-5.1.3)
// Differences:
//  * Base64 part is started by "&" instead of "+"
//  * Direct characters are 0x20-0x7E, except "&" (0x26)
//  * In Base64, "," is used instead of "/"
//  * Base64 must not be used to represent direct characters.
//  * No implicit shift back from Base64 (should always end with '-')
//  * String must end in non-shifted position.
//  * "-&" while in base64 is not allowed.

const base64Regex = /[A-Za-z0-9/+]/;
const base64Chars = [];
for (let i = 0; i < 256; i++) {
  base64Chars[i] = base64Regex.test(String.fromCharCode(i));
}
const minusChar = "-".charCodeAt(0);
const andChar = "&".charCodeAt(0);


class Utf7IMAPEncoder {
  constructor(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = Buffer.alloc(6);
    this.base64AccumIdx = 0;
  }

  write(str) {
    let inBase64 = this.inBase64;
    const base64Accum = this.base64Accum;
    let base64AccumIdx = this.base64AccumIdx;
    const buf = Buffer.alloc(str.length * 5 + 10);
    let bufIdx = 0;

    for (let i = 0; i < str.length; i++) {
      const uChar = str.charCodeAt(i);
      if (uChar >= 0x20 && uChar <= 0x7E) { // Direct character or '&'.
        if (inBase64) {
          if (base64AccumIdx > 0) {
            bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), bufIdx);
            base64AccumIdx = 0;
          }
          buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
          inBase64 = false;
        }
        if (!inBase64) {
          buf[bufIdx++] = uChar; // Write direct character

          if (uChar === andChar) { // Ampersand -> '&-'
            buf[bufIdx++] = minusChar;
          }
        }
      } else { // Non-direct character
        if (!inBase64) {
          buf[bufIdx++] = andChar; // Write '&', then go to base64 mode.
          inBase64 = true;
        }
        if (inBase64) {
          base64Accum[base64AccumIdx++] = uChar >> 8;
          base64Accum[base64AccumIdx++] = uChar & 0xFF;

          if (base64AccumIdx === base64Accum.length) {
            bufIdx += buf.write(base64Accum.toString("base64").replace(/\//g, ","), bufIdx);
            base64AccumIdx = 0;
          }
        }
      }
    }

    this.inBase64 = inBase64;
    this.base64AccumIdx = base64AccumIdx;

    return buf.slice(0, bufIdx);
  }

  end() {
    const buf = Buffer.alloc(10);
    let bufIdx = 0;
    if (this.inBase64) {
      if (this.base64AccumIdx > 0) {
        bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), bufIdx);
        this.base64AccumIdx = 0;
      }
      buf[bufIdx++] = minusChar; // Write '-', then go to direct mode.
      this.inBase64 = false;
    }

    return buf.slice(0, bufIdx);
  }
}

const base64IMAPChars = base64Chars.slice();
base64IMAPChars[",".charCodeAt(0)] = true;

class Utf7IMAPDecoder {
  constructor(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = "";
  }

  write(buf) {
    let res = "";
    let lastI = 0;
    let inBase64 = this.inBase64;
    let base64Accum = this.base64Accum;

    // The decoder is more involved as we must handle chunks in stream.
    // It is forgiving, closer to standard UTF-7 (for example, '-' is optional at the end).
    for (let i = 0; i < buf.length; i++) {
      if (!inBase64) { // We're in direct mode.
        // Write direct chars until '&'
        if (buf[i] === andChar) {
          res += this.iconv.decode(buf.slice(lastI, i), "ascii"); // Write direct chars.
          lastI = i + 1;
          inBase64 = true;
        }
      } else { // We decode base64.
        if (!base64IMAPChars[buf[i]]) { // Base64 ended.
          if (i === lastI && buf[i] === minusChar) { // "&-" -> "&"
            res += "&";
          } else {
            const b64str = base64Accum + buf.slice(lastI, i).toString().replace(/,/g, "/");
            res += this.iconv.decode(Buffer.from(b64str, "base64"), "utf16-be");
          }
          if (buf[i] !== minusChar) { // Minus may be absorbed after base64.
            i--;
          }
          lastI = i + 1;
          inBase64 = false;
          base64Accum = "";
        }
      }
    }

    if (!inBase64) {
      res += this.iconv.decode(buf.slice(lastI), "ascii"); // Write direct chars.
    } else {
      let b64str = base64Accum + buf.slice(lastI).toString().replace(/,/g, "/");

      const canBeDecoded = b64str.length - (b64str.length % 8); // Minimal chunk: 2 quads -> 2x3 bytes -> 3 chars.
      base64Accum = b64str.slice(canBeDecoded); // The rest will be decoded in future.
      b64str = b64str.slice(0, canBeDecoded);

      res += this.iconv.decode(Buffer.from(b64str, "base64"), "utf16-be");
    }

    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;

    return res;
  }

  end() {
    let res = "";
    if (this.inBase64 && this.base64Accum.length > 0) {
      res = this.iconv.decode(Buffer.from(this.base64Accum, "base64"), "utf16-be");
    }

    this.inBase64 = false;
    this.base64Accum = "";
    return res;
  }
}

export default class Utf7IMAPCodec {
  constructor(codecOptions, iconv) {
    this.iconv = iconv;
  }
}

Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
Utf7IMAPCodec.prototype.bomAware = true;
