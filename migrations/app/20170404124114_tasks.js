const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id')
    table.string('submitting_agent')
    table.string('type')
    table.text('additional_data', 1300)
    table.integer('workload_report_id').references('workload_report.id')
    table.dateTime('date_created').defaultTo(knex.fn.now()).notNullable()
    table.dateTime('date_processed')
    table.string('status', 20).notNullable()
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks')
}
