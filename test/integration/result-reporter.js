const builder = require('jest-trx-results-processor')
const mkdirp = require('mkdirp')
const path = require('path')
const { promisify } = require('util')
const mkdirpAsync = promisify(mkdirp)

const resultLocation = path.join(__dirname, '..', '..', '.test', 'integration')

async function report() {
  await mkdirpAsync(resultLocation)
  const resultFile = path.resolve(path.join(resultLocation, 'results.trx'))

  return builder({
    outputFile: resultFile
  })
}

module.exports = report()
