const path = require('path');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'react/display-name': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-props-no-spreading': ['warn'],
    'import/no-cycle': 'off',
    'no-underscore-dangle': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin', // Node.js 내장 모듈
          'external', // 외부 라이브러리
          'internal', // 내부 모듈 (alias 사용 시)
          'parent', // 부모 경로 import
          'sibling', // 같은 경로 import
          'index', // index.js import
          'object', // imports within objects
          'type', // 타입 import
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before', // react 라이브러리들 먼저
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '*.css',
            group: 'object',
            position: 'after', // CSS/SCSS는 마지막에
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never', // 그룹 간에 빈 줄 추가
        alphabetize: {
          order: 'asc', // 알파벳 순으로 정렬
          caseInsensitive: true, // 대소문자 구분 없이
        },
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.resolve(__dirname, 'tsconfig.app.json'),
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, 'tsconfig.app.json'),
      },
    },
  },
};
