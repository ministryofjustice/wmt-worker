const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('reduction_reason', function (table) {
    table.increments('id')
    table.string('reason')
    table.string('reason_short_name')
    table.integer('category_id').unsigned().notNullable().references('reduction_category.id')
    table.integer('allowance_percentage')
    table.integer('max_allowance_percentage')
    table.integer('months_to_expiry')
  })
    .catch(function (error) {
      logger.error(error)
      throw error
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reduction_reason')
}
