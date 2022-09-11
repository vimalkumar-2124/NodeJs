const mongodb = require('mongodb')
const dbName = 'users'
const url = `mongodb://localhost:27017/${dbName}`
const client = mongodb.MongoClient

module.exports = {dbName, url, client, mongodb}
