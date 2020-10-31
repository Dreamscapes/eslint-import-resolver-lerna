'use strict'

module.exports = {
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: '${version}',
  branches: [
    { name: 'release/latest', channel: 'latest' },
    { name: 'release/next', channel: 'next', prerelease: 'alpha' },
  ],

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', {
      npmPublish: true,
      tarballDir: '.',
    }],
    '@semantic-release/git',
    ['@semantic-release/github', {
      assets: [{ path: '*.tgz', label: 'eslint-import-resolver-lerna.tgz' }],
    }],
  ],
}
