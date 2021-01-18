exports.up = function (knex, promise) {
  let sql = 'ALTER TABLE app.workload ADD arms_community_cases INT NOT NULL CONSTRAINT workload_arms_community_default DEFAULT 0;'
  sql += 'ALTER TABLE app.workload ADD arms_license_cases INT NOT NULL CONSTRAINT workload_arms_license_default DEFAULT 0;'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  let sql = 'ALTER TABLE app.workload DROP CONSTRAINT workload_arms_community_default;'
  sql += 'ALTER TABLE app.workload DROP CONSTRAINT workload_arms_license_default;'
  sql += 'ALTER TABLE app.workload DROP COLUMN arms_community_cases;'
  sql += 'ALTER TABLE app.workload DROP COLUMN arms_license_cases;'

  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
