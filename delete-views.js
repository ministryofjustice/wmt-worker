const config = require('./knexfile').app
const knex = require('knex')(config)
const glob = require('glob')

const seedViewFileNames = glob.sync('./seed/views/[0...9]*.js')

const databaseViewNames = seedViewFileNames.sort().reverse()
  .map((fileName) => fileName.substring(fileName.lastIndexOf('/') + 7, fileName.lastIndexOf('.')))

Promise.all(databaseViewNames.map(function (viewName) {
  return knex.schema.raw('DROP VIEW IF EXISTS app.' + viewName)
}))
  .then(function () {
    return knex.schema.raw('DROP VIEW IF EXISTS individual_capacity_view')
  })
  .finally(function () {
    return knex.destroy()
  })
