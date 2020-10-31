/* eslint-disable node/no-sync */
import * as fs from 'fs'
import * as path from 'path'
import { pkgparts } from '../pkgparts'
import { cjsresolve } from '../cjsresolve'
import type { Config } from './Config'
import type { Outcome } from './Outcome'

const outcome = {
  notFound: (): Outcome => ({ found: false, path: null }),
  found: (location: string): Outcome => ({ found: true, path: location }),
}

function jsonfile(source: string): Record<string, unknown> {
  const contents = fs.readFileSync(source, 'utf-8').trim()
  const json = JSON.parse(contents) as Record<string, unknown>

  return json
}

/**
 * Resolve a given import path into a Lerna package
 *
 * @param identifier  - A potential package name or path to be resolved into absolute path
 * @param importer    - The absolute path to the module making the import
 * @param config      - Configuration options for the resolver, as provided via ESLint config file
 * @returns             The outcome of the module resolution attempt, including the module's path
 */
function resolve(identifier: string, importer: string, config?: Config): Outcome {
  const { basename, relpath } = pkgparts(identifier)
  const packages = config?.packages ?? []
  const roots = Array.isArray(packages)
    ? packages
    : [packages]

  for (const root of roots) {
    const filenames = fs
      .readdirSync(root)
      .map(filename => path.resolve(root, filename))
      .filter(filename => fs.statSync(filename).isDirectory())
      .filter(filename => fs.existsSync(path.resolve(filename, 'package.json')))

    for (const filename of filenames) {
      const pkg = jsonfile(path.resolve(filename, 'package.json'))

      if (pkg.name === basename) {
        const resolved = cjsresolve(path.resolve(filename, relpath ?? ''))

        return resolved
          ? outcome.found(resolved)
          : outcome.notFound()
      }
    }
  }

  return outcome.notFound()
}

export {
  resolve,
}
