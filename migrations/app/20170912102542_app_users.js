const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('username').unique().notNullable()
    table.string('name')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
