/* eslint-disable no-sync */

'use strict'

const fs = require('fs')
const path = require('path')

const interfaceVersion = 2

function resolve(importpath, caller, config = {}) {
  const { packages } = config
  const basename = pkgbasename(importpath)
  const index = new Map()

  // Populate the index with the package names this monorepo contains
  const packagesDirectories = Array.isArray(packages)
    ? packages
    : [packages]

  packagesDirectories.forEach(packagesDir => {
    fs
      .readdirSync(packagesDir)
      .map(filename => path.resolve(packagesDir, filename))
      .filter(filename => fs.statSync(filename).isDirectory())
      .forEach(filename => {
        // eslint-disable-next-line global-require
        const { name } = require(path.resolve(filename, 'package'))
        index.set(name, filename)
      })
  })

  return index.has(basename)
    ? { found: true, path: index.get(basename) }
    : { found: false }
}


/**
 * Get the base name of a package
 *
 * Given an import path of `@scope/pkgname/nested-module`, this function will return the base name
 * of the package, `@scope/pkgname`. For unscoped packages, this would return just the name.
 *
 * @private
 * @param     {String}    name    The name of the package
 * @return    {String}
 */
function pkgbasename(name) {
  const parts = name.split('/')

  return name.startsWith('@')
    // Scoped package name - pick first two parts (the scope and the package name)
    ? parts.slice(0, 2).join('/')
    // Regular package name - pick just the first part (the package name)
    : parts[0]
}

module.exports = {
  interfaceVersion,
  resolve,
}
