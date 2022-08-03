
const { Stream } = ateos.std.stream;

const proxy = (fn) => {
  return function (...args) {
    const d = this._dest;
    const s = this._src;
    if (d && d[fn]) {
      d[fn].apply(d, args);
    }
    if (s && s[fn]) {
      s[fn].apply(s, args);
    }
  };
};

export default class MuteStream extends Stream {
  constructor(opts = {}) {
    super();
    this.writable = this.readable = true;
    this.muted = false;
    this.on("pipe", this._onpipe);
    this.replace = opts.replace;

    // For readline-type situations
    // This much at the start of a line being redrawn after a ctrl char
    // is seen (such as backspace) won't be redrawn as the replacement
    this._prompt = opts.prompt || null;
    this._hadControl = false;
  }

  mute() {
    this.muted = true;
  }

  unmute() {
    this.muted = false;
  }

  _onpipe(src) {
    this._src = src;
  }

  get isTTY() {
    return ((this._dest) ? this._dest.isTTY : (this._src) ? this._src.isTTY : false);
  }

  // basically just get replace the getter/setter with a regular value
  set isTTY(isTTY) {
    Object.defineProperty(this, "isTTY", {
      value: isTTY,
      enumerable: true,
      writable: true,
      configurable: true
    });
  }

  get rows() {
    return (this._dest ? this._dest.rows : this._src ? this._src.rows : undefined);
  }

  get columns() {
    return (this._dest ? this._dest.columns : this._src ? this._src.columns : undefined);
  }

  pipe(dest, options) {
    this._dest = dest;
    return super.pipe(dest, options);
  }

  pause() {
    if (this._src) {
      return this._src.pause();
    }
  }

  resume() {
    if (this._src) {
      return this._src.resume();
    }
  }

  write(c) {
    if (this.muted) {
      if (!this.replace) {
        return true;
      }
      if (c.match(/^\u001b/)) {
        if (c.indexOf(this._prompt) === 0) {
          c = c.substr(this._prompt.length);
          c = c.replace(/./g, this.replace);
          c = this._prompt + c;
        }
        this._hadControl = true;
        return this.emit("data", c);
      } 
      if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
        this._hadControl = false;
        this.emit("data", this._prompt);
        c = c.substr(this._prompt.length);
      }
      c = c.toString().replace(/./g, this.replace);
            
    }
    this.emit("data", c);
  }

  end(c) {
    if (this.muted) {
      if (c && this.replace) {
        c = c.toString().replace(/./g, this.replace);
      } else {
        c = null;
      }
    }
    if (c) {
      this.emit("data", c);
    }
    this.emit("end");
  }
}
MuteStream.prototype.destroy = proxy("destroy");
MuteStream.prototype.destroySoon = proxy("destroySoon");
MuteStream.prototype.close = proxy("close");
