
exports.up = function (knex, Promise) {
  return knex.schema.withSchema('app').createTable('team', function (table) {
    table.increments('id')
    table.bigInteger('ldu_id').references('id').inTable('ldu')
    table.string('description')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.withSchema('app').dropTable('team')
}
