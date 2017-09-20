const config = require('../knexfile').app
const knex = require('knex')(config)
const glob = require('glob')
const Promise = require('bluebird').Promise

var seedFileNames = glob.sync('../seed/data/dev/[0...9]*.js')
var referenceTableFileNames = glob.sync('../seed/data/ref/[0...9]*.js')

var databaseTableNames = []

databaseTableNames.push('knex_migrations_lock')
databaseTableNames.push('knex_migrations')

databaseTableNames = databaseTableNames.concat(seedFileNames.sort().reverse()
    .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.'))))
    .concat(referenceTableFileNames.sort().reverse()
    .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.'))))

Promise.each(databaseTableNames, (tableName) =>
    knex.schema.withSchema('app').dropTableIfExists(tableName)
)
.finally(() => knex.destroy())
