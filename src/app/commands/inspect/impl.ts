const {
  error,
  app: {
    Subsystem,
    CliMainCommand
  },
  lodash: { get },
  pretty
} = ateos;

const GLOBALS = ["ateos", "global"];

const getOwnPropertyDescriptor = (obj, propName) => {
  let descr = Object.getOwnPropertyDescriptor(obj, propName);
  if (!ateos.isUndefined(descr)) {
    return descr;
  }

  let o = obj.__proto__;
  for (; ;) {
    if (!o) {
      return undefined;
    }
    descr = Object.getOwnPropertyDescriptor(o, propName);
    if (!ateos.isUndefined(descr)) {
      return descr;
    }
    o = o.__proto__;
  }
};

// from lodash internals
const charCodeOfDot = ".".charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  "[^.[\\]]+" + "|" +
  // Or match property names within brackets.
  "\\[(?:" +
  // Match a non-string expression.
  '([^"\'].*)' + "|" +
  // Or match strings (supports escaping characters).
  '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ")\\]" + "|" +
  // Or match "" as the space between consecutive dots or empty brackets.
  "(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))"
  , "g");

const stringToPath = (string) => {
  const result = [];
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push("");
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, "$1");
    } else if (expression) {
      key = expression.trim();
    }
    result.push(key);
  });
  return result;
};

const cutNamespace = (parts) => {
  const namespaceParts = [];
  // const parts = name.split(".");

  do {
    if (parts[0].startsWith(".") || !ateos.isNamespace(get(global, [...namespaceParts, parts[0]]))) {
      break;
    }
    namespaceParts.push(parts.shift());
  } while (parts.length > 0);

  return namespaceParts.join(".");
};

const inspectObj = ({ obj, options, showValue } = {}) => {
  let result;
  const type = ateos.typeOf(obj);

  switch (type) {
    case "function":
    case "class":
      result = showValue
        ? ateos.js.highlight(obj.toString())
        : ateos.inspect(obj, options);
      break;
    default:
      result = showValue
        ? obj
        : ateos.inspect(obj, options);
  }
  return result;
};

const addCommonGlobals = (globals) => {
  for (const common of ["global", "process", "console"]) {
    if (!globals.includes(common)) {
      globals.unshift(common);
    }
  }
};

class InspectionCommand extends Subsystem {
  
  @CliMainCommand({
    arguments: [
      {
        name: "name",
        type: String,
        default: "",
        help: "Name of class/object/function/namespace/module (for modules use `module://` prefix)"
      }
    ],
    options: [
      {
        name: ["--all", "-A"],
        help: "Show all properties (be default it shows only enumerables)"
      },
      {
        name: ["--value", "-V"],
        help: "Show value instead of description"
      },
      {
        name: "--native",
        help: "Use native `typeof` for type detection"
      },
      {
        name: ["--as-object", "-O"],
        help: "Interpret as plain object"
      },
      {
        name: "--func-details",
        help: "Show function details"
      },
      {
        name: "--style",
        type: String,
        default: "color",
        choices: ["none", "inline", "color", "html"],
        help: "Style to use"
      },
      {
        name: ["--depth", "-D"],
        type: Number,
        default: 1,
        help: "The depth of object inspection"
      },
      {
        name: "--descr",
        help: "The depth of object inspection"
      },
      {
        name: "--no-sort",
        help: "Sort by keys"
      },
      {
        name: "--no-type",
        help: "Without type and constructor"
      },
      {
        name: "--no-proto",
        help: "Without proto"
      }
    ]
  })
  async inspect(args, opts) {
    try {
      const options = {
        style: opts.get("style"),
        depth: opts.get("depth"),
        noType: opts.has("noType"),
        noDescriptor: !opts.has("descr"),
        sort: !opts.has("noSort"),
        proto: !opts.has("noProto"),
        enumOnly: !opts.has("all"),
        asObject: opts.has("asObject"),
        native: opts.has("native"),
        useInspect: true,
        funcDetails: opts.has("funcDetails")
      };

      const globals = [...GLOBALS];
      addCommonGlobals(globals);

      let name = args.get("name");
      let isModule = false;
      if (name.startsWith("module://")) {
        isModule = true;
        name = name.slice("module://".length);
      }
      name = name.split(".").filter(ateos.identity).join(".");

      if (name.length === 0) {
        if (isModule) {
          console.log("Specify module name from `node_modules`");
        } else {
          console.log("Possible objects for inspection:");
          console.log(pretty.json([...globals, "module://<module_name>"]));
        }
        return 0;
      }

      const showValue = opts.has("value");
      let parts = stringToPath(name);
      let result;
      let ns;

      if (isModule) {
        const moduleName = parts.shift();
        ns = ateos.module.requireRelative(moduleName, process.cwd());
      } else {
        // // Reduce 'ateos' + 'global' chain...
        // while (parts.length > 1) {
        //     if (globals.includes(parts[0]) && globals.includes(parts[1])) {
        //         parts.shift();
        //     } else {
        //         break;
        //     }
        // }

        if (!globals.includes(parts[0])) {
          throw new error.UnknownException(`Unknown namespace: ${parts[0]}`);
        }

        let namespace;
        if (parts[0] === "global") {
          namespace = "global";
          parts.shift();
        } else if (parts[0] in global) {
          namespace = cutNamespace(parts);
        }

        if ((showValue || options.asObject) && parts.length === 0) {
          const tmp = stringToPath(namespace);
          parts = [tmp.pop()];
          namespace = tmp.length > 0 ? tmp.join(".") : "global";
        }

        if (namespace === "global") {
          ns = global;
        } else if (!namespace.includes(".")) {
          ns = global[namespace];
        } else {
          ns = get(global, namespace);
        }
      }

      if (parts.length === 0) {
        result = inspectObj({
          obj: ns,
          showValue,
          options
        });
      } else {
        let obj = ns;
        for (const part of parts) {
          const propDescr = getOwnPropertyDescriptor(obj, part);
          if (ateos.isUndefined(propDescr)) {
            throw new error.UnknownException(`Unknown object: ${name}`);
          }
          obj = obj[part];
        }

        result = inspectObj({
          obj,
          showValue,
          options
        });
      }

      console.log(result);

      return 0;
    } catch (err) {
      console.error(err);
      // ateos.log.bright.red.error.noLocate(err);
      return 1;
    }
  }
};


export default () => InspectionCommand;