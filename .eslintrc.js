module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: [2, "always"],
    "space-before-function-paren": 0,
    "multiline-ternary": 0,
    "no-unused-vars": 1,
    "prefer-const": 1,
    "no-prototype-builtins": 1
  }
};
