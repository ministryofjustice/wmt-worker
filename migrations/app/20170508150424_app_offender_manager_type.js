const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('offender_manager_type', function (table) {
    table.increments('id')
    table.string('grade_code')
    table.string('description')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('offender_manager_type')
}
