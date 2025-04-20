// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    // Global ignores
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'logs/',
      '*.log',
      '.git/',
      // Add any other specific directories/files like 'HotelServices/some-non-js-dir/'
    ],
  },
  // Base configuration for JS files
  js.configs.recommended,
  // Prettier integration (must be last)
  eslintPluginPrettierRecommended,
  {
    // Custom rules and language options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // Use 'commonjs' if your project uses require/module.exports primarily
      globals: {
        ...globals.browser,
        ...globals.node, // Includes commonjs globals as well in recent versions
        ...globals.es2021,
      },
    },
    rules: {
      // Add custom rules or override recommended ones here if needed
      // e.g., 'no-console': 'warn', // Warn about console.log statements
      'prettier/prettier': 'warn', // Show prettier violations as warnings (already included by eslintPluginPrettierRecommended but explicit doesn't hurt)
    },
  },
];
