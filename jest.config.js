/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */

const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.base.json');
const moduleNameMapping = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: `${__dirname}/`,
});

module.exports = {
  testURL: 'http://localhost',
  setupFilesAfterEnv: [path.resolve(__dirname, 'test/setup.ts')],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    ...moduleNameMapping,
  },
  transformIgnorePatterns: ['node_modules'],
  modulePathIgnorePatterns: ['dist'],
  coverageDirectory: '<rootDir>/__coverage__',
  coverageReporters: ['html', 'text', 'lcov', 'json'],
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coveragePathIgnorePatterns: [
    'test',
    'schematics',
    'typings',
    '__coverage__',
    '__screenshots__',
    'node_modules',
    'dist',
    'assets',
    '.*(spec|config|mock|fixture).ts',
  ],
};
