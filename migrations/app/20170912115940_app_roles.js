const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('roles', function (table) {
    table.increments('id')
    table.string('role').unique().notNullable()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('roles')
}
