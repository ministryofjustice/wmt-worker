
exports.up = function (knex, Promise) {
  return knex.schema.createTable('workload', function (table) {
    table.increments('id')
    table.integer('workload_owner_id').unsigned().references('workload_owner.id')
    table.integer('total_cases').unsigned().notNullable()
    table.integer('total_community_cases').unsigned().notNullable()
    table.integer('total_custody_cases').unsigned().notNullable()
    table.integer('total_license_cases').unsigned().notNullable()
    table.integer('monthly_sdrs').unsigned().notNullable()
    table.integer('sdr_due_next_30_days').unsigned().notNullable()
    table.integer('sdr_conversions_last_30_days').unsigned().notNullable()
    table.integer('paroms_completed_last_30_days').unsigned().notNullable()
    table.integer('paroms_due_next_30_days').unsigned().notNullable()
    table.integer('license_last_16_weeks').unsigned().notNullable()
    table.integer('community_last_16_weeks').unsigned().notNullable()
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('workload')
}
