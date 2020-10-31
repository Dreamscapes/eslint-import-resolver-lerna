import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as pkg from '..'

describe('package', () => {
  it('exists', () => {
    expect(pkg).to.be.an('object')
  })

  it('exports expected members', () => {
    expect(pkg).to.have.all.keys([
      'interfaceVersion',
      'resolve',
    ])
  })

  it('sets interfaceVersion', () => {
    expect(pkg.interfaceVersion).to.equal(2)
  })

  it('exports .resolve() function', () => {
    expect(pkg.resolve).to.be.a('function')
  })
})
