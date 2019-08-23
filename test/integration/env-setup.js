require('dotenv').config({ path: './test/integration/.integration.env' })

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })

const databaseProvider = require('../../src/database-provider')
const db = databaseProvider.getInstance()

async function restore() {
  const scanQuery = {
    TableName: 'codepalousa-resources-test'
  }

  const result = await db.scan(scanQuery).promise()
  for (let item of result.Items) {
    const deleteQuery = {
      TableName: 'codepalousa-resources-test',
      Key: {
        id: item.id
      }
    }

    await db.delete(deleteQuery).promise()
  }

  console.log('test environment restored')
}

restore()
