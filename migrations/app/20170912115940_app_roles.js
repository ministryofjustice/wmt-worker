
exports.up = function (knex, Promise) {
  return knex.schema.createTable('roles', function (table) {
    table.increments('id')
    table.string('role').unique().notNullable()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.dropTable('roles')
}
