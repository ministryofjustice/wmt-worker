exports.up = function (knex, Promise) {
  return knex.schema.createTable('reductions', function (table) {
    table.increments('id')
    table.integer('reduction_reason_id').unsigned().defaultTo(11).notNullable().references('reduction_reason.id')
    table.integer('workload_owner_id').unsigned().notNullable().references('workload_owner.id')
    table.decimal('hours').unsigned().notNullable()
    table.timestamp('effective_from').notNullable()
    table.timestamp('effective_to')
    table.string('status')
    table.string('notes')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reductions')
}
