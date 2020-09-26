# @otus/fe-monorepo-example

Frontend monorepo example

## Monorepo Basics

The @otus/fe-monorepo-example monorepo is managed by [lerna](https://lerna.js.org/). The [lerna](https://lerna.js.org/) tools make it easier to manage dependencies and run scripts for testing, building, publishing, and deploying a repository that contains multiple JS packages.

The core application is in the `/apps/otus-app` directory. It and the other package directories are configured in the `lerna.json` file.

Check the [lerna docs](https://github.com/lerna/lerna/tree/master/commands) for more info.

If you want to run any of the lerna commands manually, you can use `npx lerna`.

## Getting Started

```sh
  npm install
```

`npm install` should run `lerna bootstrap` and then `lerna run build` to build all of the packages and set up cross-package dependencies.

Note: to speed up installing dependencies locally, you can set the environment variable:

```sh
# ~/.zshrc
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

## Starting the application

To start the core application locally run:

```sh
  npm start
```

`npm start` runs the core web application at the url `https://localhost:4200`.

## Developing

- To generate a new UI component run `npm run generate.component`.
- To generate a new UI library run `npm run generate.library`.

## Updating build and test (@otus/frontend monorepo-wide) dependencies

1. `npm install <package-name>@<package-version> --save-dev`.
1. Commit the result.

## Updating individual package dependencies

1. `lerna add <package-name>@<package-version> --scope=<package-name>`
1. Commit the result.

Note that the package name that you use for the `scope` option above should be what is in the `name` field in the `package.json` file for that package (for example, `packages/my-service/package.json` is `@otus/my-service`).

## Linting

The @otus/fe-monorepo-example project uses a combination of [eslint](https://www.eslint.org), [htmlhint](https://htmlhint.com/), and [stylelint](https://stylelint.io/) for linting source code.

Linters are run and configured in the monorepo root so that they can be run and tied into git commit hooks (using [husky](https://github.com/typicode/husky)).

### Automatic Set Up With VScode

Install the following VS Code extensions:

- Editorconfig - <https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig>
- Stylelint - <https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint>
- Htmlhint - <https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint>
- Eslint - <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>

In your VS Code settings add the following settings

```json
{
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "eslint.enable": true,
  "htmlhint.enable": true,
  "stylelint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

## Running tests

Tests are run and configured in the @otus/fe-monorepo-example monorepo root.

To run all of the unit tests run `npm run test`.

To run the tests for a specific package, run `npx lerna run test  --scope my-package`.

To run tests in watch mode while you are making changes, run `npx lerna run test.watch --scope my-package`.
