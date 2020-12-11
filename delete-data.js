const config = require('./knexfile').app
const knex = require('knex')(config)
const glob = require('glob')
const Promise = require('bluebird').Promise

const dataDirectory = process.argv[2]
const seedDataFileNames = glob.sync('./seed/data/' + dataDirectory + '/[0...9]*.js')

const databaseTableNames = seedDataFileNames.sort().reverse()
  .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.')))

Promise.each(databaseTableNames, (tableName) =>
  knex(tableName).del().return()
)
  .finally(() => knex.destroy())
