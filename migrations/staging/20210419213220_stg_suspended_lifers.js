const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('suspended_Lifers', function (table) {
    table.increments('id')
    table.string('location')
    table.string('row_type')
    table.string('case_ref_no')
    table.string('tier_code')
    table.string('team_code')
    table.string('om_grade_code')
    table.string('om_key')
    table.string('in_custody')
    table.string('register_code')
    table.string('register_description')
    table.string('register_level')
    table.string('register_level_description')
    table.string('register_category')
    table.string('register_category_description')
    table.string('registration_date')
    table.string('next_review_date')
    table.string('deregistration_date')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('suspended_Lifers')
}
