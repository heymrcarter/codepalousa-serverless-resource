const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['<rootDir>/env-setup.js'],
  testResultsProcessor: '<rootDir>/integration-result-reporter.js'
}
