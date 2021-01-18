const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('adjustment_reason', function (table) {
    table.increments('id')
    table.string('contact_code')
    table.string('contact_description')
    table.integer('category_id').unsigned().notNullable().references('adjustment_category.id')
    table.integer('points')
  })
    .catch(function (error) {
      logger.error(error)
      throw error
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('adjustment_reason')
}
