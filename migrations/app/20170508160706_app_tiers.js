const logger = require('../../app/services/log')
const BluebirdPromise = require('bluebird').Promise

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tiers', function (table) {
    table.increments('id')
    table.integer('workload_id').unsigned().notNullable().references('workload.id')
    table.string('location').notNullable()
  }).then(function () {
    return BluebirdPromise.all([
      // Knex doesn't have a built in function for tinyint
      knex.raw('ALTER TABLE tiers ADD tier_number TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD overdue_terminations_total TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD warrants_total TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD unpaid_work_total TINYINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD total_cases SMALLINT NOT NULL'),
      knex.raw('ALTER TABLE tiers ADD t2a_overdue_terminations_total INT NOT NULL DEFAULT 0'),
      knex.raw('ALTER TABLE tiers ADD t2a_warrants_total INT NOT NULL DEFAULT 0'),
      knex.raw('ALTER TABLE tiers ADD t2a_unpaid_work_total INT NOT NULL DEFAULT 0'),
      knex.raw('ALTER TABLE tiers ADD t2a_total_cases INT NOT NULL DEFAULT 0'),
      knex.raw('ALTER TABLE tiers ADD suspended_total INT NOT NULL DEFAULT 0'),
      knex.raw('ALTER TABLE tiers ADD suspended_lifer_total INT NOT NULL DEFAULT 0'),
      knex.raw('ALTER TABLE tiers ADD total_filtered_cases SMALLINT NOT NULL DEFAULT 0')
    ])
  }).catch(function (error) {
    logger.error(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tiers')
}
