const path = require('path')

module.exports = {
  rootDir: path.resolve(path.join(__dirname, '../..')),
  moduleFileExtensions: ['js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/td.setup'],
  setupFiles: ['<rootDir>/test/unit/env-setup'],
  coverageDirectory: '<rootDir>/.test/unit/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testPathIgnorePatterns: ['<rootDir>/test/integration'],
  reporters: ['default', 'jest-junit']
}
