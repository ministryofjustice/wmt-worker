exports.up = function (knex, Promise) {
  return knex.schema.createTable('adjustment_reason', function (table) {
    table.increments('id')
    table.string('reason')
    table.string('reason_short_name')
    table.integer('category_id').unsigned().notNullable().references('adjustment_category.id')
    table.integer('points')
  })
  .catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('adjustment_reason')
}
