const config = require('./knexfile').app
const knex = require('knex')(config)
const glob = require('glob')
const Promise = require('bluebird').Promise

var seedFileNames = glob.sync('./seed/views/[0...9]*.js')

var databaseTableNames = seedFileNames.sort().reverse()
    .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.')))

Promise.each(databaseTableNames, (tableName) =>
        knex.schema.raw('DROP VIEW IF EXISTS ' + tableName).return()
)
.finally(() => knex.destroy())
