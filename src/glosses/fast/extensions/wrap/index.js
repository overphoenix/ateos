export default function plugin() {
  const {
    is,
    error,
    std: { fs },
    lodash: _
  } = ateos;

  return function wrap(template, data, options) {
    if (ateos.isObject(template) && !ateos.isFunction(template)) {
      if (!ateos.isString(template.src)) {
        throw new error.InvalidArgumentException("Expecting `src` option");
      }
      template = new Promise((resolve, reject) => {
        fs.readFile(template.src, "utf8", (err, data) => {
          err ? reject(err) : resolve(data);
        });
      });
    } else {
      if (!ateos.isString(template) && !ateos.isFunction(template)) {
        throw new error.InvalidArgumentException("Template must be a string or a function");
      }
      template = Promise.resolve(template);
    }

    return this.throughAsync(async function (file) {
      if (file.isNull()) {
        this.push(file);
        return;
      }
      let contents;
      if (file.isStream()) {
        const b = [];
        let length = 0;
        const stream = file.contents;
        await new Promise((resolve, reject) => {
          stream.on("data", (chunk) => {
            length += chunk.length;
            b.push(chunk);
          });
          stream.on("end", resolve);
          stream.on("error", reject);
          stream.resume();
        });
        contents = Buffer.concat(b, length);
      } else {
        // is a buffer
        contents = file.contents;
      }
      if (ateos.isFunction(data)) {
        data = data(file);
      }
      if (ateos.isFunction(options)) {
        options = options(file);
      }
      data = data || {};
      options = options || {};

      if (options.parse !== false) {
        if (file.path) {
          try {
            switch (file.extname) {
              case ".json":
                contents = ateos.data.json.decode(contents);
                break;
              case ".json5":
                contents = ateos.data.json5.decode(contents);
                break;
              case ".yml":
              case ".yaml":
                contents = ateos.data.yaml.decode(contents);
                break;
            }
          } catch (err) {
            throw new ateos.error.Exception(`Error parsing: ${file.path}`);
          }
        }
      }
      const newData = _.extend({ file }, options, data, file.data, { contents });
      let t = await template;
      if (ateos.isFunction(t)) {
        t = t(newData);
      }
      const result = _.template(t, options)(newData);
      if (file.isStream()) {
        file.contents = new ateos.std.stream.PassThrough();
        file.contents.end(result);
      } else {
        file.contents = result;
      }
      this.push(file);
    });
  };
}
