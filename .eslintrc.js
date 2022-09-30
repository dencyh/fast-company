module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: [2, "always"],
    "space-before-function-paren": 0,
    "multiline-ternary": 0,
    "no-unused-vars": 1
  }
};