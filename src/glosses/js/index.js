ateos.lazify({
  babel: "./babel",
  esutils: "esutils",
  tokTypes: ["@babel/parser", (mod) => mod.tokTypes],
  parse: ["@babel/parser", (mod) => mod.parse],
  parseExpression: ["@babel/parser", (mod) => mod.parseExpression],
  parseFunction: "./parse_function",
  walk: "babylon-walk",
  highlight: "@babel/highlight"
}, exports, require);

export const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;
