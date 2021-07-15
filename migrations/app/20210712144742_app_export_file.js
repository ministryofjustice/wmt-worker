const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('export_file', function (table) {
    table.increments('id')
    table.string('file_type', 20).notNullable()
    table.timestamp('date_created').notNullable()
    table.string('filepath', 250).notNullable()
    table.boolean('is_enabled').defaultTo(1)
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('export_file')
}
