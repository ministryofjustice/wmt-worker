const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('name')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('name')
  })
}
