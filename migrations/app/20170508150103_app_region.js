const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('region', function (table) {
    table.increments('id')
    table.string('code')
    table.string('description')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('region')
}
