
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_role', function (table) {
    table.increments('id')
    table.integer('user_id').unsigned().notNullable().references('users.id')
    table.integer('role_id').unsigned().notNullable().references('roles.id')
    table.timestamp('last_updated')
    table.integer('last_updated_by').unsigned().notNullable().references('users.id')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.dropTable('user_role')
}
