interface PkgParts {
  /** Package name only, excluding any nested paths in the import path */
  basename: string
  /** Relative path within the package, if provided in the original import path */
  relpath: string | null
}

/**
 * Get the base name of a package
 *
 * Given an import path of `@scope/pkgname/nested-module`, this function will return the base name
 * of the package, `@scope/pkgname`. For unscoped packages, this would return just the name.
 *
 * @private
 * @param     name  - The name of the package
 */
function pkgparts(name: string): PkgParts {
  const parts = name.split('/')
  const isScoped = name.startsWith('@')
  const basename = isScoped
    // Scoped package name - pick first two parts (the scope and the package name)
    ? parts.slice(0, 2).join('/')
    // Regular package name - pick just the first part (the package name)
    : parts[0]
  const relpath = isScoped
    // Scoped package name - pick everything after the package scope and name identifier
    ? parts.slice(2).join('/') || null
    // Regular package name - pick everything after the package name identifier
    : parts.slice(1).join('/') || null

  return {
    basename,
    relpath,
  }
}

export {
  pkgparts,
  PkgParts,
}
