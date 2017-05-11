
exports.up = function (knex, Promise) {
  return knex.schema.createTable('custody_tiers', function (table) {
    table.increments('id')
    table.bigInteger('workload_id').unsigned().notNullable().references('workload.id')
    table.integer('tier_type').unsigned()
    table.string('case_type', 5)
    table.integer('points').unsigned()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('custody_tiers')
}
