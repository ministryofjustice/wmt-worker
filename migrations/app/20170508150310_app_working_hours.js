
exports.up = function (knex, Promise) {
  return knex.schema.createTable('working_hours', function (table) {
    table.increments('id')
    table.float('contracted_hours')
    table.integer('reduction').unsigned()
    table.text('notes')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('working_hours')
}
