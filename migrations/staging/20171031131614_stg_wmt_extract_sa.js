const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('wmt_extract_sa', function (table) {
    table.increments('id')
    table.string('case_ref_no')
    table.string('tier_code')
    table.string('team_code')
    table.string('om_grade_code')
    table.string('om_key')
    table.string('location')
    table.string('disposal_type_desc')
    table.string('disposal_type_code')
    table.string('standalone_order')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('wmt_extract_sa')
}
