const logger = require('../../app/services/log')

exports.up = function (knex, Promise) {
  return knex.schema.createTable('case_category', function (table) {
    table.increments('id')
    table.integer('category_id')
    table.string('category_name', 20)
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('case_category')
}
