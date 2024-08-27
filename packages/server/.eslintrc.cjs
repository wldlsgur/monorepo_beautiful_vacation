module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'consistent-return': 'error',
    'no-async-promise-executor': 'error',
    'no-return-await': 'error',
    eqeqeq: 'error',
    'no-new': 'error',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
