import { before } from 'mocha'

before(() => {
  // If we are running Mocha in watch mode, clear the Console before each test run so we have only
  // one report on screen at any time. This is how the `min` reporter works by default, but we
  // actually do want to see the full test suite log.
  if (process.argv.includes('--watch')) {
    process.stdout.write('\u001Bc')
    // eslint-disable-next-line no-console
    console.log('Terminal screen cleared in global mocha:before()\n')
  }
})
