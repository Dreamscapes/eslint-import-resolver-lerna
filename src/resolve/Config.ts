/**
 * Resolver configuration
 */
interface Config {
  /**
   * Either a single absolute path or an array thereof pointing to where Lerna packages might be
   * located in your source code. This plugin will look for package references there.
   */
  packages?: string | string[]
}

export {
  Config,
}
