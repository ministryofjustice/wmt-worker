
exports.up = function (knex, Promise) {
  return knex.schema.createTable('workload_report', function (table) {
    table.increments('id')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
    table.integer('records_total').unsigned().notNullable()
    table.string('status')
    table.string('status_description')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('workload_report')
}
