
exports.up = function (knex, Promise) {
  return knex.schema.withSchema('app').createTable('workload', function (table) {
    table.increments('id')
    table.bigInteger('workload_owner_id').references('id').inTable('workload_owner')
    table.bigInteger('workload_report_id').references('id').inTable('workload_report')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.withSchema('app').dropTable('worload')
}
