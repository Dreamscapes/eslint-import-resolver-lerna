# eslint-import-resolver-lerna

[![eslint-import-resolver-lerna][npm-version]][npm-home]
[![Build Status][travis-badge]][travis-home]
![Built with GNU Make][make-badge]

This resolver can be used together with [`eslint-plugin-import`][eslint-plugin-import-home] package to help it find modules in your Lerna-based monorepo.

## When you might need this

In general you might not even need this, since Lerna symlinks your monorepo packages into your _node_modules_ directory where the resolver can pick it up using the standard Node.js resolution mechanism. You probably will need this if:

- You compile your project with Babel, Flow, TypeScript or any other compilation pipeline
- You compile your _packages_ directory into a completely different directory, ie. from _src/packages_ into _dist/packages_
- You configure Lerna to do link your packages together in the _dist/packages_ directory

This will cause your _src/packages_ directory to **not have** _node_modules_ folder, thus causing the plugin to be unable to find your other packages using the standard built-in Node.js module resolution mechanism. That's where this resolver will help you.

## What this does

This plugin will look in your _packages_ directory and generate a list of all the package names (as defined in their _package.json_ files) that the monorepo contains. Then, when the import plugin tries to resolve any of those names it will be able to help the import plugin to locate the package.

## Usage

This resolver accepts only one configuration option: `packages` (string or array of strings, required) which must be an absolute path to Lerna's _packages_ directory or an array of such absolute paths.

```js
// .eslintrc.js
const path = require('path')

module.exports = {
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, 'src/packages')
      }
    }
  }
}
```

## LICENSE

See the [LICENSE](LICENSE) file for information.

[eslint-plugin-import-home]: https://github.com/benmosher/eslint-plugin-import
[npm-home]: https://www.npmjs.com/package/eslint-import-resolver-lerna
[npm-version]: https://img.shields.io/npm/v/eslint-import-resolver-lerna.svg?style=flat-square
[travis-badge]: https://img.shields.io/travis/Dreamscapes/eslint-import-resolver-lerna.svg?style=flat-square
[travis-home]: https://travis-ci.org/Dreamscapes/eslint-import-resolver-lerna
[make-badge]: https://img.shields.io/badge/Built%20with-GNU%20Make-brightgreen.svg?style=flat-square
