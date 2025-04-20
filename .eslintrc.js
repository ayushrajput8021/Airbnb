module.exports = {
  env: {
    browser: true, // Allows browser globals like 'window'
    es2021: true, // Allows ES2021 syntax
    node: true, // Allows Node.js globals and Node.js scoping.
    commonjs: true, // Allows CommonJS globals and CommonJS scoping (use this or node:true)
  },
  extends: [
    "eslint:recommended", // Use ESLint's recommended rules
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: "latest", // Use the latest ECMAScript standard
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    // Add custom rules or override recommended ones here if needed
    // e.g., 'no-console': 'warn', // Warn about console.log statements
    "prettier/prettier": "warn", // Show prettier violations as warnings
  },
};
