exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.tiers ADD t2a_overdue_terminations_total INT NOT NULL CONSTRAINT tiers_t2a_overdue_terminations_total_default DEFAULT 0;'
  sql += 'ALTER TABLE app.tiers ADD t2a_warrants_total INT NOT NULL CONSTRAINT tiers_t2a_warrants_total_default DEFAULT 0;'
  sql += 'ALTER TABLE app.tiers ADD t2a_unpaid_work_total INT NOT NULL CONSTRAINT tiers_t2a_unpaid_work_total_default DEFAULT 0;'
  sql += 'ALTER TABLE app.tiers ADD t2a_total_cases INT NOT NULL CONSTRAINT tiers_t2a_total_cases_default DEFAULT 0;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.tiers DROP CONSTRAINT tiers_t2a_overdue_terminations_total_default;'
  sql += 'ALTER TABLE app.tiers DROP CONSTRAINT tiers_t2a_warrants_total_default;'
  sql += 'ALTER TABLE app.tiers DROP CONSTRAINT tiers_t2a_unpaid_work_total_default;'
  sql += 'ALTER TABLE app.tiers DROP CONSTRAINT tiers_t2a_total_cases_default;'
  sql += 'ALTER TABLE app.tiers DROP COLUMN tiers_t2a_overdue_terminations_total;'
  sql += 'ALTER TABLE app.tiers DROP COLUMN tiers_t2a_warrants_total;'
  sql += 'ALTER TABLE app.tiers DROP COLUMN tiers_t2a_unpaid_work_total;'
  sql += 'ALTER TABLE app.tiers DROP COLUMN tiers_t2a_total_cases;'
  return knex.schema
        .raw('SET ARITHABORT ON')
        .raw(sql)
}
