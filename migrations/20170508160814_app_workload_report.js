
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workload_report', function (table) {
    table.increments('id')
    table.bigInteger('workload_points_id').references('id').inTable('workload_points')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function(knex, Promise) {
  knex.schema.dropTable('workload_report')
}