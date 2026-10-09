import base from '../../eslint.config.js';

export default [
  ...base,
  {
    files: ['src/learn/**/*.{ts,tsx}', 'tools/learn/*.{ts,mjs}', 'tests/learn/*.ts', 'playwright.config.ts'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.fromEntries(['Audio', 'window', 'document', 'navigator', 'console', 'process', 'URL', 'Response', 'self', 'Buffer'].map(name => [name, 'readonly'])),
    },
    settings: { 'import/resolver': { node: { extensions: ['.js', '.mjs', '.ts', '.tsx'] } } },
    rules: { 'no-undef': 'off', 'no-unused-vars': 'off' },
  },
];
