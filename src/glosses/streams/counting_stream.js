export default class CountingStream extends ateos.std.stream.Transform {
  constructor() {
    super();
    this.count = 0;
  }

  _transform(chunk, encoding, cb) {
    this.count += Buffer.byteLength(chunk);
    this.push(chunk);
    cb();
  }
}
