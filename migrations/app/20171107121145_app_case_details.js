const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('case_details', function (table) {
    table.increments('id')
    table.integer('workload_id').unsigned().notNullable().references('workload.id')
    table.string('row_type')
    table.string('case_ref_no').notNullable()
    table.integer('tier_code').unsigned().notNullable()
    table.string('team_code').notNullable()
    table.string('grade_code')
    table.string('location').notNullable()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('case_details')
}
