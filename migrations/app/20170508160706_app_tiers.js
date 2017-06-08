
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tiers', function (table) {
    table.increments('id')
    table.integer('workload_id').unsigned().notNullable().references('workload.id')
    table.integer('tier_number').unsigned().notNullable()
    table.integer('overdue_terminations_total').unsigned().notNullable()
    table.integer('warrants_total').unsigned().notNullable()
    table.integer('unpaid_work_total').unsigned().notNullable()
    table.integer('total_cases').unsigned().notNullable()
    table.string('location').notNullable()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tiers')
}
