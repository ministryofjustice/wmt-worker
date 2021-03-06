const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('flag_priority', function (table) {
    table.increments('id')
    table.string('row_type')
    table.string('case_ref_no')
    table.string('tier_code')
    table.string('team_code')
    table.string('om_grade_code')
    table.string('om_key')
    table.string('location')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('flag_priority')
}
