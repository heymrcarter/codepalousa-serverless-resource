require('dotenv').config({ path: './test/integration/.integration.env' })

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })

const databaseProvider = require('../../src/database-provider')
const db = databaseProvider.getInstance()

const deleteQuery = {
  TableName: 'codepalousa-resource',
  Key: {
    id: 'clan-id'
  }
}

db.delete(deleteQuery)
  .promise()
  .then(() => {
    console.log('test environment restored')
  })
