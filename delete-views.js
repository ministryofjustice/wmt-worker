const config = require('./knexfile').app
const knex = require('knex')(config)
const glob = require('glob')
const Promise = require('bluebird').Promise

var seedViewFileNames = glob.sync('./seed/views/[0...9]*.js')

var databaseViewNames = seedViewFileNames.sort().reverse()
    .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.')))

Promise.each(databaseViewNames, (viewName) =>
     knex.schema.raw('DROP VIEW IF EXISTS ' + viewName).return()
)
.then(() => knex.schema.raw('DROP VIEW IF EXISTS individual_capacity_view').return())
.finally(() => knex.destroy())
