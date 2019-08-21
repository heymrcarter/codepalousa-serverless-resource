const builder = require('jest-trx-results-processor')
const mkdirp = require('mkdirp')
const path = require('path')
const { promisify } = require('util')
const mkdirpAsync = promisify(mkdirp)

const resultLocation = path.join(__dirname, '..', '..', '.test', 'unit')

async function report() {
  await mkdirpAsync(resultLocation)
  const resultFile = path.resolve(path.join(resultLocation, 'results.trx'))

  return builder({
    outputFile: resultFile
  })
}

const reporter = report()

module.exports = reporter
