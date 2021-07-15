const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('reductions_history', function (table) {
    table.increments('id')
    table.integer('reduction_id').unsigned().defaultTo(11).notNullable().references('reductions.id')
    table.integer('reduction_reason_id').unsigned().defaultTo(11).notNullable().references('reduction_reason.id')
    table.decimal('hours', 8, 1).unsigned().notNullable()
    table.timestamp('effective_from').notNullable()
    table.timestamp('effective_to')
    table.string('status')
    table.string('notes', 4000)
    table.timestamp('updated_date').notNullable().defaultTo(knex.fn.now())
    table.integer('user_id').unsigned()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reductions_history')
}
