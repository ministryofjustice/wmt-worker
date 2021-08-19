const config = require('./knexfile').app
const knex = require('knex')(config)
const glob = require('glob')

const dataDirectory = process.argv[2]
const seedDataFileNames = glob.sync('./seed/data/' + dataDirectory + '/[0...9]*.js')

const databaseTableNames = seedDataFileNames.sort().reverse()
  .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.')))

Promise.all(databaseTableNames.map(function (tableName) {
  return knex(tableName).withSchema('app').del()
}))
  .then(function () {
    return knex.destroy()
  })
