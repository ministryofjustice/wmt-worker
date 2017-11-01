const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('court_reports', function (table) {
    table.increments('id')
    table.integer('workload_owner_id').unsigned().references('workload_owner.id')
    table.integer('staging_id').unsigned().notNullable()
    table.integer('total_sdrs').unsigned().notNullable()
    table.integer('total_fdrs').unsigned().notNullable()
    table.integer('total_oral_reports').unsigned().notNullable()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('court_reports')
}
