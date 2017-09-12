
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('username').unique().notNullable()
    table.string('forename')
    table.string('surname')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
