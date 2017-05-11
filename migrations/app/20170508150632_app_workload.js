
exports.up = function (knex, Promise) {
  return knex.schema.withSchema('app').createTable('workload', function (table) {
    table.increments('id')
    table.integer('workload_owner_id').unsigned().references('workload_owner.id')
    table.bigInteger('workload_report_id').unsigned().references('workload_report.id')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.withSchema('app').dropTable('workload')
}
