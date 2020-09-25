/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires */

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@angular-devkit/core');
const schematics = require('@angular-devkit/schematics');
const latest_versions = require('@schematics/angular/utility/latest-versions');
const paths = require('@schematics/angular/utility/paths');
const validation = require('@schematics/angular/utility/validation');

const pkg = require('../package.json');

exports.default = function generateLibrary(options) {
  return async () => {
    if (!options.name) {
      throw new schematics.SchematicsException(`Invalid options, "name" is required.`);
    }
    const prefix = 'ot';
    validation.validateProjectName(options.name);
    // If scoped project (i.e. "@foo/bar"), convert projectDir to "foo/bar".
    const projectName = options.name;
    const packageName = core.strings.dasherize(projectName);
    let scopeName = null;
    if (/^@.*\/.*/.test(options.name)) {
      const [scope, name] = options.name.split('/');
      scopeName = scope.replace(/^@/, '');
      options.name = name;
    }
    const scopeFolder = scopeName ? core.strings.dasherize(scopeName) + '/' : '';
    const folderName = `${scopeFolder}${core.strings.dasherize(options.name)}`;
    const projectRoot = core.join(core.normalize('packages/components'), folderName);
    const distRoot = `dist/${folderName}`;
    const selector = core.strings.dasherize(`${prefix}-${options.name}`);
    const templateSource = schematics.apply(schematics.url('./files'), [
      schematics.applyTemplates({
        ...core.strings,
        ...options,
        angularCoreVersion: pkg.devDependencies['@angular/core'],
        themeVersion: pkg.devDependencies['@otus/theme'],
        componentsVersion: pkg.devDependencies['@otus/components'],
        testUtilsVersion: pkg.devDependencies['@otus/test-utils'],
        devScriptsVersion: pkg.devDependencies['@otus/dev-scripts'],
        environmentVersion: pkg.devDependencies['@otus/environment'],
        errorHandlerVersion: pkg.devDependencies['@otus/error-handler'],
        selector,
        packageName,
        projectRoot,
        distRoot,
        relativePathToWorkspaceRoot: paths.relativePathToWorkspaceRoot(projectRoot),
        prefix,
        angularLatestVersion: latest_versions.latestVersions.Angular.replace('~', '').replace(
          '^',
          ''
        ),
        folderName,
      }),
      schematics.move(projectRoot),
    ]);
    return schematics.chain([schematics.mergeWith(templateSource)]);
  };
};
