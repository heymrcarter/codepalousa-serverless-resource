const idGenerator = require('./id-generator')
const dbProvider = require('./database-provider')

module.exports.getAllResources = async () => {
  const db = dbProvider.getInstance()
  const query = {
    TableName: process.env.RESOURCES_TABLE
  }

  const result = await db.scan(query).promise()
  return result.Items.map(item => ({
    id: item.id,
    ...item.resource
  }))
}

module.exports.saveResource = async resource => {
  const db = dbProvider.getInstance()
  const id = idGenerator.generate()
  const query = {
    TableName: process.env.RESOURCES_TABLE,
    Item: {
      id,
      resource
    }
  }

  await db.put(query).promise()
  return {
    id,
    ...resource
  }
}
