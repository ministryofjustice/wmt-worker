const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('arms', function (table) {
    table.increments('id')
    table.string('assessment_date')
    table.string('assessment_code')
    table.string('assessment_desc')
    table.string('assessment_staff_name')
    table.string('assessment_staff_key')
    table.string('assessment_staff_grade')
    table.string('assessmentent_team_key') // This is a typo in the extract
    table.string('assessment_provider_code')
    table.string('crn')
    table.string('disposal_or_release_date')
    table.string('sentence_type')
    table.string('so_registration_date')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('arms')
}
