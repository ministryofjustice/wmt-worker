const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.withSchema('staging').createTable('t2a_detail', function (table) {
    table.increments('id')
    table.string('crn')
    table.string('event_no')
    table.string('allocation_date')
    table.string('allocation_reason')
    table.string('allocation_cd')
    table.string('provider_code_order_manager')
    table.string('cluster_order_manager')
    table.string('cluster_cd_order_manager')
    table.string('team_order_manager')
    table.string('team_cd_order_manager')
    table.string('staff_name_order_manager')
    table.string('staff_cd_order_manager')
    table.string('nsi_cd')
    table.string('nsi_desc')
    table.string('birth_date')
    table.string('age')
    table.string('nsi_status_cd')
    table.string('nsi_status_desc')
    table.string('nsi_outcome_cd')
    table.string('nsi_outcome_desc')
    table.string('staff_name_offender_manager')
    table.string('staff_cd_offender_manager')
    table.string('staff_grade_cd_offender_manager')
    table.string('provider_cd_offender_manager')
    table.string('cluster_cd_offender_manager')
    table.string('team_cd_offender_manager')
    table.string('pdu_order_manager')
    table.string('pdu_cd_order_manager')
    table.string('allocation_desc')
    table.string('pdu_cd_offender_manager')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('staging').dropTable('t2a_detail')
}
