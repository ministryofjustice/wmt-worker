
exports.up = function (knex, Promise) {
  return knex.schema.createTable('workload_owner', function (table) {
    table.increments('id')
    table.integer('offender_manager_id').unsigned().notNullable().references('offender_manager.id')
    table.integer('working_hours_id').unsigned().references('working_hours.id')
    table.integer('team_id').unsigned().notNullable().references('team.id')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('workload_owner')
}
