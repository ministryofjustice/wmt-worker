const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('gs', function (table) {
    table.increments('id')
    table.string('contact_id')
    table.string('contact_date')
    table.string('contact_type_code')
    table.string('contact_type_desc')
    table.string('om_name')
    table.string('om_key')
    table.string('om_grade')
    table.string('om_team_key')
    table.string('om_provider_code')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('gs')
}
