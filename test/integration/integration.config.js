const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['<rootDir>/env-setup.js']
}
