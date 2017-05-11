
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workload', function (table) {
    table.increments('id')
    table.bigInteger('workload_owner_id').references('id').inTable('workload_owner')
    table.bigInteger('workload_report_id').references('id').inTable('workload_report')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('worload')
};