const {
  is
} = ateos;

// const arr = [];

// const compareFunction = function (a, b) {
//     if (a < b) {
//         return -1;
//     }
//     if (a > b) {
//         return 1;
//     }
//     return 0;
// };

// const deterministicDecirc = function (val, k, stack, parent) {
//     let i;
//     if (typeof val === "object" && !ateos.isNull(val)) {
//         for (i = 0; i < stack.length; i++) {
//             if (stack[i] === val) {
//                 parent[k] = "[Circular]";
//                 arr.push([parent, k, val]);
//                 return;
//             }
//         }
//         if (ateos.isFunction(val.toJSON)) {
//             return;
//         }
//         stack.push(val);
//         // Optimize for Arrays. Big arrays could kill the performance otherwise!
//         if (ateos.isArray(val)) {
//             for (i = 0; i < val.length; i++) {
//                 deterministicDecirc(val[i], i, stack, val);
//             }
//         } else {
//             // Create a temporary object in the required way
//             const tmp = {};
//             const keys = Object.keys(val).sort(compareFunction);
//             for (i = 0; i < keys.length; i++) {
//                 const key = keys[i];
//                 deterministicDecirc(val[key], key, stack, val);
//                 tmp[key] = val[key];
//             }
//             if (!ateos.isUndefined(parent)) {
//                 arr.push([parent, k, val]);
//                 parent[k] = tmp;
//             } else {
//                 return tmp;
//             }
//         }
//         stack.pop();
//     }
// };

// export default function deterministicStringify(obj, replacer, spacer) {
//     const tmp = deterministicDecirc(obj, "", [], undefined) || obj;
//     const res = JSON.stringify(tmp, replacer, spacer);
//     while (arr.length !== 0) {
//         const part = arr.pop();
//         part[0][part[1]] = part[2];
//     }
//     return res;
// }

const stableEncode = function (obj, opts) {
  let { space } = opts;
  if (ateos.isNumber(space)) {
    space = " ".repeat(space);
  }
  const cycles = ateos.isBoolean(opts.cycles) ? opts.cycles : false;
  const replacer = opts.replacer || ((x, y) => y);

  const cmp = opts.cmp && (function (f) {
    return function (node) {
      return function (a, b) {
        const aobj = { key: a, value: node[a] };
        const bobj = { key: b, value: node[b] };
        return f(aobj, bobj);
      };
    };
  })(opts.cmp);

  const seen = [];
  return (function stringify(parent, key, node, level) {
    const indent = space ? (`\n${space.repeat(level)}`) : "";
    const colonSeparator = space ? ": " : ":";

    if (node && node.toJSON && ateos.isFunction(node.toJSON)) {
      node = node.toJSON();
    }

    node = replacer.call(parent, key, node);

    if (ateos.isUndefined(node)) {
      return;
    }
    if (!ateos.isObject(node)) {
      return JSON.stringify(node);
    }
    if (ateos.isArray(node)) {
      const out = [];
      for (let i = 0; i < node.length; i++) {
        const item = stringify(node, i, node[i], level + 1) || JSON.stringify(null);
        out.push(indent + space + item);
      }
      return `[${out.join(",")}${indent}]`;
    }
    if (seen.indexOf(node) !== -1) {
      if (cycles) {
        return JSON.stringify("__cycle__");
      }
      throw new TypeError("Converting circular structure to JSON");
    } else {
      seen.push(node);
    }

    const keys = Object.keys(node).sort(cmp && cmp(node));
    const out = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = stringify(node, key, node[key], level + 1);

      if (!value) {
        continue;
      }

      const keyValue = JSON.stringify(key) + colonSeparator + value;

      out.push(indent + space + keyValue);
    }
    seen.splice(seen.indexOf(node), 1);
    return `{${out.join(",")}${indent}}`;

  })({ "": obj }, "", obj, 0);
};

const encodeStable = (obj, { space = "", replacer, cycles = false, cmp } = {}) => {
  return Buffer.from(stableEncode(obj, { space, replacer, cycles, cmp }), "utf8");
};

export default encodeStable;
