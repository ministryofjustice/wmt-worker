
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workload_owner', function (table) {
    table.increments('id')
    table.bigInteger('offender_manager_id').references('id').inTable('offender_manager')
    table.bigInteger('working_hours_id').references('id').inTable('working_hours')
    table.bigInteger('team_id').references('id').inTable('team')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('workload_owner')
};