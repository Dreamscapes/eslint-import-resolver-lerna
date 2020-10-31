import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pkgparts } from './pkgparts'

type Expectation = [basename: string, relpath: string | null]
const expectations: Array<[input: string, expectation: Expectation]> = [
  ['pkg', ['pkg', null]],
  ['pkg/file', ['pkg', 'file']],
  ['pkg/file.js', ['pkg', 'file.js']],
  ['pkg/lib/file', ['pkg', 'lib/file']],
  ['pkg/lib/file.js', ['pkg', 'lib/file.js']],
  ['@scope/pkg', ['@scope/pkg', null]],
  ['@scope/pkg/file', ['@scope/pkg', 'file']],
  ['@scope/pkg/file.js', ['@scope/pkg', 'file.js']],
  ['@scope/pkg/lib/file', ['@scope/pkg', 'lib/file']],
  ['@scope/pkg/lib/file.js', ['@scope/pkg', 'lib/file.js']],
]

describe('pgkparts()', () => {
  it('exists', () => {
    expect(pkgparts).to.be.a('function')
  })

  it('returns an object with `basename` and `relpath`', () => {
    const parts = pkgparts('@scope/pkg/lib/file')

    expect(parts).to.be.an('object')
    expect(parts).to.have.all.keys(['basename', 'relpath'])
  })


  for (const [input, [basename, relpath]] of expectations) {
    it(`splits: ${input}`, () => {
      const parts = pkgparts(input)

      expect(parts).to.be.an('object')
      expect(parts.basename).to.equal(basename)
      expect(parts.relpath).to.equal(relpath)
    })
  }
})
