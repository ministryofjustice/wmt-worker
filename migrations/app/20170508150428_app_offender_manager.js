
exports.up = function (knex, Promise) {
  return knex.schema.createTable('offender_manager', function (table) {
    table.increments('id')
    table.string('key')
    table.string('forename')
    table.string('surname')
    table.integer('type_id').unsigned().notNullable().references('offender_manager_type.id')
    table.string('grade_code')
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
