/* eslint-env node */

module.exports = {
  env: {
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  globals: {
    context: 'readonly',
    browser: 'readonly',
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint', 'jest', 'extra-rules', 'promise'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:json/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:promise/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          'packages/*/tsconfig.json',
          'apps/*/tsconfig.json',
          'frontend/packages/*/tsconfig.json',
          'frontend/apps/*/tsconfig.json',
        ],
      },
    },
    jest: {
      version: 26,
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'no-alert': ['error'],
    'no-unused-expressions': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors', 'arrowFunctions'],
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Number: {
            message: "Use 'number' instead",
            fixWith: 'number',
          },
          String: {
            message: "Use 'string' instead",
            fixWith: 'string',
          },
          Boolean: {
            message: "Use 'boolean' instead",
            fixWith: 'boolean',
          },
          '{}': {
            message: "Use 'object' instead",
            fixWith: 'object',
          },
          Object: {
            message: "Use 'object' instead",
            fixWith: 'object',
          },
          Symbol: {
            message: "Use 'symbol' instead",
            fixWith: 'symbol',
          },
        },
      },
    ],
    'no-restricted-globals': [
      'error',
      {
        name: 'Foundation',
      },
      {
        name: 'jQuery',
        message: 'Use native DOM methods instead.',
      },
      {
        name: '$',
        message: 'Use native DOM methods instead.',
      },
      {
        name: 'moment',
        message: "Use 'date-fns' instead.",
      },
    ],
    'no-dupe-args': ['error'],
    'no-duplicate-imports': ['error'],
    'no-dupe-keys': ['error'],
    'no-dupe-class-members': ['error'],
    'no-bitwise': ['error'],
    'no-async-promise-executor': ['error'],
    'no-redeclare': ['error'],
    'handle-callback-err': ['error'],
    'no-const-assign': ['error'],
    'prefer-const': ['error'],
    'no-var': ['error'],
    'no-empty-function': ['off'],
    'extra-rules/no-commented-out-code': ['error'],
    'extra-rules/no-for-loops': ['error'],
    'import/no-self-import': ['error'],
    'import/order': ['off'],
    'import/first': ['error'],
    'import/no-cycle': ['warn'],
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-extraneous-dependencies': ['error'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'util',
            message: "Don't use Node libraries in frontend code!",
          },
          {
            name: 'fs',
            message: "Don't use Node libraries in frontend code!",
          },
          {
            name: 'path',
            message: "Don't use Node libraries in frontend code!",
          },
          {
            name: 'lodash',
            message: 'Use lodash-es instead!',
          },
          {
            name: 'moment',
            message: 'Use date-fns instead!',
          },
          {
            name: 'jquery',
            message: 'Use native DOM methods instead!',
          },
          {
            name: 'foundation-sites',
            message: 'Use native DOM methods instead!',
          },
          {
            name: 'primeng/primeng',
            message: "Import from 'primeng' instead!",
          },
        ],
        patterns: ['!lodash/*', '!moment/*', '!foundation-sites/*'],
      },
    ],
  },
};
