exports.up = function (knex, Promise) {
  return knex.schema.table('workload', function (table) {
    table.integer('oral_reports').notNullable().defaultTo(0)
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('workload', function (table) {
    table.dropColumn('oral_reports')
  })
}
