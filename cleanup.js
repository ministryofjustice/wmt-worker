const config = require('./knexfile').app
const knex = require('knex')(config)
const glob = require('glob')
const Promise = require('bluebird').Promise

var seedFileNames = glob.sync('./data/[0...9]*.js')

var databaseTableNames = seedFileNames.sort().reverse()
    .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.')))

Promise.each(databaseTableNames, (tableName) =>
        knex(tableName).del().return()
)
.finally(() => knex.destroy())
