exports.up = function (knex, Promise) {
  return knex.schema.createTable('tiers', function (table) {
    table.increments('id')
    table.integer('workload_id').unsigned().notNullable().references('workload.id')
    table.string('location').notNullable()
  }).then(function () {
    return Promise.all([
      // Knex doesn't have a built in function for tinyint
      knex.raw('ALTER TABLE tiers ADD tier_number TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD overdue_terminations_total TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD warrants_total TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD unpaid_work_total TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD total_cases SMALLINT NOT NULL')
    ])
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tiers')
}
