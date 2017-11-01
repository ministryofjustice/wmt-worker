const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('workload_points_calculations', function (table) {
    table.increments('id')
    table.integer('workload_report_id').unsigned().notNullable().references('workload_report.id')
    table.integer('workload_points_id').unsigned().notNullable().references('workload_points.id')
    table.integer('workload_id').unsigned().notNullable().references('workload.id')
    table.integer('total_points').unsigned().notNullable()
    table.integer('sdr_points').unsigned().notNullable()
    table.integer('sdr_conversion_points').unsigned().notNullable()
    table.integer('paroms_points').unsigned().notNullable()
    table.integer('nominal_target').unsigned().notNullable()
    table.integer('available_points').unsigned().notNullable()
    table.decimal('reduction_hours').defaultTo(0).notNullable()
    table.decimal('contracted_hours').notNullable()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('workload_points_calculations')
}
