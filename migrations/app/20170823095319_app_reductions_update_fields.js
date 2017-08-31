exports.up = function (knex, Promise) {
  return knex.schema.alterTable('reductions', function (table) {
    // Add 'reduction_reason_id' and 'notes' fields
    // Default reduction_reason_id to ID of "Other" in the reduction_reason table
    table.integer('reduction_reason_id').unsigned().defaultTo(11).notNullable().references('reduction_reason.id')
    table.string('notes')
    // Drop notNullable constraint from 'effective_to'
    table.timestamp('effective_to').alter()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('reductions', function (table) {
    table.dropColumn('reduction_reason_id')
    table.dropColumn('notes')
    table.timestamp('effective_to').notNullable().alter()
  })
}
