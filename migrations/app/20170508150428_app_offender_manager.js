
exports.up = function (knex, Promise) {
  return knex.schema.createTable('offender_manager', function (table) {
    table.increments('id')
    table.integer('type_id').unsigned().notNullable().references('offender_manager_type.id')
    table.string('key')
    table.string('first_name')
    table.string('last_name')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('offender_manager')
}
