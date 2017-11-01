const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').table('court_reports', function (table) {
    table.string('trust')
    table.string('region_desc')
    table.string('region_code')
    table.string('ldu_desc')
    table.string('ldu_code')
    table.string('om_surname')
    table.string('om_forename')
    table.string('om_grade_code')
    table.dropColumn('om_name')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').table('court_reports', function (table) {
    table.dropColumn('trust')
    table.dropColumn('region_desc')
    table.dropColumn('region_code')
    table.dropColumn('ldu_desc')
    table.dropColumn('ldu_code')
    table.dropColumn('om_surname')
    table.dropColumn('om_forename')
    table.dropColumn('om_grade_code')
    table.string('om_name')
  })
}
