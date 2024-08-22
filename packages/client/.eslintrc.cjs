module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/function-component-definition': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-duplicates': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { controlComponents: ['input', 'select'] }],
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'UnaryExpression[operator="!"]',
        message: 'Unexpected token !',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
  },
  env: {
    browser: true,
  },
};
