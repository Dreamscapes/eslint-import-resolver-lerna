import * as path from 'path'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { resolve } from '.'

const fakeroot = path.resolve(__dirname, '.fixtures/packages')
const expectations: Array<[importpath: string, result: string]> = [
  ['pkg', path.resolve(fakeroot, 'pkg/index.js')],
  ['pkg/file', path.resolve(fakeroot, 'pkg/file.js')],
  ['pkg/file.js', path.resolve(fakeroot, 'pkg/file.js')],
  ['@scope/pkg', path.resolve(fakeroot, 'scope-pkg/index.js')],
  ['@scope/pkg/file', path.resolve(fakeroot, 'scope-pkg/file.js')],
  ['@scope/pkg/file.js', path.resolve(fakeroot, 'scope-pkg/file.js')],
  ['main-pkg', path.resolve(fakeroot, 'main-pkg/main.js')],
  ['main-pkg/file', path.resolve(fakeroot, 'main-pkg/file.js')],
]

describe('resolve()', () => {
  it('exists', () => {
    expect(resolve).to.be.a('function')
  })

  for (const [importpath, expectation] of expectations) {
    it(`resolves: ${importpath}`, () => {
      const outcome = resolve(importpath, __filename, { packages: fakeroot })

      expect(outcome.found).to.equal(Boolean(expectation))
      expect(outcome.path).to.equal(path.resolve(fakeroot, expectation))
    })
  }
})
