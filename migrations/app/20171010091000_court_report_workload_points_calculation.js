
exports.up = function (knex, Promise) {
  return knex.schema.createTable('court_reports_workload_points_calculation', function (table) {
    table.increments('id')
    table.integer('workload_report_id').unsigned().notNullable().references('workload_report.id')
    table.integer('court_reports_workload_id').unsigned().notNullable().references('court_reports_workload.id')
    table.integer('court_reports_workload_points_id').unsigned().notNullable().references('court_reports_workload_points.id')
    table.decimal('reduction_hours').defaultTo(0).notNullable()
    table.decimal('contracted_hours').notNullable()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('court_reports_workload_points_calculation')
}
