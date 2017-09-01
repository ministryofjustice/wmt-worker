
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.raw('ALTER TABLE tiers ALTER COLUMN tier_number TINYINT NOT NULL'),
    knex.raw('ALTER TABLE tiers ALTER COLUMN overdue_terminations_total TINYINT NOT NULL'),
    knex.raw('ALTER TABLE tiers ALTER COLUMN warrants_total TINYINT NOT NULL'),
    knex.raw('ALTER TABLE tiers ALTER COLUMN unpaid_work_total TINYINT NOT NULL'),
    knex.raw('ALTER TABLE tiers ALTER COLUMN total_cases SMALLINT NOT NULL')
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw('ALTER TABLE tiers DROP CONSTRAINT FK_tiers_location'),
    knex.table.alterTable('tiers', function (table) {
      table.integer('tier_number').unsigned().notNullable().alter()
      table.integer('overdue_terminations_total').unsigned().notNullable().alter()
      table.integer('warrants_total').unsigned().notNullable().alter()
      table.integer('unpaid_work_total').unsigned().notNullable().alter()
      table.integer('total_cases').unsigned().notNullable().alter()
    })
  ])
}
