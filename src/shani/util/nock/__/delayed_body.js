const {
  is,
  std: { stream }
} = ateos;

/**
 * Creates a stream which becomes the response body of the interceptor when a
 * delay is set. The stream outputs the intended body and EOF after the delay.
 *
 * @param  {String|Buffer|Stream} body - the body to write/pipe out
 * @param  {Integer} ms - The delay in milliseconds
 * @constructor
 */
export default class DelayedBody extends stream.PassThrough {
  constructor(ms, body) {
    super();
    const self = this;
    let data = "";
    let ended = false;

    if (ateos.isStream(body)) {
      body.on("data", (chunk) => {
        data += ateos.isBuffer(chunk) ? chunk.toString() : chunk;
      });

      body.once("end", () => {
        ended = true;
      });

      body.resume();
    }

    setTimeout(() => {
      if (ateos.isStream(body) && !ended) {
        body.once("end", () => {
          self.end(data);
        });
      } else {
        self.end(data || body);
      }
    }, ms);
  }
}
