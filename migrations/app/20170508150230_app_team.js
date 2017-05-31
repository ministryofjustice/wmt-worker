
exports.up = function (knex, Promise) {
  return knex.schema.createTable('team', function (table) {
    table.increments('id')
    table.string('team_code')
    table.integer('ldu_id').unsigned().notNullable().references('ldu.id')
    table.string('description')
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('team')
}
