const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('omic_workload_points_calculations', function (table) {
    table.increments('id')
    table.integer('workload_report_id').unsigned().notNullable().references('workload_report.id')
    table.integer('workload_points_id').unsigned().notNullable().references('workload_points.id')
    table.integer('omic_workload_id').unsigned().notNullable().references('omic_workload.id')
    table.integer('custody_points').unsigned().notNullable()
    table.integer('licence_points').unsigned().notNullable()
    table.integer('sdr_points').unsigned().notNullable()
    table.integer('sdr_conversion_points').unsigned().notNullable()
    table.integer('paroms_points').unsigned().notNullable()
    table.integer('nominal_target').unsigned().notNullable()
    table.integer('available_points').unsigned().notNullable()
    table.decimal('contracted_hours').notNullable()
    table.integer('arms_total_cases').unsigned().defaultTo(0).notNullable()
    table.integer('t2a_workload_points_id').unsigned().references('workload_points.id')
    table.integer('arms_points').unsigned().defaultTo(0).notNullable()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('omic_workload_points_calculations')
}
