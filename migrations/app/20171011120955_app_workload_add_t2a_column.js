exports.up = function (knex, promise) {
  var sql = 'ALTER TABLE app.workload ADD total_t2a_cases INT NOT NULL CONSTRAINT workload_total_t2a_cases_default DEFAULT 0;'
  sql += 'ALTER TABLE app.workload ADD total_t2a_community_cases INT NOT NULL CONSTRAINT workload_total_t2a_community_cases_default DEFAULT 0;'
  sql += 'ALTER TABLE app.workload ADD total_t2a_custody_cases INT NOT NULL CONSTRAINT workload_total_t2a_custody_cases_default DEFAULT 0;'
  sql += 'ALTER TABLE app.workload ADD total_t2a_license_cases INT NOT NULL CONSTRAINT workload_total_t2a_license_cases_default DEFAULT 0;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  var sql = 'ALTER TABLE app.workload DROP CONSTRAINT workload_total_t2a_cases_default;'
  sql += 'ALTER TABLE app.workload DROP CONSTRAINT workload_total_t2a_community_cases_default;'
  sql += 'ALTER TABLE app.workload DROP CONSTRAINT workload_total_t2a_custody_cases_default;'
  sql += 'ALTER TABLE app.workload DROP CONSTRAINT workload_total_t2a_license_cases_default;'
  sql += 'ALTER TABLE app.workload DROP COLUMN total_t2a_cases;'
  sql += 'ALTER TABLE app.workload DROP COLUMN total_t2a_community_cases;'
  sql += 'ALTER TABLE app.workload DROP COLUMN total_t2a_custody_cases;'
  sql += 'ALTER TABLE app.workload DROP COLUMN total_t2a_license_cases;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
