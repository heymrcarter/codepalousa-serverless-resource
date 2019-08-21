const resourceRepository = require('./resource-repository')

module.exports.getResources = async event => {
  const resources = await resourceRepository.getAllResources()
  return {
    statusCode: 200,
    body: JSON.stringify(resources),
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    }
  }
}

module.exports.addResource = async event => {
  const resource = JSON.parse(event.body)
  const createdResource = await resourceRepository.saveResource(resource)
  return {
    statusCode: 201,
    body: JSON.stringify(createdResource),
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    }
  }
}
