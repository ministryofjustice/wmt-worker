exports.up = function (knex, Promise) {
  return knex.schema.createTable('adjustment_category', function (table) {
    table.increments('id')
    table.string('category')
  })
  .catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('adjustment_category')
}
