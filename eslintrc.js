// .eslintrc.js
module.exports = {
  env: {
    node: true, // Node.js globals like process
    browser: true, // browser globals like window
    es2021: true, // modern JS
  },
  extends: ['eslint:recommended'], // recommended ESLint rules
  parserOptions: {
    ecmaVersion: 12, // allows modern JS syntax
    sourceType: 'module', // for import/export
  },
  rules: {
    semi: ['error', 'always'], // require semicolons
    quotes: ['error', 'single'], // enforce single quotes
    'no-unused-vars': 'warn', // warn on unused variables
  },
};
