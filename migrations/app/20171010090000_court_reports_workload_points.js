
exports.up = function (knex, Promise) {
  return knex.schema.createTable('court_reports_workload_points', function (table) {
    table.increments('id')
    table.double('default_contracted_hours').unsigned().notNullable()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('court_reports_workload_points')
}
