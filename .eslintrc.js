module.exports = {
  root: true,
  env: {
    es6: true,
    es2017: true,
    es2020: true,
    es2021: true,
    node: true,
    browser: true
  },
  extends: "eslint:recommended",
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    requireConfigFile: true,
    ecmaVersion: 2021,
    ecmaFeatures: {
      modules: true,
      decorators: true,
      legacyDecorators: true
    }
  },
  rules: {
    "babel/generator-star-spacing": 0,
    "object-shorthand": "error",
    "babel/new-cap": 1,
    // "no-await-in-loop": "error",
    "arrow-parens": "error",
    "comma-dangle": 1,
    indent: [
      "error",
      2,
      { SwitchCase: 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    quotes: [
      "error",
      "double",
      { avoidEscape: true }
    ],
    semi: [
      "error",
      "always"
    ],
    "no-console": 0,
    "no-ex-assign": 0,
    "require-yield": 0,
    "semi-spacing": ["error", {
      before: false,
      after: true
    }],
    "semi-style": ["error", "last"],
    "comma-spacing": ["error", {
      before: false,
      after: true
    }],
    "func-call-spacing": ["error", "never"],
    "key-spacing": ["error", {
      beforeColon: false,
      afterColon: true
    }],
    "block-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "brace-style": ["error", "1tbs"],
    "one-var": ["error", {
      let: "never",
      const: "never"
    }],
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: "error",
    "no-case-declarations": "error",
    "eol-last": "error",
    "keyword-spacing": ["error", {
      before: true,
      after: true
    }],
    "space-before-blocks": ["error", {
      functions: "always",
      keywords: "always",
      classes: "always"
    }],
    "space-infix-ops": "error",
    curly: "error",
    "object-curly-spacing": ["error", "always"],
    strict: "error",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "template-curly-spacing": ["error", "never"],
    "prefer-template": "error",
    "no-const-assign": "error",
    "no-new-object": "error",
    "quote-props": ["error", "as-needed"],
    "no-array-constructor": "error",
    "array-callback-return": "error",
    "func-style": [
      "error",
      "expression", { allowArrowFunctions: true }
    ],
    "no-loop-func": "error",
    "prefer-rest-params": "error",
    "prefer-arrow-callback": ["warn", {
      allowNamedFunctions: true,
      allowUnboundThis: true
    }],
    "arrow-spacing": "error",
    "no-useless-constructor": "error",
    "no-dupe-class-members": "error",
    "no-duplicate-imports": "error",
    "import/no-mutable-exports": "error",
    "dot-notation": "warn",
    "no-implicit-coercion": "error",
    "no-new-func": "error",
    "no-use-before-define": ["error", "nofunc"],
    "func-name-matching": "error",
    camelcase: "error",
    "new-parens": "error",
    yoda: "error",
    "no-throw-literal": "error",
    "max-len": ["error", {
      code: 200,
      ignoreStrings: true,
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
      ignoreComments: true
    }],
    "comma-style": ["error", "last"],
    "no-self-compare": "error",
    "no-else-return": "error",
    "no-empty-pattern": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-extra-semi": "error",
    // "no-extra-parens": ["error", "all", { "nestedBinaryExpressions": false }],
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-implied-eval": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-return-await": "error",
    "no-self-assign": "error",
    "no-unmodified-loop-condition": "warn",
    "no-useless-call": "error",
    "no-useless-return": "error",
    "no-warning-comments": "warn",
    "prefer-promise-reject-errors": "error",
    "lines-between-class-members": ["error", "always"],
    "no-path-concat": "error", // disallow string concatenation with __dirname and __filename
    "ateos/no-typeof": "error",
    "ateos/no-buffer-constructor": "error",
    "ateos/no-undefined-comp": "error",
    // "ateos/no-null-comp": "error",
    "ateos/no-buffer-isbuffer": "error",
    "ateos/no-array-isarray": "error",
    "ateos/no-isnan": "error",
    "ateos/no-number-methods": "error", // disallow Number.isNaN, Number.isFinite etc
    "ateos/no-is.undefined-or-is.null": "error", // disallow is.undefined(t) || is.null(t)
    "ateos/no-not-is.undefined-and-not-is.null": "error", // disallow !is.undefined(t) && !is.null(t)
    "ateos/no-function-expression-class-property": "error", // disallow properties like a = function () {
    "ateos/indexof": "warn", // warnings for include-like indexOf usages,
    "ateos/multiline-comment-indent": "error"
    // "ateos/multiline-method-comments": "error"
  },
  plugins: [
    "ateos",
    "import",
    "babel",
    "flowtype"
  ],
  globals: {
    ateos: true
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  }
};
