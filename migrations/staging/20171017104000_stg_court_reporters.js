const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('court_reporters', function (table) {
    table.increments('id')
    table.string('trust')
    table.string('region_desc')
    table.string('region_code')
    table.string('ldu_desc')
    table.string('ldu_code')
    table.string('team_desc')
    table.string('team_code')
    table.string('om_surname')
    table.string('om_forename')
    table.string('om_grade_code')
    table.string('om_key')
    table.string('sdr_last_30')
    table.string('sdr_due_next_30')
    table.string('sdr_conv_last_30')
    table.string('oral_reports')
    table.string('datestamp')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('court_reporters')
}
