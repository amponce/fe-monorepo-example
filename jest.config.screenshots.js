/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.build.json');
const moduleNameMapping = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: `${__dirname}/`,
});

module.exports = {
  setupFilesAfterEnv: [path.resolve(__dirname, 'test/setup.ts')],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    ...moduleNameMapping,
  },
  transformIgnorePatterns: ['node_modules'],
  modulePathIgnorePatterns: [
    path.resolve(__dirname, 'packages/(.*)/package.json'),
    path.resolve(__dirname, 'apps/(.*)/package.json'),
  ],
};
