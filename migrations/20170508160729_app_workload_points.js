
exports.up = function(knex, Promise) {
  return knex.schema.createTable('app_workload_points', function (table) {
    table.increments('id')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function(knex, Promise) {
  knex.schema.dropTable('app_workload_points')
}
