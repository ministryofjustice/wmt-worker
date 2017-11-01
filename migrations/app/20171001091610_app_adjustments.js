const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('adjustments', function (table) {
    table.increments('id')
    table.integer('adjustment_reason_id').unsigned().notNullable().references('adjustment_reason.id')
    table.integer('workload_owner_id').unsigned().notNullable().references('workload_owner.id')
    table.integer('points').unsigned().notNullable()
    table.integer('contact_id')
    table.timestamp('effective_from').notNullable()
    table.timestamp('effective_to')
    table.string('status')
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('adjustments')
}
