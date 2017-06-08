
exports.up = function (knex, Promise) {
  return knex.schema.createTable('region', function (table) {
    table.increments('id')
    table.string('code')
    table.string('description')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('region')
}
