
exports.up = function (knex, Promise) {
  return knex.schema.withSchema('app').createTable('working_hours', function (table) {
    table.increments('id')
    table.integer('reduction').unsigned()
    table.text('notes')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.withSchema('app').dropTable('working_hours')
}
